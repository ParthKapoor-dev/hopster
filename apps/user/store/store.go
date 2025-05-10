package store

import (
	"context"
	"log"
	"time"

	db "github.com/parthkapoor-dev/hopster/packages/mongodb"
	pb "github.com/parthkapoor-dev/hopster/packages/proto/build"
	"github.com/parthkapoor-dev/user/store/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserStore struct {
	Collection *mongo.Collection
}

func NewStore(uri string, dbName string, collectionName string) *UserStore {

	mongoClient, err := db.ConnectMongoDB(uri)
	if err != nil {
		log.Fatal(err.Error())
		return nil
	}
	return &UserStore{
		Collection: mongoClient.Database(dbName).Collection(collectionName),
	}
}

func (s *UserStore) CreateNewUser(ctx context.Context, p *pb.NewUserRequest) (*pb.User, error) {
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	res, err := s.Collection.InsertOne(ctx, &models.User{
		Fullname:    p.Fullname,
		Email:       p.Email,
		PhoneNumber: p.PhoneNumber,
	})
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
