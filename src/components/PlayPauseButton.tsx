import { cn } from "@/lib/utils";
import { pause, setActiveSongIndex } from "@/redux/features/playerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { PauseCircle, PlayCircle } from "lucide-react";

type PlayPauseButtonProps = {
  songIndex: number;
  variant?: "songCard" | "chartCard";
};

const variantClasses: Record<"songCard" | "chartCard", string> = {
  songCard: "absolute inset-0 justify-center group-hover:flex items-center bg-background/60",
  chartCard: "text-foreground/80", 
};

const PlayPauseButton = ({
  songIndex,
  variant = "songCard",
}: PlayPauseButtonProps) => {
  const dispatch = useAppDispatch();
  const {activeSongIndex, isPlaying} = useAppSelector(
    (state) => state.player
  );


  const isActive = songIndex == activeSongIndex;

  function handlePlaySong() {
    dispatch(setActiveSongIndex(songIndex));
  }

  function handlePauseSong() {
    dispatch(pause());
  }

  return (
    <div
      className={cn(
        variantClasses[variant],
        variant === "songCard"
          ? isActive
            ? "flex"
            : "hidden"
          : "flex"
      )}
    >
      {isActive && isPlaying ? (
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
