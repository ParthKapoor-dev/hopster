package main

import (
	"context"
	"errors"
	"fmt"
	"log"

	_ "github.com/joho/godotenv/autoload"
	"github.com/parthkapoor-dev/hopster/packages/dotenv"
	"github.com/parthkapoor-dev/hopster/packages/gomail"
	pb "github.com/parthkapoor-dev/hopster/packages/proto/build"
	db "github.com/parthkapoor-dev/user/store"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"google.golang.org/grpc"
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

	return &pb.User{
		Id:          res.InsertedID.(primitive.ObjectID).Hex(),
		Fullname:    p.Fullname,
		PhoneNumber: p.PhoneNumber,
		Email:       p.Email,
	}, nil
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

	token := "1234"
	link := fmt.Sprintf("http://localhost:3000/magic-login?token=%s", token)
	body := fmt.Sprintf("Click <a href='%s'>here</a> to log in", link)

	sender := dotenv.EnvString("GMAIL_USER", "")
	pass := dotenv.EnvString("GMAIL_PASSWORD", "")

	if err := gomail.SendMagicLinkEmail(p.Email, body, sender, pass); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return &pb.User{
		Id:          user.ID,
		Email:       user.Email,
		Fullname:    user.Fullname,
		PhoneNumber: user.PhoneNumber,
	}, nil
}
