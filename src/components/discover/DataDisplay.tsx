import {
  useGetArtistDetailsByIdQuery,
  useGetTopCharsQuery,
} from "@/redux/services/shazamCore";
import { useEffect, useMemo, type CSSProperties } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCharts } from "@/redux/features/playerSlice";
import type { TopChartsResponse } from "@/redux/services/types/get-top-charts-response";
import Loader from "@/assets/loader.svg";
import { useParams } from "react-router-dom";
import type { ArtistDetailsResponse } from "@/redux/services/types/get-artist-details-response";
import { cn } from "@/lib/utils";
import SongCard from "./SongCard";
import ChartCard from "./ChartCard";

type DataDisplayProps = {
  cardVariant: "chartCard" | "songCard";
  dataType: "songs" | "charts" | "artistDetails";
};

const DataDisplay = ({ cardVariant, dataType }: DataDisplayProps) => {
  const { genre, searchTerm } = useAppSelector((state) => state.songsFilter);
  const { id: artistId } = useParams();
  let queryResult = null;

  if (dataType == "artistDetails") {
    queryResult = useGetArtistDetailsByIdQuery({ artistId });
  } else {
    queryResult = useGetTopCharsQuery({
      genre_code: genre,
    });
  }
  const { data, isFetching, isError } = queryResult;
  const relatedSongs =
    dataType == "artistDetails"
      ? (data as ArtistDetailsResponse)?.data[0]?.views["top-songs"]?.data
      : [];
  const dispatch = useAppDispatch();

  const filteredData = useMemo(() => {
    if (dataType == "artistDetails") return;
    return (
      (data as TopChartsResponse[])
        ?.slice(0, 20)
        .filter((item) =>
          item.attributes.albumName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) ?? []
    );
  }, [data, searchTerm, dataType]);

  useEffect(() => {
    if (dataType == "songs") {
      if (data) {
        const songs = (data as TopChartsResponse[])
          .slice(0, 20)
          .map(({ id, attributes }) => ({
            artworkUrl: attributes.artwork.url,
            previewUrl: attributes.previews[0]?.url || "",
            chartId: id,
            title: attributes.albumName,
            artist: attributes.artistName,
          }));

        dispatch(setCharts(songs));
      }
    }
  }, [data, dispatch, dataType]);

  let content = <Loading />;

  if (!isFetching) {
    if (isError) {
      content = <Error />;
    } else {
      content = (
        <div
          className={cn(
            "grid auto-grid",
            dataType == "artistDetails" ? "gap-4" : "gap-8"
          )}
          style={
            {
              "--min-col-size": cardVariant == "chartCard" ? "1fr" : "200px",
            } as CSSProperties
          }
        >
          {dataType == "songs" &&
            filteredData?.map((song, idx) => (
              <SongCard {...song} songIndex={idx} />
            ))}
          {dataType == "charts" &&
            filteredData?.map((song, idx) => (
              <ChartCard {...song} songIndex={idx} />
            ))}
          {dataType == "artistDetails" &&
            relatedSongs?.map((song, idx) => {
              const { id, attributes } = song;
              const chartCardArgs = { id, attributes };
              return <ChartCard {...chartCardArgs} songIndex={idx} />;
            })}
        </div>
      );
    }
  }

  return content;
};

const Error = () => {
  return (
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
};

const Loading = () => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <img src={Loader} width={130} />
    </div>
  );
};

export default DataDisplay;
