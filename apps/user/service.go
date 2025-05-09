package main

import (
	pb "github.com/parthkapoor-dev/hopster/packages/proto/build"
)

type UserService struct {
}

func NewUserService() *UserService {
	return &UserService{}
}

func (s *UserService) CreateNewUser(req *pb.NewUserRequest) (*pb.User, error) {
	return &pb.User{
		Id:          "1",
		Fullname:    req.Fullname,
		PhoneNumber: req.PhoneNumber,
	}, nil
}
