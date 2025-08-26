package models

import (
	"time"
)

// Device represents a mobile device configuration
type Device struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Platform  string `json:"platform"` // "ios" or "android"
	OSVersion string `json:"os_version"`
	Available bool   `json:"available"`
}

// LaunchRequest represents the device launch request
type LaunchRequest struct {
	DeviceName string `json:"device_name" binding:"required"`
	OSVersion  string `json:"os_version" binding:"required"`
	Platform   string `json:"platform" binding:"required"`
}

// LaunchResponse represents the response after launching a device
type LaunchResponse struct {
	SessionID     string    `json:"session_id"`
	Status        string    `json:"status"`
	DeviceInfo    Device    `json:"device_info"`
	CreatedAt     time.Time `json:"created_at"`
	UploadOptions []string  `json:"upload_options"`
	Message       string    `json:"message"`
}

// Build represents an uploaded application build
type Build struct {
	ID         string    `json:"id"`
	Name       string    `json:"name"`
	Platform   string    `json:"platform"`
	Version    string    `json:"version"`
	Size       int64     `json:"size"`
	FilePath   string    `json:"file_path"`
	UploadedAt time.Time `json:"uploaded_at"`
	Compatible bool      `json:"compatible"`
}

// Session represents an active device session
type Session struct {
	ID         string    `json:"id"`
	DeviceInfo Device    `json:"device_info"`
	Status     string    `json:"status"` // "preparing", "ready", "running", "stopped"
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
	BuildID    string    `json:"build_id,omitempty"`
}

// UploadResponse represents the response after uploading a build
type UploadResponse struct {
	BuildID   string `json:"build_id"`
	Message   string `json:"message"`
	Status    string `json:"status"`
	BuildInfo Build  `json:"build_info"`
}
