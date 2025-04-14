package utils

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

// AppConfig holds all application configuration
type AppConfig struct {
	DBHost     string
	DBUser     string
	DBPassword string
	DBName     string
	DBPort     string
	Port       string
}

// LoadConfig loads and validates the application configuration from environment variables
func LoadConfig() (*AppConfig, error) {
	// Try to load .env file, but don't fail if it doesn't exist
	_ = godotenv.Load()

	config := &AppConfig{
		DBHost:     os.Getenv("DB_HOST"),
		DBUser:     os.Getenv("DB_USER"),
		DBPassword: os.Getenv("DB_PASSWORD"),
		DBName:     os.Getenv("DB_NAME"),
		DBPort:     os.Getenv("DB_PORT"),
		Port:       os.Getenv("PORT"),
	}

	// Validate required fields
	if config.DBHost == "" {
		return nil, fmt.Errorf("DB_HOST environment variable is required")
	}
	if config.DBUser == "" {
		return nil, fmt.Errorf("DB_USER environment variable is required")
	}
	if config.DBPassword == "" {
		return nil, fmt.Errorf("DB_PASSWORD environment variable is required")
	}
	if config.DBName == "" {
		return nil, fmt.Errorf("DB_NAME environment variable is required")
	}
	if config.DBPort == "" {
		config.DBPort = "5432" // Default PostgreSQL port
	}
	if config.Port == "" {
		config.Port = "8080" // Default application port
	}

	return config, nil
}

// GetDSN returns the database connection string
func (c *AppConfig) GetDSN() string {
	return fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=require",
		c.DBHost,
		c.DBUser,
		c.DBPassword,
		c.DBName,
		c.DBPort,
	)
}
