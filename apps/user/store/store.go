package store

import (
	"context"
	"log"
	"time"

	db "github.com/parthkapoor-dev/hopster/packages/mongodb"
	pb "github.com/parthkapoor-dev/hopster/packages/proto/build"
	"github.com/parthkapoor-dev/user/store/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	colName = "users"
	dbName  = "hopster"
)

type UserStore struct {
	db *mongo.Client
}

func NewStore(uri string, dbName string, collectionName string) *UserStore {

	mongoClient, err := db.ConnectMongoDB(uri)
	if err != nil {
		log.Fatal(err.Error())
		return nil
	}
	return &UserStore{
		db: mongoClient,
	}
}

func (s *UserStore) CreateNewUser(ctx context.Context, p *pb.NewUserRequest) (*mongo.InsertOneResult, error) {
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	col := s.db.Database(dbName).Collection(colName)

	return col.InsertOne(ctx, &models.User{
		Fullname:    p.Fullname,
		Email:       p.Email,
		PhoneNumber: p.PhoneNumber,
	})
}

func (s *UserStore) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	col := s.db.Database(dbName).Collection(colName)

	var user *models.User
	err := col.FindOne(ctx, bson.M{
		"email": email,
	}).Decode(&user)

	return user, err
}
