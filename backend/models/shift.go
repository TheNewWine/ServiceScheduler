package models

import "time"

type Shift struct {
	ID             int       `json:"id" gorm:"primaryKey"`
	UserID         int       `json:"userId"`
	User           User      `json:"user" gorm:"foreignKey:UserID"`
	StartTime      time.Time `json:"startTime"`
	EndTime        time.Time `json:"endTime"`
	ServiceID      int       `json:"serviceId"`
	Service        Service   `json:"service" gorm:"foreignKey:ServiceID"`
	IsSpecialEvent bool      `json:"isSpecialEvent"`
	Notes          string    `json:"notes"`
}

func (s *Shift) HoursWorked() float64 {
	if s.EndTime.IsZero() {
		return 0
	}
	return s.EndTime.Sub(s.StartTime).Hours()
}
