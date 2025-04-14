package main

import (
	"log"
	"os"

	"github.com/ServiceScheduler/backend/internal/database"
	"github.com/ServiceScheduler/backend/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	// Load environment variables
	// You'll need to set these in your environment or use a .env file
	// DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT

	// Initialize database
	if err := database.InitDB(); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// Create Gin router
	router := gin.Default()

	// Configure trusted proxies
	// For development, we'll trust localhost and common development IPs
	// In production, you should set this to your actual proxy IPs
	router.SetTrustedProxies([]string{
		"127.0.0.1",      // localhost
		"::1",            // localhost IPv6
		"localhost",      // localhost hostname
		"192.168.0.0/16", // common local network
		"10.0.0.0/8",     // common local network
	})

	// Configure CORS
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Initialize routes
	routes.InitializeRoutes(router)

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	log.Printf("Server starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
