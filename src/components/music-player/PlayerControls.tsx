import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Button } from "../ui/button";
import {
  pause,
  resume,
  setActiveSongIndex,
  type Song,
} from "@/redux/features/playerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
const PlayerControls = ({ activeSong }: { activeSong: Song | null }) => {
  const dispatch = useAppDispatch();

  const togglePlayPause = () => {
    if (isPlaying) {
      dispatch(pause());
    } else {
      dispatch(resume());
    }
  };

  const player = useAppSelector((state) => state.player);
  const { activeSongIndex, isPlaying, charts } = player;

  const moveToPrevSong = () => {
    dispatch(setActiveSongIndex(activeSongIndex! - 1));
  };

  const moveToNextSong = () => {
    dispatch(setActiveSongIndex(activeSongIndex! + 1));
  };
  return (
    <div className="flex items-center justify-between mb-1">
      <div className="min-w-0 flex-1">
        <h4 className="font-medium text-sm truncate">{activeSong?.title}</h4>
        <p className="text-xs text-muted-foreground truncate">
          {activeSong?.artist}
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-1 ml-3">
        <Button
          variant="ghost"
          disabled={activeSongIndex == 0}
          size="sm"
          onClick={moveToPrevSong}
          className="h-7 w-7 p-0"
        >
          <SkipBack className="h-3 w-3" />
        </Button>

        <Button
          onClick={togglePlayPause}
          size="sm"
          className="h-8 w-8 rounded-full p-0"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={moveToNextSong}
          disabled={activeSongIndex == charts.length - 1}
          className="h-7 w-7 p-0"
        >
          <SkipForward className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default PlayerControls;
