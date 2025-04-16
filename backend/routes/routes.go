package routes

import (
	"github.com/ServiceScheduler/backend/handlers"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func InitializeRoutes(router *gin.Engine, db *gorm.DB) {
	authHandler := handlers.NewAuthHandler(db)

	// Auth routes
	auth := router.Group("/auth")
	{
		auth.POST("/signup", authHandler.Signup)
		auth.POST("/login", authHandler.Login)
		auth.POST("/logout", authHandler.Logout)
	}
}
