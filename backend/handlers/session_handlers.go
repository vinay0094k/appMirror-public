package handlers

import (
	"net/http"
	"time"

	"appmirror-backend/models"

	"github.com/gin-gonic/gin"
)

// GetSession returns session details
func GetSession(c *gin.Context) {
	sessionID := c.Param("sessionId")

	session, exists := sessions[sessionID]
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found"})
		return
	}

	// Include build info if available
	var buildInfo *models.Build
	if session.BuildID != "" {
		if build, exists := builds[session.BuildID]; exists {
			buildInfo = build
		}
	}

	response := gin.H{
		"session":    session,
		"build_info": buildInfo,
	}

	c.JSON(http.StatusOK, response)
}

// InstallBuild installs a build on the device session
func InstallBuild(c *gin.Context) {
	sessionID := c.Param("sessionId")

	var req struct {
		BuildID string `json:"build_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate session
	session, exists := sessions[sessionID]
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found"})
		return
	}

	// Validate build
	build, exists := builds[req.BuildID]
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Build not found"})
		return
	}

	// Check platform compatibility
	if build.Platform != session.DeviceInfo.Platform {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Build platform does not match device platform",
		})
		return
	}

	// Check session status
	if session.Status != "ready" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Device is not ready for installation",
		})
		return
	}

	// Update session
	session.BuildID = req.BuildID
	session.Status = "installing"
	session.UpdatedAt = time.Now()

	// Simulate installation process
	go simulateInstallation(sessionID)

	c.JSON(http.StatusOK, gin.H{
		"message":    "Installation started",
		"session_id": sessionID,
		"build_id":   req.BuildID,
		"status":     "installing",
	})
}

// Simulate build installation
func simulateInstallation(sessionID string) {
	// Simulate installation time
	time.Sleep(5 * time.Second)

	if session, exists := sessions[sessionID]; exists {
		session.Status = "running"
		session.UpdatedAt = time.Now()
	}
}
