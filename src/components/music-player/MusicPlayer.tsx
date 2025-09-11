import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import MusicPlayerHeader from "../music-player/PlayerHeader";
import PlayerControls from "../music-player/PlayerControls";
import VolumeControl from "../music-player/VolumeControl";
import ProgressBar from "../music-player/ProgressBar";
import useAudioPlayer from "@/hooks/useAudioPlayer";

export default function MusicPlayer() {
  const { activeSong, audioRef } = useAudioPlayer();
  if (!activeSong) return;

  return (
    <div
      className={cn(
        "bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 z-50 fixed"
      )}
    >
      <Card className="backdrop-blur-md bg-background/95 border shadow-lg dark:shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-6">
            {/* Album Artwork - Left */}
            <MusicPlayerHeader activeSong={activeSong} />

            {/* Music Info & Controls - Middle */}
            <div className="flex-1 min-w-0">
              <PlayerControls activeSong={activeSong} />

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
