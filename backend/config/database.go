package config

import (
	"fmt"
	"log"

	"github.com/ServiceScheduler/backend/models"
	"github.com/ServiceScheduler/backend/pkg/utils"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() error {
	config, err := utils.LoadConfig()
	if err != nil {
		return fmt.Errorf("failed to load configuration: %w", err)
	}

	var dbErr error
	DB, dbErr = gorm.Open(postgres.Open(config.GetDSN()), &gorm.Config{})
	if dbErr != nil {
		return fmt.Errorf("failed to connect to database: %w", dbErr)
	}

	// Auto-migrate the schema
	err = DB.AutoMigrate(
		&models.User{},
		&models.Service{},
		&models.Shift{},
		&models.SpecialEvent{},
		&models.SpecialEventRegistration{},
	)
	if err != nil {
		return fmt.Errorf("failed to migrate database: %w", err)
	}

	log.Println("Database connection established")
	return nil
}
