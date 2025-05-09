package main

import (
	"context"
	"log"

	pb "github.com/parthkapoor-dev/hopster/packages/proto/build"
	"google.golang.org/grpc"
)

type grpcHandler struct {
	pb.UnimplementedUserServiceServer
}

func NewGrpcHandler(grpcServer *grpc.Server) {
	handler := &grpcHandler{}
	pb.RegisterUserServiceServer(grpcServer, handler)
}

func (h *grpcHandler) RegisterNewUser(ctx context.Context, p *pb.NewUserRequest) (*pb.User, error) {

	log.Println("Received RegisterNewUser @GRPC ")
	return &pb.User{}, nil
}
