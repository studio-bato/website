"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { shuffle } from "@/components/player/utils";

export interface PlayerTrack {
  title: string;
  artist: string;
  album: string;
  cover?: string;
  url: string;
  releaseId: string;
}

interface PlayerContextValue {
  playlist: PlayerTrack[];
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTime: number;
  duration: number;
  togglePlayback: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  selectTrack: (index: number) => void;
  seek: (time: number) => void;
  replaceAndPlay: (tracks: PlayerTrack[], index?: number) => void;
  addToPlaylist: (tracks: PlayerTrack[]) => void;
  startRadio: () => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

interface PlayerProviderProps {
  children: ReactNode;
  allTracks?: PlayerTrack[];
}

export function PlayerProvider({
  children,
  allTracks = [],
}: PlayerProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playlist, setPlaylist] = useState<PlayerTrack[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Refs for latest values — avoids stale closures in stable callbacks
  const playlistRef = useRef(playlist);
  const currentTrackIndexRef = useRef(currentTrackIndex);
  const isPlayingRef = useRef(isPlaying);
  playlistRef.current = playlist;
  currentTrackIndexRef.current = currentTrackIndex;
  isPlayingRef.current = isPlaying;

  // ── Imperative helpers ──────────────────────────────────────────────

  const loadAndPlay = useCallback(
    (tracks: PlayerTrack[], index: number, shouldPlay: boolean) => {
      const audio = audioRef.current;
      if (!audio || !tracks[index]) return;
      audio.src = tracks[index].url;
      audio.load();
      if (shouldPlay) {
        audio.play().catch(console.error);
      }
    },
    [],
  );

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlayingRef.current) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(console.error);
      setIsPlaying(true);
    }
  }, []);

  const nextTrack = useCallback(() => {
    const pl = playlistRef.current;
    if (pl.length === 0) return;
    const next =
      currentTrackIndexRef.current < pl.length - 1
        ? currentTrackIndexRef.current + 1
        : 0;
    setCurrentTrackIndex(next);
    loadAndPlay(pl, next, isPlayingRef.current);
  }, [loadAndPlay]);

  const prevTrack = useCallback(() => {
    const audio = audioRef.current;
    const pl = playlistRef.current;
    if (pl.length === 0) return;
    // If more than 2s in, restart the current track
    if (audio && audio.currentTime > 2) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    const prev =
      currentTrackIndexRef.current > 0
        ? currentTrackIndexRef.current - 1
        : pl.length - 1;
    setCurrentTrackIndex(prev);
    loadAndPlay(pl, prev, isPlayingRef.current);
  }, [loadAndPlay]);

  const selectTrack = useCallback(
    (index: number) => {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
      loadAndPlay(playlistRef.current, index, true);
    },
    [loadAndPlay],
  );

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const addToPlaylist = useCallback((tracks: PlayerTrack[]) => {
    setPlaylist((prev) => [...prev, ...tracks]);
  }, []);

  const replaceAndPlay = useCallback(
    (tracks: PlayerTrack[], index: number = 0) => {
      setPlaylist(tracks);
      setCurrentTrackIndex(index);
      setIsPlaying(true);
      loadAndPlay(tracks, index, true);
    },
    [loadAndPlay],
  );

  const startRadio = useCallback(() => {
    replaceAndPlay(shuffle(allTracks));
  }, [allTracks, replaceAndPlay]);

  // ── Effects ─────────────────────────────────────────────────────────

  // Create Audio element once on mount, set initial playlist, pre-load first track
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;
    const initial = shuffle(allTracks);
    setPlaylist(initial);
    if (initial[0]) {
      audio.src = initial[0].url;
      audio.load();
    }
    return () => {
      audio.pause();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Audio element event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => nextTrack();

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [nextTrack]);

  // MediaSession API — hardware / OS media keys
  useEffect(() => {
    if (!("mediaSession" in navigator)) return;

    const session = navigator.mediaSession;
    session.setActionHandler("play", () => {
      audioRef.current?.play().catch(console.error);
      setIsPlaying(true);
    });
    session.setActionHandler("pause", () => {
      audioRef.current?.pause();
      setIsPlaying(false);
    });
    session.setActionHandler("previoustrack", prevTrack);
    session.setActionHandler("nexttrack", nextTrack);
    session.setActionHandler("seekto", (details) => {
      if (details.seekTime != null) seek(details.seekTime);
    });

    return () => {
      session.setActionHandler("play", null);
      session.setActionHandler("pause", null);
      session.setActionHandler("previoustrack", null);
      session.setActionHandler("nexttrack", null);
      session.setActionHandler("seekto", null);
    };
  }, [nextTrack, prevTrack, seek]);

  // Update MediaSession metadata when track changes
  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    const track = playlist[currentTrackIndex];
    if (!track) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: track.album,
      artwork: track.cover ? [{ src: track.cover }] : [],
    });
  }, [playlist, currentTrackIndex]);

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        playlist,
        currentTrackIndex,
        currentTime,
        duration,
        togglePlayback,
        nextTrack,
        prevTrack,
        selectTrack,
        seek,
        replaceAndPlay,
        addToPlaylist,
        startRadio,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return ctx;
}
