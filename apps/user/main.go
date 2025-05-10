package main

import (
	"log"
	"net"

	db "github.com/parthkapoor-dev/user/store"
	"google.golang.org/grpc"
)

var (
	grpcAddr = "localhost:2000"
	mongoURI = "mongodb://localhost:27017"
)

func main() {

	grpcServer := grpc.NewServer()

	l, err := net.Listen("tcp", grpcAddr)
	if err != nil {
		log.Fatal("Unable to Listen ", err)
	}
	defer l.Close()

	store := db.NewStore(mongoURI, "hopster", "users")
	NewGrpcHandler(grpcServer, store)

	log.Println("Started Listening at", grpcAddr)
	if err := grpcServer.Serve(l); err != nil {
		log.Fatal("Unable to Serve ", err)
	}
}
