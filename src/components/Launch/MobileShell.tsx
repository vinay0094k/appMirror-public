import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import clsx from "clsx";
import Header from "@/components/Layout/Header";
import DeviceLauncher from "./DeviceLauncher";
import LaunchPreparing from "./LaunchPreparing";
import UploadBuild from "./UploadBuild";
import AppScanning from "./AppScanning";
import InstalledApp from "./InstalledApp";
import { ScanResult } from "./AppScanning";

type MobileShellState = "launcher" | "preparing" | "upload" | "scanning" | "installed";

type MobileShellProps = {
  // Badge outside the phone
  badgeText?: string;
  showBadge?: boolean;

  // Size/spacing overrides
  outerClassName?: string;
  innerClassName?: string;
  contentClassName?: string;
};

export default function MobileShell({
  badgeText = "NEW",
  showBadge = false,
  outerClassName,
  innerClassName,
  contentClassName,
}: MobileShellProps) {
  const [currentState, setCurrentState] = useState<MobileShellState>("launcher");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number; file: File } | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);  

  const handleDeviceLaunched = (sessionId: string, deviceInfo: any) => {
    setSessionId(sessionId);
    setDeviceInfo(deviceInfo);
    setCurrentState("preparing");
  };

  const handlePreparingComplete = () => {
    setCurrentState("upload");
  };

  const handleBuildUploaded = (file: { name: string; size: number; file: File }) => {
    setUploadedFile(file);
    setCurrentState("scanning");
  };

  const handleScanComplete = (result: ScanResult) => {
    setScanResult(result);
    setCurrentState("installed");
  };

  const handleBack = () => {
    switch (currentState) {
      case "preparing":
        setCurrentState("launcher");
        break;
      case "upload":
        setCurrentState("preparing");
        break;
      case "scanning":
        setCurrentState("upload");
        break;
      case "installed":
        setCurrentState("scanning");
        break;
      default:
        setCurrentState("launcher");
    }
  };

  const renderMobileContent = () => {
    switch (currentState) {
      case "launcher":
        return <DeviceLauncher onDeviceLaunched={handleDeviceLaunched} />;
      
      case "preparing":
        return (
          <LaunchPreparing 
            sessionId={sessionId!}
            deviceInfo={deviceInfo}
            onPreparingComplete={handlePreparingComplete}
          />
        );
      
      case "upload":
        return (
          <UploadBuild 
            sessionId={sessionId!}
            deviceInfo={deviceInfo}
            onBuildUploaded={handleBuildUploaded}
          />
        );
      case "scanning":
        return uploadedFile ? (
          <AppScanning
            fileName={uploadedFile.name}
            fileSize={uploadedFile.size}
            file={uploadedFile.file}
            onScanComplete={handleScanComplete}
          />
        ) : null;
      case "installed":
        return scanResult ? (
          <InstalledApp 
            scanResult={scanResult}
            sessionId={sessionId!}
            deviceInfo={deviceInfo}
          />
        ) : null;
      
      case "running":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Device Running</h2>
              <p className="text-slate-300">Your app is now running on the device</p>
            </div>
          </div>
        );
      
      default:
        return <DeviceLauncher onDeviceLaunched={handleDeviceLaunched} />;
    }
  };

  const getTitle = () => {
    switch (currentState) {
      case "launcher": return "Launch Device";
      case "preparing": return "Preparing Device";
      case "upload": return "Upload Build";
      case "running": return "Device Running";
      default: return "Launch Device";
    }
  };

  const getSubtitle = () => {
    switch (currentState) {
      case "launcher": return "Select device and OS version";
      case "preparing": return "Setting up your device...";
      case "upload": return "Upload your app build";
      case "running": return "Your app is live";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Always visible */}
      <Header />
      
      {/* Mobile Shell Content */}
      <div className="min-h-[80vh] w-full flex items-center justify-center px-4">
        <div className="relative">
          {showBadge && (
            <div className="absolute -right-4 top-6 z-20">
              <Badge className="bg-violet-600 text-white border-none shadow-lg">
                {badgeText}
              </Badge>
            </div>
          )}

          <div
            className={clsx(
              "w-[320px] md:w-[400px] h-[740px] bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 rounded-[3rem] p-2 shadow-2xl",
              outerClassName
            )}
          >
            <div
              className={clsx(
                "w-full h-full bg-black rounded-[2.5rem] relative overflow-hidden",
                innerClassName
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-red-500/20 pointer-events-none" />

              <div
                className={clsx(
                  "relative z-10 h-full w-full px-5 pb-5 pt-8 flex flex-col gap-6 overflow-y-auto text-white",
                  contentClassName
                )}
              >
                {/* Mobile Header */}
                {currentState === "launcher" ? (
                  <div className="mb-12"></div>
                ) : currentState === "upload" || currentState === "preparing" || currentState === "scanning" || currentState === "installed" ? (
                  <div className="mb-1">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleBack}
                        aria-label="Back"
                        className="p-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/10"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="mb-6"></div>
                  </div>
                ) : (
                  <header className="mb-1">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleBack}
                        aria-label="Back"
                        className="p-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/10"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <h1 className="text-2xl font-bold leading-tight">{getTitle()}</h1>
                    </div>
                    <p className="text-sm text-slate-300 mt-1">{getSubtitle()}</p>
                  </header>
                )}

                {/* Dynamic Content */}
                <div className="flex-1">
                  {renderMobileContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
