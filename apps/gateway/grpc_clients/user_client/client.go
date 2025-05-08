package user_client

import (
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	pb "github.com/parthkapoor-dev/hopster/packages/proto/build"
)

var (
	userServiceAddr = "localhost:2000"
)

type UserServiceClient struct {
	Client pb.UserServiceClient
	conn   *grpc.ClientConn
}

func NewUserServiceClient() (*UserServiceClient, error) {

	conn, err := grpc.NewClient(userServiceAddr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return nil, err
	}

	client := pb.NewUserServiceClient(conn)

	return &UserServiceClient{
		Client: client,
		conn:   conn,
	}, nil

}

func (us *UserServiceClient) Close() {

	if us.conn != nil {
		us.conn.Close()
	}
}
