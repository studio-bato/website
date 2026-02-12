"use client";

import { Play } from "lucide-react";
import { usePlayer, type PlayerTrack } from "@/components/player";

interface PlayTrackButtonProps {
  tracks: PlayerTrack[];
  index: number;
}

export function PlayTrackButton({ tracks, index }: PlayTrackButtonProps) {
  const { replaceAndPlay } = usePlayer();

  return (
    <button
      onClick={() => replaceAndPlay(tracks, index)}
      className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      aria-label={`Play ${tracks[index]?.title}`}
    >
      <Play className="h-3.5 w-3.5" />
    </button>
  );
}
