import DataDisplay from "@/components/discover/DataDisplay";
import DiscoverPageHeader from "@/components/discover/DiscoverHeader";
import MusicPlayer from "@/components/discover/MusicPlayer";
import SongCard, { type SongCardArgs } from "@/components/discover/SongCard";

function Discover() {
  return (
    <>
      <DiscoverPageHeader />
      <DataDisplay displayCardVariant="songCard">
        {(song: Partial<SongCardArgs>, idx: number) => (
          <SongCard {...song} songIndex={idx} />
        )}
      </DataDisplay>
      <MusicPlayer />
    </>
  );
}

export default Discover;
