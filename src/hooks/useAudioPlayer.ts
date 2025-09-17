import { useRef, useEffect, useCallback } from "react";

import { useAppSelector, useAppDispatch } from "@/redux/hook";
import {
  setDuration,
  setCurrentTime,
  pause,
  resume,
  type Song,
} from "@/redux/features/playerSlice";
export default function useAudioPlayer() {
  const dispatch = useAppDispatch();

  const player = useAppSelector((state) => state.player);
  const { isPlaying, activeSong } = player;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      dispatch(setCurrentTime(audioRef.current.currentTime));
    }
  }, [activeSong]);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      dispatch(setDuration(audioRef.current.duration));
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [activeSong]);

  const handleEnded = useCallback(() => {
    if (audioRef.current) {
      dispatch(pause());
      setTimeout(() => {
        if (audioRef.current) {
          dispatch(setCurrentTime(0));
          audioRef.current.currentTime = 0;
          dispatch(resume());
        }
      }, 1000);
    }
  }, [activeSong]);

  useEffect(() => {
    if (!activeSong) return;

    const audio = new Audio(activeSong.previewUrl);
    audioRef.current = audio;

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioRef.current.addEventListener("ended", handleEnded);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioRef.current.removeEventListener("ended", handleEnded);
      }
    };
  }, [activeSong]);

  useEffect(() => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }, [isPlaying]);

  return {
    audioRef,
    activeSong,
  };
}
