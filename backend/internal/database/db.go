package database

import (
	"fmt"
	"log"

	"github.com/ServiceScheduler/backend/internal/models"
	"github.com/ServiceScheduler/backend/pkg/utils"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() error {
	config, err := utils.LoadConfig()
	if err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=require",
		config.DBHost,
		config.DBUser,
		config.DBPassword,
		config.DBName,
		config.DBPort,
	)

	var dbErr error
	DB, dbErr = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if dbErr != nil {
		return fmt.Errorf("failed to connect to database: %w", dbErr)
	}

	// Auto-migrate the schema
	err = DB.AutoMigrate(&models.User{})
	if err != nil {
		return fmt.Errorf("failed to migrate database: %w", err)
	}

	log.Println("Database connection established")
	return nil
}
