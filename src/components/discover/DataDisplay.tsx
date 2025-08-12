import { Loader2 } from "lucide-react";
import { useGetTopCharsQuery } from "@/redux/services/shazamCore";
import { useEffect,  useState, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCharts } from "@/redux/features/playerSlice";
import type { TopChartsResponse } from "@/redux/services/types/get-top-charts-response";

type DataDisplayProps = {
  children: (song: Partial<TopChartsResponse>, idx: number) => ReactNode;
  displayCardVariant: "chartCard" | "songCard";
};

const DataDisplay = ({ children, displayCardVariant }: DataDisplayProps) => {
  const { genre, searchTerm } = useAppSelector((state) => state.songsFilter);
  const { data, isFetching, isError } = useGetTopCharsQuery({
    genre_code: genre,
  });
  const dispatch = useAppDispatch();
  const [miniData, setMiniData] = useState<TopChartsResponse[]>([]);
  const [filteredData, setFilteredData] = useState<TopChartsResponse[]>([]);


  useEffect(() => {
    setFilteredData(
      miniData.filter((item) =>
        item.attributes.albumName.toLowerCase().includes(searchTerm)
      )
    );
  }, [searchTerm, miniData]);

  useEffect(() => {
    if (data) {
      setMiniData(data.slice(0, 10));
      if (displayCardVariant == "songCard") {
        const songs = miniData.map(({ id, attributes }) => ({
          artworkUrl: attributes.artwork.url,
          previewUrl: attributes.previews[0]?.url || "",
          chartId: id,
          title: attributes.albumName,
          artist: attributes.artistName,
        }));

        dispatch(setCharts(songs));
      }
    }
  }, [data, dispatch, displayCardVariant, miniData]);

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
          {filteredData.map((song, idx) => children(song, idx))}
        </div>
      );
    }
  }

  return content;
};

export default DataDisplay;
