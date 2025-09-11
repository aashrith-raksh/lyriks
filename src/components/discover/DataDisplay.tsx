import {
  useGetArtistDetailsByIdQuery,
  useGetTopCharsQuery,
} from "@/redux/services/shazamCore";
import {
  useEffect,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCharts } from "@/redux/features/playerSlice";
import type { TopChartsResponse } from "@/redux/services/types/get-top-charts-response";
import Loader from "@/assets/loader.svg";
import { useParams } from "react-router-dom";
import type {
  ArtistDetailsResponse,
} from "@/redux/services/types/get-artist-details-response";
import { cn } from "@/lib/utils";
import SongCard from "./SongCard";
import ChartCard from "./ChartCard";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Header from "../Header";

type DataDisplayProps = {
  cardVariant: "chartCard" | "songCard";
  dataType: "songs" | "charts" | "artistDetails";
};

type CustomErrorResponseType = {
  detail?: string;
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
  const { data, isFetching, isError, error } = queryResult;
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
      const errorData = (error as FetchBaseQueryError)?.data;
      const errorMessage =
        (errorData as CustomErrorResponseType)?.detail ||
        "Please try again after some time";

      content = <Error errorMessage={errorMessage} />;
    } else {
      content = (
        <Content dataType={dataType} cardVariant={cardVariant}>
          {dataType != "artistDetails" &&
            filteredData?.map((song, idx) => {
              return dataType == "songs" ? (
                <SongCard {...song} songIndex={idx} />
              ) : (
                <ChartCard {...song} songIndex={idx} />
              );
            })}

          {dataType == "artistDetails" && (
            <>
              {
                <Header
                  headerType={"artistHeader"}
                  data={data as ArtistDetailsResponse}
                />
              }
              <br />
              <p className="text-2xl font-bold">Top Songs by Artist</p>
              {relatedSongs?.map((song, idx) => {
                const { id, attributes } = song;
                const chartCardArgs = { id, attributes };
                return <ChartCard {...chartCardArgs} songIndex={idx} />;
              })}
            </>
          )}
        </Content>
      );
    }
  }

  return content;
};

const Content = ({
  dataType,
  cardVariant,
  children,
}: {
  dataType: string;
  cardVariant: string;
  children: ReactNode;
}) => {
  return (
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
      {children}
    </div>
  );
};

const Error = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <p className="text-red-500 text-center font-light">
        <span className="text-xl font-semibold">Error while fetching data</span>
        <br />
        {errorMessage}
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
