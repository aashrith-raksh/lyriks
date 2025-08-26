import DataDisplay from "@/components/discover/DataDisplay";
import DiscoverPageHeader from "@/components/discover/DiscoverHeader";
import MusicPlayer from "@/components/discover/MusicPlayer";
import SongCard, { type SongCardArgs } from "@/components/discover/SongCard";
import TopCharts from "@/components/discover/TopCharts";

function Discover() {
  return (
    <section className="flex h-full max-h-screen gap-6 p-6">
      <div className="flex h-full flex-col flex-1 gap-6">
        <DiscoverPageHeader />
        <DataDisplay displayCardVariant="songCard">
          {(song: Partial<SongCardArgs>, idx: number) => (
            <SongCard {...song} songIndex={idx} />
          )}
        </DataDisplay>
        <MusicPlayer />
      </div>
      <div className="basis-1/3 max-md:hidden max-h-full">
        <TopCharts />
      </div>
    </section>
  );
}

export default Discover;
