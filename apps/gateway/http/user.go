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

	userEmail := middleware.GetAuthenticatedUserEmail(r)

	result, err := h.userClient.VerifyToken(context.Background(), &pb.UserEmail{
		Email: userEmail,
	})
	if err != nil {
		log.Fatal("Error::", err)
		json.WriteError(w, http.StatusInternalServerError, err.Error())
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "authToken",
		Value:    result.Token,
		Path:     "/", // ✅ valid path
		HttpOnly: true,
		Secure:   false,                // ✅ OK for localhost, should be true in prod
		SameSite: http.SameSiteLaxMode, // ✅ or `SameSiteDefaultMode`
		MaxAge:   3600 * 24,
	})

	json.WriteJSON(w, http.StatusOK, map[string]string{"token": result.Token})

}

func (h *HttpHandler) handleGetPage(w http.ResponseWriter, r *http.Request) {

	userEmail := middleware.GetAuthenticatedUserEmail(r)

	fmt.Println(userEmail)

	json.WriteJSON(w, http.StatusOK, userEmail)
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
