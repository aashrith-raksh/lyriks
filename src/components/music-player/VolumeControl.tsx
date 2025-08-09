import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setVolume, setIsMuted } from "@/redux/features/playerSlice";
import { Slider } from "@/components/ui/slider";

import { forwardRef, type RefObject, useEffect } from "react";

const VolumeControl = forwardRef<HTMLAudioElement>((_props, ref) => {
  const dispatch = useAppDispatch();
  const audioRef = ref as RefObject<HTMLAudioElement>
  const { isMuted, volume } = useAppSelector((state) => state.player);
  const handleVolumeChange = (value: number[]) => {
    dispatch(setVolume(value[0]));
    if (value[0] > 0) {
      dispatch(setIsMuted(false));
    }
  };

  const toggleMute = () => {
    dispatch(setIsMuted(!isMuted));
  };

  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted, audioRef]);
  return (
    <div className="flex items-center gap-3 flex-shrink-0">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMute}
        className="h-7 w-7 p-0"
      >
        {isMuted || volume === 0 ? (
          <VolumeX className="h-3 w-3" />
        ) : (
          <Volume2 className="h-3 w-3" />
        )}
      </Button>
      <Slider
        value={[isMuted ? 0 : volume]}
        max={100}
        step={1}
        onValueChange={handleVolumeChange}
        className="w-20 h-1"
      />
    </div>
  );
});

export default VolumeControl;
