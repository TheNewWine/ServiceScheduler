package models

import "time"

type SpecialEventRegistration struct {
	ID               int          `json:"id" gorm:"primaryKey"`
	UserID           int          `json:"userId"`
	User             User         `json:"user" gorm:"foreignKey:UserID"`
	SpecialEventID   int          `json:"specialEventId"`
	SpecialEvent     SpecialEvent `json:"specialEvent" gorm:"foreignKey:SpecialEventID"`
	RegistrationDate time.Time    `json:"registrationDate"`
	IsConfirmed      bool         `json:"isConfirmed"`
	Notes            string       `json:"notes"`
}
