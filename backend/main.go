package main

import (
	"log"
	"net/http"
	"os"

	"appmirror-backend/handlers"
	"appmirror-backend/middleware"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize Gin router
	r := gin.Default()

	// Configured CORS in cors.go file
	r.Use(middleware.CORSMiddleware())

	// API routes
	api := r.Group("/api/v1")
	{
		// Device management
		api.POST("/devices/launch", handlers.LaunchDevice)
		api.GET("/devices/status/:sessionId", handlers.GetDeviceStatus)

		// Build management
		api.POST("/builds/upload", handlers.UploadBuild)
		api.GET("/builds", handlers.GetBuilds)
		api.DELETE("/builds/:buildId", handlers.DeleteBuild)

		// Session management
		api.GET("/sessions/:sessionId", handlers.GetSession)
		api.POST("/sessions/:sessionId/install", handlers.InstallBuild)
	}

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "healthy"})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8082"
	}

	log.Printf("Server starting on port %s", port)
	log.Fatal(r.Run(":" + port))
}
