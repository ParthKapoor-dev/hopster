package http

import (
	"context"
	"fmt"
	"net/http"

	pb "github.com/parthkapoor-dev/hopster/packages/proto/build"
)

func (h *HttpHandler) handleRegisterUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Post /users/register @Gateway-Service")

	userRequest := &pb.NewUserRequest{
		Fullname:    "Parth Kapoor",
		PhoneNumber: "7009822678",
	}
	h.userClient.RegisterNewUser(context.Background(), userRequest)
}
