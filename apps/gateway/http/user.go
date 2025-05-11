package http

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/parthkapoor-dev/gateway/middleware"
	json "github.com/parthkapoor-dev/hopster/packages/json"
	pb "github.com/parthkapoor-dev/hopster/packages/proto/build"
)

func (h *HttpHandler) handleRegisterUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Post /users @Gateway-Service")

	var userRequest *pb.NewUserRequest
	if err := json.ReadJSON(r, &userRequest); err != nil {
		json.WriteError(w, http.StatusBadRequest, err.Error())
		return
	}

	if err := ValidateNewUserRequest(userRequest); err != nil {
		json.WriteError(w, http.StatusBadRequest, err.Error())
		return
	}

	user, err := h.userClient.RegisterNewUser(context.Background(), userRequest)
	if err != nil {
		json.WriteError(w, http.StatusInternalServerError, err.Error())
		return
	}

	json.WriteJSON(w, http.StatusOK, user)
}

func (h *HttpHandler) handlerLoginUser(w http.ResponseWriter, r *http.Request) {

	email := r.PathValue("email")

	user, err := h.userClient.AuthenticateUser(context.Background(), &pb.UserEmail{
		Email: email,
	})
	if err != nil {
		json.WriteError(w, http.StatusInternalServerError, err.Error())
		return
	}

	json.WriteJSON(w, http.StatusOK, user)
}

func (h *HttpHandler) handleValidateToken(w http.ResponseWriter, r *http.Request) {

	user := middleware.GetAuthenticatedUserEmail(r)

	log.Println("Inside the gateway/handler", user)

	item, err := h.userClient.VerifyToken(context.Background(), &pb.AuthToken{
		Token: user,
	})
	if err != nil {
		log.Fatal("Error::", err)
		json.WriteError(w, http.StatusInternalServerError, err.Error())
		return
	}

	json.WriteJSON(w, http.StatusOK, item)

}

func ValidateNewUserRequest(req *pb.NewUserRequest) error {
	if req.Fullname == "" {
		return errors.New("Missing: User's Full Name is Required")
	}

	if req.PhoneNumber == "" {
		return errors.New("Missing: User's Phone Number is Required")
	}

	if req.Email == "" {
		return errors.New("Missing: User's Email is required")
	}

	return nil
}
