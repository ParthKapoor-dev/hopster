package models

type User struct {
	ID          string `bson:"omitempty"`
	Fullname    string `bson:"fullname"`
	Email       string `bson:"email"`
	PhoneNumber string `bson:"phoneNumber"`
}
