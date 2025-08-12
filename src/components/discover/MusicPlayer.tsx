import { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { useAppSelector, useAppDispatch } from "@/redux/hook";
import {
  type Song,
  setDuration,
  setCurrentTime,
  pause,
  resume,
} from "@/redux/features/playerSlice";
import { cn } from "@/lib/utils";
import MusicPlayerHeader from "../music-player/PlayerHeader";
import PlayerControls from "../music-player/PlayerControls";
import VolumeControl from "../music-player/VolumeControl";
import ProgressBar from "../music-player/ProgressBar";

export default function MusicPlayer() {
  const dispatch = useAppDispatch();

  const player = useAppSelector((state) => state.player);
  const { activeSongIndex, charts, isPlaying } = player;
  const activeSongRef = useRef<Song | null>(null);

  useEffect(() => {
    if (activeSongIndex != null) {
      activeSongRef.current = charts[activeSongIndex];
    }
  }, [activeSongIndex, charts]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        dispatch(setCurrentTime(audioRef.current.currentTime));
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        dispatch(setDuration(audioRef.current.duration));
        if (isPlaying) {
          audioRef.current.play();
        }
      }
    };

    const handleEnded = () => {
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
    };

    if (activeSongRef.current) {
      const audio = new Audio(activeSongRef.current.previewUrl);
      audioRef.current = audio;

      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("ended", handleEnded);
    }
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
  }, [activeSongRef.current, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }, [isPlaying]);

  return (
    <div
      className={cn(
        "bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 z-50",
        activeSongRef.current ? "fixed" : "hidden"
      )}
    >
      <Card className="backdrop-blur-md bg-background/95 border shadow-lg dark:shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-6">
            {/* Album Artwork - Left */}
            <MusicPlayerHeader activeSong={activeSongRef.current} />

            {/* Music Info & Controls - Middle */}
            <div className="flex-1 min-w-0">
              <PlayerControls activeSong={activeSongRef.current} />

              {/* Progress Bar */}
              <ProgressBar ref={audioRef} />
            </div>

            {/* Volume Control - Right */}
            <VolumeControl ref={audioRef} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

