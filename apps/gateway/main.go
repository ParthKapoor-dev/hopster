package main

import (
	"log"
	"net/http"

	userClient "github.com/parthkapoor-dev/gateway/grpc_clients/user_client"
	http_handler "github.com/parthkapoor-dev/gateway/http"
	mid "github.com/parthkapoor-dev/gateway/middleware"
)

var (
	httpAddr = ":8080"
)

func main() {
	user, err := userClient.NewUserServiceClient()
	if err != nil {
		log.Fatal("user client error:", err)
	}
	defer user.Close()

	mux := http.NewServeMux()
	handler := http_handler.NewHttpHandler(user.Client)
	handler.RegisterRoutes(mux)

	wrappedMux := mid.CorsMiddleware(mux)

	log.Println("Gateway running on", httpAddr)
	log.Fatal(http.ListenAndServe(httpAddr, wrappedMux))
}
