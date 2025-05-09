package main

import (
	"log"
	"net"

	"google.golang.org/grpc"
)

var (
	grpcAddr = "localhost:2000"
)

func main() {

	grpcServer := grpc.NewServer()

	l, err := net.Listen("tcp", grpcAddr)
	if err != nil {
		log.Fatal("Unable to Listen ", err)
	}
	defer l.Close()

	NewGrpcHandler(grpcServer)

	log.Println("Started Listening at", grpcAddr)
	if err := grpcServer.Serve(l); err != nil {
		log.Fatal("Unable to Serve ", err)
	}
}
