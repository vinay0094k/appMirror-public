import { useEffect, useState } from "react";

type LaunchPreparingProps = {
  sessionId: string;
  deviceInfo: any;
  onPreparingComplete: () => void;
};

const steps = [
  "Allocating a virtual device",
  "Booting the OS",
  "Configuring network & sensors",
  "Securing session",
  "Finalizing environment",
];

export default function LaunchPreparing({ sessionId, deviceInfo, onPreparingComplete }: LaunchPreparingProps) {
  const [progress, setProgress] = useState(4);
  const [currentStep, setCurrentStep] = useState(steps[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onPreparingComplete, 500);
          return 100;
        }
        return Math.min(100, p + 3);
      });
    }, 150);

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        const currentIndex = steps.indexOf(prev);
        const nextIndex = (currentIndex + 1) % steps.length;
        return steps[nextIndex];
      });
    }, 1200);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, [onPreparingComplete]);

  return (
    <div className="space-y-6">
      <div className="space-y-2 mt-2">
        <h2 className="text-xl font-bold leading-tight">
          Launching your device...
        </h2>
        <p className="text-sm text-slate-300">
          Please wait while we prepare your virtual environment.
        </p>
      </div>

      <div className="w-full">
        <p className="text-sm mb-2">{currentStep}</p>
        <div className="h-3 rounded-full bg-white/15 overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <div className="text-xs text-white/70 mt-3">
          {deviceInfo?.device} • {deviceInfo?.os} • {deviceInfo?.platform?.toUpperCase()}
        </div>
        <div className="text-xs text-white/50 mt-1">
          Session: {sessionId}
        </div>
      </div>

      <div className="text-center mt-6">
        <div className="text-6xl mb-4">📱</div>
        <p className="text-2xl font-bold text-white mb-2">
          {progress}%
        </p>
        <p className="text-sm text-slate-400">
          Complete
        </p>
      </div>
    </div>
  );
}
