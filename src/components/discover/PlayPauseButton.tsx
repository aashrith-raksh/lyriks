import { cn } from "@/lib/utils";
import { pause, setActiveSongIndex } from "@/redux/features/playerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { PauseCircle, PlayCircle } from "lucide-react";

const PlayPauseButton = ({ songIndex }: { songIndex: number }) => {
  const dispatch = useAppDispatch();
  const activeSongIndex = useAppSelector(
    (state) => state.player.activeSongIndex
  );

  const isActive = songIndex == activeSongIndex


  function handlePlaySong() {
    dispatch(setActiveSongIndex(songIndex));
  }

  function handlePauseSong() {
    dispatch(pause());
  }

  

  return (
    <div className={cn(
      "absolute inset-0 justify-center group-hover:flex items-center bg-background/60",
      isActive ? "flex" : "hidden"
      )}>
      {isActive ? (
        <button onClick={handlePauseSong} className="cursor-pointer">
          <PauseCircle />
        </button>
      ) : (
        <button onClick={handlePlaySong} className="cursor-pointer">
          <PlayCircle />
        </button>
      )}
    </div>
  );
};

export default PlayPauseButton;
