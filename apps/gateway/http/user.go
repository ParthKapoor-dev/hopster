package http

import (
	"fmt"
	"net/http"
)

func (h *HttpHandler) handleRegisterUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Post /users/register @Gateway-Service")
}
