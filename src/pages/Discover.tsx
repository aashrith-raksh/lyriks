import DataDisplay from "@/components/DataDisplay";
import DiscoverPageHeader from "@/components/discover/DiscoverHeader";
import MusicPlayer from "@/components/discover/MusicPlayer";

function Discover() {
  return (
    <>
      <DiscoverPageHeader />
      <DataDisplay cardVariant="songCard" dataType="songs" />
      <MusicPlayer />
    </>
  );
}

export default Discover;
