import { Loader2 } from "lucide-react";
import { useGetTopCharsQuery } from "@/redux/services/shazamCore";
import SongCard from "./SongCard";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setCharts } from "@/redux/features/playerSlice";

const DiscoverContent = () => {
  const { data, isFetching, isError } = useGetTopCharsQuery({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      const songs = data.slice(0,10).map(({ id, attributes }) => ({
        artworkUrl: attributes.artwork.url,
        previewUrl: attributes.previews[0]?.url || "",
        chartId: id,
        title: attributes.albumName,
        artist: attributes.artistName,
      }));

      dispatch(setCharts(songs));
    }
  }, [data]);

  let content = (
    <div className="flex-1 flex justify-center items-center">
      <Loader2 size={40} />
    </div>
  );

  if (!isFetching) {
    if (isError) {
      content = (
        <div className="flex-1 flex justify-center items-center">
          <p className="text-red-500 text-center font-light">
            <span className="text-xl font-semibold">
              Error while fetching top charts
            </span>
            <br />
            Please try again later
          </p>
        </div>
      );
    } else {
      content = (
        <div className="grid discover-content-grid gap-4 2xl:grid-cols-5">
          {data &&
            data
              .slice(0, 10)
              .map(({ id, attributes, relationships }, idx) => (
                <SongCard
                  id={id}
                  attributes={attributes}
                  relationships={relationships}
                  songIndex={idx}
                />
              ))}
        </div>
      );
    }
  }

  return content;
};

export default DiscoverContent;

/*
1. Implement Loading cards animation
2. Routing when clicked on song title 
3. ROuting when clicked on artist name
=================================
    4.THE. ACTUAL. MUSIC. PLAYER.
=================================
*/
