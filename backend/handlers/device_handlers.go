package handlers

import (
	"fmt"
	"net/http"
	"time"

	"appmirror-backend/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// In-memory storage (replace with database in production)
var (
	sessions = make(map[string]*models.Session)
	builds   = make(map[string]*models.Build)
)

// LaunchDevice handles device launch requests
func LaunchDevice(c *gin.Context) {
	var req models.LaunchRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Generate session ID
	sessionID := uuid.New().String()

	// Determine platform from device name or OS
	platform := determinePlatform(req.DeviceName, req.OSVersion)

	// Create device info
	device := models.Device{
		ID:        uuid.New().String(),
		Name:      req.DeviceName,
		Platform:  platform,
		OSVersion: req.OSVersion,
		Available: true,
	}

	// Create session
	session := &models.Session{
		ID:         sessionID,
		DeviceInfo: device,
		Status:     "preparing",
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}

	// Store session
	sessions[sessionID] = session

	// Determine upload options based on platform
	uploadOptions := getUploadOptions(platform)

	// Simulate backend preparation (in real implementation, this would start containers/emulators)
	go prepareDevice(sessionID)

	response := models.LaunchResponse{
		SessionID:     sessionID,
		Status:        "preparing",
		DeviceInfo:    device,
		CreatedAt:     time.Now(),
		UploadOptions: uploadOptions,
		Message:       fmt.Sprintf("Device %s with %s is being prepared. You can now upload your build.", req.DeviceName, req.OSVersion),
	}

	c.JSON(http.StatusOK, response)
}

// GetDeviceStatus returns the current status of a device session
func GetDeviceStatus(c *gin.Context) {
	sessionID := c.Param("sessionId")

	session, exists := sessions[sessionID]
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found"})
		return
	}

	c.JSON(http.StatusOK, session)
}

// Helper function to determine platform
func determinePlatform(deviceName, osVersion string) string {
	if contains(deviceName, "iPhone") || contains(osVersion, "iOS") {
		return "ios"
	}
	return "android"
}

// Helper function to get upload options based on platform
func getUploadOptions(platform string) []string {
	switch platform {
	case "ios":
		return []string{".ipa", ".app"}
	case "android":
		return []string{".apk", ".aab"}
	default:
		return []string{".apk", ".ipa"}
	}
}

// Simulate device preparation
func prepareDevice(sessionID string) {
	// Simulate preparation time
	time.Sleep(3 * time.Second)

	if session, exists := sessions[sessionID]; exists {
		session.Status = "ready"
		session.UpdatedAt = time.Now()
	}
}

// Helper function to check if string contains substring
func contains(s, substr string) bool {
	return len(s) >= len(substr) && s[:len(substr)] == substr
}
