package models

type User struct {
	ID          string `bson:"omitempty"`
	Fullname    string `bson:"fullname"`
	PhoneNumber string `bson:"phoneNumber"`
}
