"use client";

import { Download } from "lucide-react";
import { useCallback } from "react";

interface DownloadTrackButtonProps {
  url: string;
}

export function DownloadTrackButton({ url }: DownloadTrackButtonProps) {
  const handleClick = useCallback(async () => {
    const response = await fetch(url);
    const blob = await response.blob();
    const urlB = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = urlB;
    link.download = url.split("/").pop() || "track.mp3";
    link.click();
    window.URL.revokeObjectURL(urlB);
  }, [url]);

  return (
    <button
      className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      aria-label="Download track"
      onClick={handleClick}
    >
      <Download className="h-3.5 w-3.5" />
    </button>
  );
}
