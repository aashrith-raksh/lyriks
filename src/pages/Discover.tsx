import DataDisplay from "@/components/DataDisplay";
import DiscoverPageHeader from "@/components/discover/DiscoverHeader";

function Discover() {
  return (
    <>
      <DiscoverPageHeader />
      <DataDisplay cardVariant="songCard" dataType="songs" />
    </>
  );
}

export default Discover;
