import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, CheckCircle } from "lucide-react";

type UploadBuildProps = {
  sessionId: string;
  deviceInfo: any;
  onBuildUploaded: (file: { name: string; size: number; file: File }) => void;
};

export default function UploadBuild({ sessionId, deviceInfo, onBuildUploaded }: UploadBuildProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const accepted = useMemo(() => {
    return deviceInfo?.platform === "ios" ? ".ipa,.app" : ".apk,.aab";
  }, [deviceInfo]);

  const onPick = () => inputRef.current?.click();
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    toast.success(`Selected ${file.name}`);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      toast.success(`Successfully uploaded ${selectedFile.name}`);
      setIsUploading(false);
      onBuildUploaded({
        name: selectedFile.name,
        size: selectedFile.size,
        file: selectedFile
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">

      <div className="space-y-2 mt-2">
        <h2 className="text-xl font-bold leading-tight">
          Upload Your App
        </h2>
        <p className="text-sm text-slate-300">
          Drag and drop your file below, or click to browse.
        </p>
      </div>

      <div
        className="rounded-2xl border-2 border-dashed border-white/40 bg-white/5 p-8 text-center cursor-pointer hover:bg-white/10 transition"
        onClick={onPick}
      >
        <div className="text-6xl leading-none mb-4">📱</div>
        <p className="text-white/80">Drag &amp; drop your file here</p>
        <p className="text-white/60 my-2 text-sm">or</p>
        <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
          <Upload className="w-4 h-4 mr-2" />
          Browse files
        </Button>
        <input 
          ref={inputRef} 
          type="file" 
          className="hidden" 
          accept={accepted} 
          onChange={onChange} 
        />
      </div>

      {selectedFile && (
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div className="flex-1">
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-white/60">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          
          <Button
            className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload & Install"}
          </Button>
        </div>
      )}

     <div className="text-center space-y-1">
        <p className="text-white/70 text-xs font-medium">
          {deviceInfo?.device}
        </p>
        <p className="text-white/70 text-xs font-medium">
          {deviceInfo?.os}
        </p>
        <p className="text-white/60 text-[11px]">
          Session: {sessionId}
        </p>
      </div>
    </div>
  );
}
