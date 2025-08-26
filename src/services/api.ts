const API_BASE_URL = 'http://localhost:8082/api/v1';

export interface LaunchRequest {
  device_name: string;
  os_version: string;
  platform: string;
}

export interface LaunchResponse {
  session_id: string;
  status: string;
  device_info: {
    id: string;
    name: string;
    platform: string;
    os_version: string;
    available: boolean;
  };
  created_at: string;
  upload_options: string[];
  message: string;
}

export interface DeviceStatus {
  id: string;
  device_info: any;
  status: string;
  created_at: string;
  updated_at: string;
  build_id?: string;
}

// Launch device
export const launchDevice = async (request: LaunchRequest): Promise<LaunchResponse> => {
  const response = await fetch(`${API_BASE_URL}/devices/launch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to launch device');
  }

  return response.json();
};

// Get device status
export const getDeviceStatus = async (sessionId: string): Promise<DeviceStatus> => {
  const response = await fetch(`${API_BASE_URL}/devices/status/${sessionId}`);
  
  if (!response.ok) {
    throw new Error('Failed to get device status');
  }

  return response.json();
};

// Upload build
export const uploadBuild = async (file: File, sessionId: string) => {
  const formData = new FormData();
  formData.append('build', file);
  formData.append('session_id', sessionId);

  const response = await fetch(`${API_BASE_URL}/builds/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload build');
  }

  return response.json();
};

// Get builds
export const getBuilds = async (platform?: string) => {
  const url = platform 
    ? `${API_BASE_URL}/builds?platform=${platform}`
    : `${API_BASE_URL}/builds`;
    
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to get builds');
  }

  return response.json();
};

// Install build on device
export const installBuild = async (sessionId: string, buildId: string) => {
  const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/install`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ build_id: buildId }),
  });

  if (!response.ok) {
    throw new Error('Failed to install build');
  }

  return response.json();
};