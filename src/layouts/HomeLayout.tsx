import MusicPlayer from "@/components/music-player/MusicPlayer";
import TopCharts from "@/components/TopCharts";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <section className="flex h-full max-h-screen gap-6 p-6">
      <div className="flex h-full flex-col flex-1 gap-6">
        <Outlet />
        <MusicPlayer />
      </div>
      <div className="basis-1/3 max-md:hidden max-h-full">
        <TopCharts />
      </div>
    </section>
  );
};

export default HomeLayout;
