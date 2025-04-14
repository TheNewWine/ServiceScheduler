package routes

import (
	"github.com/ServiceScheduler/backend/internal/handlers"
	"github.com/gin-gonic/gin"
)

func InitializeRoutes(router *gin.Engine) {
	// Auth routes
	auth := router.Group("/api/auth")
	{
		auth.POST("/signup", handlers.Signup)
		auth.POST("/login", nil) // TODO: Add login handler
	}

	// Service routes
	services := router.Group("/api/services")
	{
		services.GET("/", nil)
		services.POST("/", nil)
		services.POST("/:id/sign-in", nil)
		services.POST("/:id/sign-out", nil)
	}

	// Event routes
	events := router.Group("/api/events")
	{
		events.GET("/", nil)
		events.POST("/", nil)
		events.POST("/:id/register", nil)
		events.POST("/:id/unregister", nil)
	}

	// User routes
	users := router.Group("/api/users")
	{
		users.GET("/me", nil)
		users.GET("/hours", nil)
		users.PUT("/notifications", nil)
	}
}
