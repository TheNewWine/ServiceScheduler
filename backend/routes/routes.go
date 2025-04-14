package routes

import "github.com/gin-gonic/gin"

func InitializeRoutes(router *gin.Engine) {
	// Auth routes
	auth := router.Group("/api/auth")
	{
		auth.POST("/login", nil)    // TODO: Add login handler
		auth.POST("/register", nil) // TODO: Add register handler
	}

	// Service routes
	services := router.Group("/api/services")
	{
		services.GET("/", nil)              // TODO: Add get services handler
		services.POST("/", nil)             // TODO: Add create service handler
		services.POST("/:id/sign-in", nil)  // TODO: Add sign in handler
		services.POST("/:id/sign-out", nil) // TODO: Add sign out handler
	}

	// Event routes
	events := router.Group("/api/events")
	{
		events.GET("/", nil)                // TODO: Add get events handler
		events.POST("/", nil)               // TODO: Add create event handler
		events.POST("/:id/register", nil)   // TODO: Add register handler
		events.POST("/:id/unregister", nil) // TODO: Add unregister handler
	}

	// User routes
	users := router.Group("/api/users")
	{
		users.GET("/me", nil)            // TODO: Add get user handler
		users.GET("/hours", nil)         // TODO: Add get hours handler
		users.PUT("/notifications", nil) // TODO: Add update notifications handler
	}
}
