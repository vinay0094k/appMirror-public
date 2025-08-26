package middleware

import (
	"net/http"
	"os"
	"regexp"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// ManualCORSMiddleware handles CORS manually to ensure proper preflight handling
func ManualCORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")

		if IsAllowedOrigin(origin) {
			c.Header("Access-Control-Allow-Origin", origin)
			c.Header("Access-Control-Allow-Credentials", "true")
			c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
			c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin, ngrok-skip-browser-warning")
			c.Header("Access-Control-Expose-Headers", "Content-Length, Content-Type")
			c.Header("Access-Control-Max-Age", "86400")
		}

		// Handle preflight requests
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}

		c.Next()
	}
}

// CORSMiddleware returns a Gin middleware for handling CORS with dynamic ngrok + localhost support
func CORSMiddleware() gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowOriginFunc: func(origin string) bool {
			return IsAllowedOrigin(origin)
		},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin", "ngrok-skip-browser-warning"},
		ExposeHeaders:    []string{"Content-Length", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           86400, // 24 hours
	})
}

// IsAllowedOrigin checks if an origin is allowed based on env config, ngrok, or localhost
func IsAllowedOrigin(origin string) bool {
	if origin == "" {
		return false
	}

	origin = strings.TrimSuffix(origin, ".")

	// Always allow common localhost origins (DEV FRIENDLY)
	if strings.HasPrefix(origin, "http://localhost:") {
		return true
	}

	// Get allowed origins from environment variable
	allowedOriginsEnv := os.Getenv("CORS_ALLOWED_ORIGINS")
	if allowedOriginsEnv != "" {
		allowedOrigins := strings.Split(allowedOriginsEnv, ",")
		for _, allowedOrigin := range allowedOrigins {
			trimmed := strings.TrimSpace(strings.TrimSuffix(allowedOrigin, "."))
			if trimmed == origin {
				return true
			}
		}
	}

	// Allow ngrok domains
	ngrokFreePattern := regexp.MustCompile(`^https://[a-z0-9]+\.ngrok-free\.app$`)
	ngrokPattern := regexp.MustCompile(`^https://[a-z0-9]+\.ngrok\.io$`)
	if ngrokFreePattern.MatchString(origin) || ngrokPattern.MatchString(origin) {
		return true
	}

	return false
}

// GetAllowedOrigins returns allowed origins (env + localhost defaults)
func GetAllowedOrigins() []string {
	allowedOriginsEnv := os.Getenv("CORS_ALLOWED_ORIGINS")
	if allowedOriginsEnv == "" {
		// Default localhost origins for dev
		return []string{
			"http://localhost:3000",
			"http://localhost:5173",
			"http://localhost:8080",
		}
	}

	origins := strings.Split(allowedOriginsEnv, ",")
	var trimmedOrigins []string
	for _, origin := range origins {
		trimmed := strings.TrimSpace(origin)
		if trimmed != "" {
			trimmedOrigins = append(trimmedOrigins, trimmed)
		}
	}

	return trimmedOrigins
}
