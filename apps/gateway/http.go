package main

import (
	"fmt"
	"net/http"
)

type HttpHandler struct {
}

func NewHttpHandler() HttpHandler {
	return HttpHandler{}
}

func (h *HttpHandler) registerRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /", h.handleRequest)
}
func (h *HttpHandler) handleRequest(w http.ResponseWriter, r *http.Request) {
	fmt.Println("We got some request")
}
