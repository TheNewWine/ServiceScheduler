package models

import "time"

type SpecialEvent struct {
	ID                 int                        `json:"id" gorm:"primaryKey"`
	Name               string                     `json:"name"`
	Description        string                     `json:"description"`
	EventDate          time.Time                  `json:"eventDate"`
	StartTime          time.Time                  `json:"startTime"`
	EndTime            time.Time                  `json:"endTime"`
	RequiredVolunteers int                        `json:"requiredVolunteers"`
	CurrentVolunteers  int                        `json:"currentVolunteers"`
	Location           string                     `json:"location"`
	IsActive           bool                       `json:"isActive"`
	Registrations      []SpecialEventRegistration `json:"registrations" gorm:"foreignKey:SpecialEventID"`
}
