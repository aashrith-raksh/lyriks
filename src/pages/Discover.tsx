import DiscoverContent from "@/components/discover/DiscoverContent";
import DiscoverPageHeader from "@/components/discover/DiscoverHeader";
import DiscoverTopCharts from "@/components/discover/DiscoverRightSideBar";

function Discover() {
  return (
    <section className="flex h-full gap-6 p-6">
      <div className="flex h-full flex-col flex-1 gap-6">
        <DiscoverPageHeader />
        <DiscoverContent />
      </div>
      <div className="basis-1/3 max-md:hidden">
        <DiscoverTopCharts />
      </div>
    </section>
  );
}

export default Discover;
