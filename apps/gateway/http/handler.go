package http

import (
	"fmt"
	"net/http"

	pb "github.com/parthkapoor-dev/hopster/packages/proto/build"
)

type HttpHandler struct {
	userClient pb.UserServiceClient
}

func NewHttpHandler(userClient pb.UserServiceClient) HttpHandler {
	return HttpHandler{
		userClient: userClient,
	}
}

func (h *HttpHandler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /", h.handleRequest)
	mux.HandleFunc("POST /users/register", h.handleRegisterUser)
}

func (h *HttpHandler) handleRequest(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Get: / @Gateway-Service")
}
