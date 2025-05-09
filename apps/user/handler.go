package main

import (
	"context"
	"log"

	pb "github.com/parthkapoor-dev/hopster/packages/proto/build"
	"google.golang.org/grpc"
)

type grpcHandler struct {
	pb.UnimplementedUserServiceServer
	service *UserService
}

func NewGrpcHandler(grpcServer *grpc.Server, service *UserService) {
	handler := &grpcHandler{
		service: service,
	}
	pb.RegisterUserServiceServer(grpcServer, handler)
}

func (h *grpcHandler) RegisterNewUser(ctx context.Context, p *pb.NewUserRequest) (*pb.User, error) {
	log.Println("Received RegisterNewUser @GRPC ", p)
	user, err := h.service.CreateNewUser(p)
	return user, err
}
