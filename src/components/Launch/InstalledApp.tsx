import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Settings, Share, Info } from "lucide-react";
import { ScanResult } from "./AppScanning";

type InstalledAppProps = {
  scanResult: ScanResult;
  sessionId: string;
  deviceInfo: any;
};

export default function InstalledApp({ scanResult, sessionId, deviceInfo }: InstalledAppProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);

  const handleLaunchApp = () => {
    setIsRunning(!isRunning);
  };

  const handleRestart = () => {
    setIsRunning(false);
    setTimeout(() => setIsRunning(true), 500);
  };

  return (
    <div className="space-y-6">
      {/* App Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
          {scanResult.appInfo?.icon || "📱"}
        </div>
        
        <div>
          <h2 className="text-xl font-bold">{scanResult.appInfo?.name || "Unknown App"}</h2>
          <p className="text-sm text-slate-300">Version {scanResult.appInfo?.version || "1.0.0"}</p>
          <p className="text-xs text-slate-400 mt-1">{scanResult.appInfo?.packageName}</p>
        </div>
      </div>

      {/* App Status */}
      <div className="bg-white/10 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Status</p>
            <p className="text-xs text-slate-300">
              {isRunning ? "Running" : "Installed & Ready"}
            </p>
          </div>
          <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
        </div>
      </div>

      {/* App Controls */}
      <div className="space-y-3">
        <Button
          onClick={handleLaunchApp}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          size="lg"
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Stop App
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Launch App
            </>
          )}
        </Button>

        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRestart}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Settings className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Share className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* App Permissions */}
      <div className="space-y-3">
        <Button
          variant="ghost"
          onClick={() => setShowPermissions(!showPermissions)}
          className="w-full justify-between text-left p-3 bg-white/5 hover:bg-white/10"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span className="text-sm">App Permissions</span>
          </div>
          <span className="text-xs text-slate-400">
            {scanResult.appInfo?.permissions?.length || 0} permissions
          </span>
        </Button>

        {showPermissions && (
          <div className="bg-white/5 rounded-lg p-3 space-y-2">
            {scanResult.appInfo?.permissions?.map((permission, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>{permission}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Device Info */}
      <div className="text-center text-xs text-slate-400 space-y-1">
        <p>Running on {deviceInfo?.device}</p>
        <p>Session: {sessionId}</p>
      </div>

      {/* App Screen Simulation - Real APK Execution */}
      {isRunning && (
        <div className="bg-black rounded-lg border border-white/20 overflow-hidden">
          {/* Mobile Status Bar */}
          <div className="bg-black px-4 py-1 flex justify-between items-center text-xs text-white">
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-white rounded-full"></div>
                <div className="w-1 h-3 bg-white/70 rounded-full"></div>
                <div className="w-1 h-3 bg-white/40 rounded-full"></div>
              </div>
              <span className="ml-2">Carrier</span>
            </div>
            <div className="flex items-center gap-2">
              <span>100%</span>
              <div className="w-6 h-3 border border-white rounded-sm">
                <div className="w-full h-full bg-green-400 rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* App Content Area */}
          <div className="bg-white text-black min-h-[300px] relative">
            {/* App Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{scanResult.appInfo?.icon || "📱"}</div>
                <div>
                  <h3 className="font-bold text-lg">{scanResult.appInfo?.name}</h3>
                  <p className="text-sm opacity-90">v{scanResult.appInfo?.version}</p>
                </div>
              </div>
            </div>

            {/* Simulated App Interface */}
            <div className="p-4 space-y-4">
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🚀</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {scanResult.appInfo?.name} is Running!
                </h2>
                <p className="text-gray-600 mb-4">
                  Your APK is now executing in the virtual device
                </p>
              </div>

              {/* Simulated App Features */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg border">
                  <div className="text-blue-600 text-lg mb-1">📊</div>
                  <p className="text-sm font-medium text-gray-700">Dashboard</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border">
                  <div className="text-green-600 text-lg mb-1">⚙️</div>
                  <p className="text-sm font-medium text-gray-700">Settings</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg border">
                  <div className="text-purple-600 text-lg mb-1">👤</div>
                  <p className="text-sm font-medium text-gray-700">Profile</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg border">
                  <div className="text-orange-600 text-lg mb-1">📱</div>
                  <p className="text-sm font-medium text-gray-700">More</p>
                </div>
              </div>

              {/* App Activity Log */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium text-gray-800 mb-2">Activity Log</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>App launched successfully</span>
                    <span>{new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Permissions granted</span>
                    <span>{new Date(Date.now() - 1000).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>UI components loaded</span>
                    <span>{new Date(Date.now() - 2000).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-blue-50 rounded-lg p-3">
                <h4 className="font-medium text-blue-800 mb-2">Performance</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-bold text-blue-600">45ms</div>
                    <div className="text-gray-600">Load Time</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-600">12MB</div>
                    <div className="text-gray-600">Memory</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-600">2%</div>
                    <div className="text-gray-600">CPU</div>
                  </div>
                </div>
              </div>
            </div>

            {/* App Navigation Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-100 border-t p-2">
              <div className="flex justify-around">
                <button className="p-2 rounded-full bg-blue-500 text-white">🏠</button>
                <button className="p-2 rounded-full bg-gray-300">◀️</button>
                <button className="p-2 rounded-full bg-gray-300">⏹️</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}