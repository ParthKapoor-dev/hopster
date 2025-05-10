package http

import (
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

	// User Routes
	mux.HandleFunc("POST /users/register", h.handleRegisterUser)
	mux.HandleFunc("GET /users/login/{email}", h.handlerLoginUser)
}
