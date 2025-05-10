package gomail

import (
	"errors"

	"gopkg.in/gomail.v2"
)

func SendMagicLinkEmail(email, body, user, pass string) error {

	if pass == "" {
		return errors.New("GMAIL APP PASSWORD is required in .env")
	}
	if user == "" {
		return errors.New("GMAIL SENDER-EMAIL is required in .env")
	}

	m := gomail.NewMessage()
	m.SetHeader("From", user)
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Login to Hopster")
	m.SetBody("text/html", body)

	d := gomail.NewDialer("smtp.gmail.com", 465, user, pass)
	return d.DialAndSend(m)
}
