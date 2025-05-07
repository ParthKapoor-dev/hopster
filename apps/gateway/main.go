package main

import (
	"log"
	"net/http"
)

var (
	httpAddr = "localhost:3000"
)

func main() {

	mux := http.NewServeMux()
	handler := NewHttpHandler()
	handler.registerRoutes(mux)

	log.Println("Connected application at ", httpAddr)

	if err := http.ListenAndServe(httpAddr, mux); err != nil {
		log.Fatal("Unable to Listen and Server")
	}
}
