package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	_ "github.com/joho/godotenv/autoload"
	"github.com/parthkapoor-dev/hopster/packages/dotenv"
	"github.com/parthkapoor-dev/hopster/packages/gomail"
	"github.com/parthkapoor-dev/hopster/packages/jwt"
	pb "github.com/parthkapoor-dev/hopster/packages/proto/build"
	db "github.com/parthkapoor-dev/user/store"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"google.golang.org/grpc"
)

var (
	sender  = dotenv.EnvString("GMAIL_USER", "")
	pass    = dotenv.EnvString("GMAIL_PASSWORD", "")
	nextURL = dotenv.EnvString("NEXT_URL", "http://localhost:3000")
)

type grpcHandler struct {
	pb.UnimplementedUserServiceServer
	store *db.UserStore
}

func NewGrpcHandler(grpcServer *grpc.Server, store *db.UserStore) {
	handler := &grpcHandler{
		store: store,
	}
	pb.RegisterUserServiceServer(grpcServer, handler)
}

func (h *grpcHandler) RegisterNewUser(ctx context.Context, p *pb.NewUserRequest) (*pb.User, error) {
	log.Println("Received RegisterNewUser @GRPC ", p)

	if _, err := h.store.GetUserByEmail(ctx, p.Email); err != mongo.ErrNoDocuments {
		return nil, errors.New("This Email Account already exists, try Login")
	}

	res, err := h.store.CreateNewUser(ctx, p)
	if err != nil {
		return nil, err
	}

	if err := sendMagicLink(p.Email); err != nil {
		return nil, err
	}

	user := &pb.User{
		Id:          res.InsertedID.(primitive.ObjectID).Hex(),
		Fullname:    p.Fullname,
		PhoneNumber: p.PhoneNumber,
		Email:       p.Email,
	}

	return user, nil
}

func (h *grpcHandler) AuthenticateUser(ctx context.Context, p *pb.UserEmail) (*pb.User, error) {
	log.Println("Received AuthenticateUser @GRPC ", p)

	user, err := h.store.GetUserByEmail(ctx, p.Email)
	if err == mongo.ErrNoDocuments {
		return nil, errors.New("This Email Account does not exists")
	}
	if err != nil {
		return nil, err
	}

	if err := sendMagicLink(p.Email); err != nil {
		return nil, err
	}

	return &pb.User{
		Id:          user.ID,
		Email:       user.Email,
		Fullname:    user.Fullname,
		PhoneNumber: user.PhoneNumber,
	}, nil
}

func (h *grpcHandler) VerifyToken(ctx context.Context, p *pb.UserEmail) (*pb.AuthToken, error) {

	_, err := h.store.GetUserByEmail(ctx, p.Email)
	if err == mongo.ErrNoDocuments {
		return nil, errors.New("This Email Account does not exists")
	}
	if err != nil {
		return nil, err
	}

	NewToken, err := jwt.GenToken(p.Email, time.Now().Add(time.Hour*24).Unix())
	if err != nil {
		return nil, err
	}

	return &pb.AuthToken{
		Token: NewToken,
	}, nil
}

func sendMagicLink(email string) error {

	token, err := jwt.GenToken(email, time.Now().Add(time.Minute*10).Unix())
	if err != nil {
		return err
	}
	link := fmt.Sprintf(nextURL+"/auth/verify?token=%s", token)
	body := fmt.Sprintf("Click <a href='%s'>here</a> to log in", link)

	if err := gomail.SendMagicLinkEmail(email, body, sender, pass); err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}
