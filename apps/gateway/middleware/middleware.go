package middleware

import (
	"context"
	"log"
	"net/http"
	"strings"

	"github.com/parthkapoor-dev/hopster/packages/json"
	"github.com/parthkapoor-dev/hopster/packages/jwt"
)

func CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight (OPTIONS) request
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

type contextKey string

const userContextKey = contextKey("user")

func UserAuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		log.Println("Running Middleware")

		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			json.WriteError(w, http.StatusUnauthorized, "Missing Auth Headers")
			return
		}

		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			json.WriteError(w, http.StatusUnauthorized, "Invalid Format")
			return
		}

		claims, err := jwt.ValidateToken(tokenParts[1])
		if err != nil {
			log.Fatal("Token Validation Failed", err)
			json.WriteError(w, http.StatusUnauthorized, "Invalid or Expired Token")
			return
		}

		ctx := context.WithValue(r.Context(), userContextKey, claims["email"])
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetAuthenticatedUserEmail(r *http.Request) string {
	email, _ := r.Context().Value(userContextKey).(string)
	return email
}
