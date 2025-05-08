package user_client

import (
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var (
	userServiceAddr = "localhost:2000"
)

type UserServiceClient struct {
}

func NewUserServiceClient() (*UserServiceClient, error) {

	_, err := grpc.NewClient(userServiceAddr, grpc.WithTransportCredentials(insecure.NewCredentials()))

	if err != nil {
		return nil, err
	}

	return nil, err
}
