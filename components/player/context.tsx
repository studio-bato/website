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
  setIsPlaying: (playing: boolean) => void;
  setPlaylist: (tracks: PlayerTrack[]) => void;
  addToPlaylist: (tracks: PlayerTrack[]) => void;
  replaceAndPlay: (tracks: PlayerTrack[], index?: number) => void;
  currentTrackIndex: number;
  setCurrentTrackIndex: (index: number) => void;
  currentTime: number;
  duration: number;
  seek: (time: number) => void;
  startRadio: () => Promise<void>;
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

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((i) => (i < playlist.length - 1 ? i + 1 : 0));
  }, [playlist]);

  // Create the Audio object once on mount
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = "metadata";
    setPlaylist(shuffle(allTracks));
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  // Sync play/pause state to audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch((e) => {
        console.error(e);
        nextTrack();
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, nextTrack]);

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playlist[currentTrackIndex]) return;
    audio.src = playlist[currentTrackIndex].url;
    audio.load();
    if (isPlaying) {
      audio.play().catch((e) => {
        console.error(e);
        nextTrack();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex, playlist, nextTrack]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      nextTrack();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("all", console.log);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [playlist, nextTrack]);

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
    },
    [],
  );

  const startRadio = useCallback(async () => {
    const tracks = shuffle(allTracks);
    console.log(tracks);
    replaceAndPlay(tracks);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        playlist,
        setPlaylist,
        addToPlaylist,
        replaceAndPlay,
        currentTrackIndex,
        setCurrentTrackIndex,
        currentTime,
        duration,
        seek,
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
