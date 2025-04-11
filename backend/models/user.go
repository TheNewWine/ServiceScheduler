package models

import (
	"time"
)

type User struct {
	ID                        int                        `json:"id" gorm:"primaryKey"`
	FirstName                 string                     `json:"firstName"`
	LastName                  string                     `json:"lastName"`
	Email                     string                     `json:"email" gorm:"unique"`
	PhoneNumber               string                     `json:"phoneNumber"`
	PasswordHash              string                     `json:"-"`
	NotificationsEnabled      bool                       `json:"notificationsEnabled"`
	CreatedAt                 time.Time                  `json:"createdAt"`
	LastLogin                 time.Time                  `json:"lastLogin"`
	Shifts                    []Shift                    `json:"shifts" gorm:"foreignKey:UserID"`
	SpecialEventRegistrations []SpecialEventRegistration `json:"specialEventRegistrations" gorm:"foreignKey:UserID"`
}
