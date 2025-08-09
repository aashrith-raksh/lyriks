import { useAppSelector } from "@/redux/hook";
import { forwardRef, type RefObject } from "react";
import { Slider } from "../ui/slider";

const ProgressBar = forwardRef<HTMLAudioElement>((_props, ref) => {
  const audioRef = ref as RefObject<HTMLAudioElement>;
  const { currentTime, duration } = useAppSelector((s) => s.player);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (value: number[]) => {
    if (audioRef && audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };
  return (
    <div className="flex items-center gap-3 mt-2">
      <span className="text-xs text-muted-foreground w-8 text-right">
        {formatTime(currentTime)}
      </span>
      <Slider
        value={[currentTime]}
        max={duration}
        step={1}
        onValueChange={handleSeek}
        className="flex-1 h-1"
      />
      <span className="text-xs text-muted-foreground w-8">
        {duration ? formatTime(duration) : "00:00"}
      </span>
    </div>
  );
});

export default ProgressBar;
