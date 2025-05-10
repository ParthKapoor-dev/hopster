package main

import (
	"context"
	"log"

	pb "github.com/parthkapoor-dev/hopster/packages/proto/build"
	db "github.com/parthkapoor-dev/user/store"
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
	user, err := h.store.CreateNewUser(ctx, p)
	return user, err
}
