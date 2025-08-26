
import { useState, useEffect } from 'react';

interface Stats {
  activeSessions: number;
  totalBuilds: number;
  availableDevices: number;
  sessionTime: string;
  trends: {
    sessions: string;
    builds: string;
    devices: string;
    efficiency: string;
  };
}

export const useRealTimeStats = () => {
  const [stats, setStats] = useState<Stats>({
    activeSessions: 12,
    totalBuilds: 847,
    availableDevices: 156,
    sessionTime: "2.4h",
    trends: {
      sessions: "+3 from last hour",
      builds: "+12 this week", 
      devices: "98% uptime",
      efficiency: "+15% efficiency"
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeSessions: Math.max(8, Math.min(20, prev.activeSessions + Math.floor(Math.random() * 3) - 1)),
        availableDevices: Math.max(140, Math.min(160, prev.availableDevices + Math.floor(Math.random() * 3) - 1)),
        totalBuilds: prev.totalBuilds + (Math.random() > 0.7 ? 1 : 0),
        trends: {
          ...prev.trends,
          sessions: `+${Math.floor(Math.random() * 5) + 1} from last hour`,
          devices: `${Math.floor(Math.random() * 3) + 97}% uptime`
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};
