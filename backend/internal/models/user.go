package models

import (
	"time"
)

type User struct {
	ID                   uint      `gorm:"primaryKey" json:"id"`
	FirstName            string    `json:"firstName"`
	LastName             string    `json:"lastName"`
	Email                string    `gorm:"uniqueIndex" json:"email"`
	PasswordHash         string    `json:"-"`
	PhoneNumber          string    `json:"phoneNumber"`
	NotificationsEnabled bool      `json:"notificationsEnabled" gorm:"default:true"`
	CreatedAt            time.Time `json:"createdAt"`
	UpdatedAt            time.Time `json:"updatedAt"`
}
