import { Loader2 } from "lucide-react";
import { useGetTopCharsQuery } from "@/redux/services/shazamCore";
import { useEffect, type ReactNode } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setCharts } from "@/redux/features/playerSlice";
import type { TopChartsResponse } from "@/redux/services/types/get-top-charts-response";

type DataDisplayProps = {
  children: (song: Partial<TopChartsResponse>, idx: number) => ReactNode;
  displayCardVariant: "chartCard" | "songCard";
};

const DataDisplay = ({ children, displayCardVariant }: DataDisplayProps) => {
  const { data, isFetching, isError } = useGetTopCharsQuery({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    
    if (displayCardVariant == "songCard") {
      if (data) {
        const songs = data.slice(0, 10).map(({ id, attributes }) => ({
          artworkUrl: attributes.artwork.url,
          previewUrl: attributes.previews[0]?.url || "",
          chartId: id,
          title: attributes.albumName,
          artist: attributes.artistName,
        }));
  
        dispatch(setCharts(songs));
      }
    }
  }, [data, dispatch, displayCardVariant]);

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
        <div className="grid discover-content-grid gap-8 2xl:grid-cols-5">
          {data && data.slice(0, 10).map((song, idx) => children(song, idx))}
        </div>
      );
    }
  }

  return content;
};

export default DataDisplay;
