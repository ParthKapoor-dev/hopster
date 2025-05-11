package jwt

import (
	"errors"

	"github.com/golang-jwt/jwt/v5"
	jwt_lib "github.com/golang-jwt/jwt/v5"
	_ "github.com/joho/godotenv/autoload"
	"github.com/parthkapoor-dev/hopster/packages/dotenv"
)

var (
	jwtSecret = dotenv.EnvString("JWT_SECRET", "thisisthefuckingfallbacksecretdon'tusethisinproduction")
)

func GenToken(email string, exp int64) (string, error) {
	token := jwt_lib.NewWithClaims(jwt_lib.SigningMethodHS256, jwt_lib.MapClaims{
		"email": email,
		"exp":   exp,
	})
	return token.SignedString([]byte(jwtSecret))
}

func ValidateToken(tokenString string) (jwt_lib.MapClaims, error) {
	token, err := jwt_lib.Parse(tokenString, func(token *jwt.Token) (any, error) {
		return []byte(jwtSecret), nil
	})

	if err != nil || !token.Valid {
		return nil, errors.New("Invalid or Expired Token")
	}
	if claims, ok := token.Claims.(jwt_lib.MapClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, errors.New("Invalid Token")
}
