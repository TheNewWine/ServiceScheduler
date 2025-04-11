package main

import (
	"log"
	"os"

	"github.com/ServiceScheduler/backend/config"
	"github.com/ServiceScheduler/backend/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	// Load environment variables
	// You'll need to set these in your environment or use a .env file
	// DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT

	// Initialize database
	config.InitDB()

	// Create Gin router
	router := gin.Default()

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

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
