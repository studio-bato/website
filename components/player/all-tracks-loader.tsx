"use client";

import { useEffect } from "react";
import { usePlayer, type PlayerTrack } from "@/components/player";

export function AllTracksInitializer({ tracks }: { tracks: PlayerTrack[] }) {
  const { initAllTracks } = usePlayer();
  useEffect(() => {
    initAllTracks(tracks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
