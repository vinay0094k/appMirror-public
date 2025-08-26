package handlers

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"appmirror-backend/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// UploadBuild handles build file uploads
func UploadBuild(c *gin.Context) {
	// Get the uploaded file
	file, header, err := c.Request.FormFile("build")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded"})
		return
	}
	defer file.Close()

	// Get session ID from form data
	sessionID := c.PostForm("session_id")
	if sessionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Session ID is required"})
		return
	}

	// Validate session exists
	session, exists := sessions[sessionID]
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found"})
		return
	}

	// Validate file extension
	filename := header.Filename
	ext := strings.ToLower(filepath.Ext(filename))
	platform := session.DeviceInfo.Platform

	if !isValidBuildFile(ext, platform) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": fmt.Sprintf("Invalid file type %s for %s platform", ext, platform),
		})
		return
	}

	// Generate build ID and create upload directory
	buildID := uuid.New().String()
	uploadDir := "./uploads/builds"
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create upload directory"})
		return
	}

	// Save file
	filePath := filepath.Join(uploadDir, buildID+ext)
	dst, err := os.Create(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}
	defer dst.Close()

	size, err := io.Copy(dst, file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}

	// Create build record
	build := &models.Build{
		ID:         buildID,
		Name:       strings.TrimSuffix(filename, ext),
		Platform:   platform,
		Version:    "1.0.0", // Could be extracted from build metadata
		Size:       size,
		FilePath:   filePath,
		UploadedAt: time.Now(),
		Compatible: true,
	}

	// Store build
	builds[buildID] = build

	// Update session with build ID
	session.BuildID = buildID
	session.UpdatedAt = time.Now()

	response := models.UploadResponse{
		BuildID:   buildID,
		Message:   "Build uploaded successfully. Ready to install on device.",
		Status:    "uploaded",
		BuildInfo: *build,
	}

	c.JSON(http.StatusOK, response)
}

// GetBuilds returns all uploaded builds
func GetBuilds(c *gin.Context) {
	platform := c.Query("platform")

	var buildList []models.Build
	for _, build := range builds {
		if platform == "" || build.Platform == platform {
			buildList = append(buildList, *build)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"builds": buildList,
		"count":  len(buildList),
	})
}

// DeleteBuild removes a build
func DeleteBuild(c *gin.Context) {
	buildID := c.Param("buildId")

	build, exists := builds[buildID]
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Build not found"})
		return
	}

	// Delete file
	if err := os.Remove(build.FilePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete build file"})
		return
	}

	// Remove from memory
	delete(builds, buildID)

	c.JSON(http.StatusOK, gin.H{"message": "Build deleted successfully"})
}

// Helper function to validate build file extensions
func isValidBuildFile(ext, platform string) bool {
	switch platform {
	case "ios":
		return ext == ".ipa" || ext == ".app"
	case "android":
		return ext == ".apk" || ext == ".aab"
	default:
		return ext == ".apk" || ext == ".ipa" || ext == ".app" || ext == ".aab"
	}
}
