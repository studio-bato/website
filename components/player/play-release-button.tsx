"use client";

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayer, type PlayerTrack } from "@/components/player";

interface PlayReleaseButtonProps {
  tracks: PlayerTrack[];
}

export function PlayReleaseButton({ tracks }: PlayReleaseButtonProps) {
  const { replaceAndPlay } = usePlayer();

  if (tracks.length === 0) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => replaceAndPlay(tracks)}
      className="gap-1.5"
    >
      <Play className="h-4 w-4" />
      Play all
    </Button>
  );
}
