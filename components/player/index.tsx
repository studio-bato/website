"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  ChevronUp,
  ChevronDown,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { usePlayer } from "./context";
import { getInitialPlaylist } from "./initialPlaylist";

export type { PlayerTrack } from "./context";
export { PlayerProvider, usePlayer } from "./context";

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function Player() {
  const {
    playlist,
    currentTrackIndex,
    setCurrentTrackIndex,
    isPlaying,
    setIsPlaying,
    currentTime,
    duration,
    seek,
    replaceAndPlay,
  } = usePlayer();
  const [isExpanded, setIsExpanded] = useState(false);

  const currentTrack = playlist[currentTrackIndex];

  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying, setIsPlaying]);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex(
      currentTrackIndex < playlist.length - 1 ? currentTrackIndex + 1 : 0,
    );
  }, [playlist.length, currentTrackIndex, setCurrentTrackIndex]);

  const prevTrack = useCallback(() => {
    setCurrentTrackIndex(
      currentTrackIndex > 0 ? currentTrackIndex - 1 : playlist.length - 1,
    );
  }, [playlist.length, currentTrackIndex, setCurrentTrackIndex]);

  const selectTrack = useCallback(
    (index: number) => {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    },
    [setCurrentTrackIndex, setIsPlaying],
  );

  const handleSeek = useCallback(
    (value: number[]) => {
      seek(value[0]);
    },
    [seek],
  );

  // Spacebar to toggle play/pause
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(
          (e.target as HTMLElement).tagName,
        )
      ) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [togglePlay]);

  if (!currentTrack) return null;

  function startRadio() {
    const tracks = getInitialPlaylist();
    replaceAndPlay(tracks);
  }
  return (
    <>
      {/* Expanded half-screen panel with backdrop */}
      {isExpanded && (
        <>
          {/* Dark blurry backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          />

          {/* Panel anchored to bottom, half viewport height */}
          <div className="fixed bottom-0 left-0 right-0 z-50 flex h-[90vh] lg:h-[50vh] flex-col rounded-t-2xl bg-background shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-end px-4 pt-3 pb-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>

            {/* Main content */}
            <div className="flex flex-col items-center gap-4 overflow-hidden px-6 pt-4 pb-8">
              <div className="flex items-center gap-5">
                {/* Cover */}
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Track info */}
                <div className="min-w-0">
                  <p className="text-sm text-foreground">
                    {currentTrack.artist}
                  </p>
                  <p className="text-lg font-semibold">{currentTrack.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentTrack.album}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex w-full max-w-sm items-center gap-3">
                <span className="text-xs text-muted-foreground w-10 text-right">
                  {formatTime(currentTime)}
                </span>
                <Slider
                  value={[currentTime]}
                  max={duration || 1}
                  step={1}
                  onValueChange={handleSeek}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-10">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6">
                <Button variant="ghost" size="icon" onClick={prevTrack}>
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  className="h-14 w-14 rounded-full [&_svg]:size-6"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-0.5" />
                  )}
                </Button>
                <Button variant="ghost" size="icon" onClick={nextTrack}>
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Playlist */}
            <div className="border-t flex-1 overflow-y-auto">
              <div className="px-4 py-3">
                <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                  Playlist
                </p>
                {playlist.map((track, index) => (
                  <button
                    key={index}
                    onClick={() => selectTrack(index)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-secondary",
                      index === currentTrackIndex && "bg-secondary",
                    )}
                  >
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded">
                      <Image
                        src={track.cover}
                        alt={track.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {track.title}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {track.artist}
                      </p>
                    </div>
                    {index === currentTrackIndex && isPlaying && (
                      <Play className="h-6 w-6 ml-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Minimized bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-2 px-3">
          {/* Play/Pause */}
          <Button variant="ghost" size="icon" onClick={togglePlay}>
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>

          {/* Next */}
          <Button variant="ghost" size="icon" onClick={nextTrack}>
            <SkipForward className="h-4 w-4" />
          </Button>

          {/* Cover thumbnail */}
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded">
            <Image
              src={currentTrack.cover}
              alt={currentTrack.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Track info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{currentTrack.title}</p>
            <p className="truncate text-xs text-muted-foreground">
              {currentTrack.artist}
            </p>
          </div>

          <Button variant="outline" size="sm" onClick={startRadio}>
            <span className="hidden md:block">Tune radio</span>
            <Radio className="w-4 h-4" color="#ff4800" />
          </Button>

          {/* Expand */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(true)}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>

        {/* Thin progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted">
          <div
            className="h-full bg-foreground transition-[width] duration-200 ease-linear"
            style={{
              width: `${duration ? (currentTime / duration) * 100 : 0}%`,
            }}
          />
        </div>
      </div>
    </>
  );
}
