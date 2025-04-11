package models

import "time"

type Service struct {
	ID                 int       `json:"id" gorm:"primaryKey"`
	Name               string    `json:"name"`
	Description        string    `json:"description"`
	StartTime          time.Time `json:"startTime"`
	EndTime            time.Time `json:"endTime"`
	RequiredVolunteers int       `json:"requiredVolunteers"`
	CurrentVolunteers  int       `json:"currentVolunteers"`
	IsActive           bool      `json:"isActive"`
	Location           string    `json:"location"`
	Shifts             []Shift   `json:"shifts" gorm:"foreignKey:ServiceID"`
}
