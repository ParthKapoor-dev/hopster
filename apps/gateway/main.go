package main

import (
	"log"
	"net/http"

	userClient "github.com/parthkapoor-dev/gateway/grpc_clients/user_client"

	http_handler "github.com/parthkapoor-dev/gateway/http"
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

	log.Println("Gateway running on :3000")
	log.Fatal(http.ListenAndServe(":3000", mux))
}
