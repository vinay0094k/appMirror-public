import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

type DeviceLauncherProps = {
  onDeviceLaunched: (sessionId: string, deviceInfo: any) => void;
};

export default function DeviceLauncher({ onDeviceLaunched }: DeviceLauncherProps) {
  const [selectedDevice, setSelectedDevice] = useState("iPhone 15 Pro");
  const [selectedOS, setSelectedOS] = useState("iOS 18.2");
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunchDevice = async () => {
    setIsLaunching(true);
    
    // Simulate device launch
    setTimeout(() => {
      const mockSessionId = `session_${Date.now()}`;
      const mockDeviceInfo = {
        device: selectedDevice,
        os: selectedOS,
        platform: selectedOS.toLowerCase().includes('ios') ? 'ios' : 'android'
      };
      
      onDeviceLaunched(mockSessionId, mockDeviceInfo);
      setIsLaunching(false);
    }, 2000);
  };


  const devices = [
    "iPhone 15 Pro",
    "iPhone 14 Pro",
    "Moto G Power (2024)",
    "Moto G Stylus (2024)",
    "Samsung Galaxy S24",
    "Samsung Galaxy A55"
  ];

  const osVersions = [
    "iOS 18.2",
    "iOS 17.5",
    "Android 15",
    "Android 14",

  ];


  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold leading-tight">
          Upload mobile builds,<br /> 
          Pick any device on your need.
        </h2>
        <p className="text-sm text-slate-300">
          "Test in real-time through your browser. Professional mobile testing made simple."
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-300">Device</label>
          <Select value={selectedDevice} onValueChange={setSelectedDevice}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Choose device" />
            </SelectTrigger>
            <SelectContent>
              {devices.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-300">OS</label>
          <Select value={selectedOS} onValueChange={setSelectedOS}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Choose OS version" />
            </SelectTrigger>
            <SelectContent>
              {osVersions.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Added extra gap above the button */}
        <div className="pt-4">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 text-lg font-semibold"
            onClick={handleLaunchDevice}
            disabled={isLaunching}
          >
            {isLaunching ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Launching...
              </>
            ) : (
              "Launch Device"
            )}
          </Button>
        </div>
      </div>

      <p className="text-xs text-center text-slate-400">
        From emulator to reality in one click. <br/>
        Bring every device to your desk.
      </p>
    </div>
  );
}
