import type { Song } from "@/redux/features/playerSlice";

const MusicPlayerHeader = ({activeSong}:{activeSong:Song|null}) => {
  return (
    <div className="flex-shrink-0">
      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400">
        <img
          src={activeSong?.artworkUrl}
          alt={activeSong?.title}
          width={48}
          height={48}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default MusicPlayerHeader;
