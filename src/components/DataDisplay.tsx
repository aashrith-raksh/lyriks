import {
  useGetArtistDetailsByIdQuery,
  useGetTopCharsQuery,
} from "@/redux/services/shazamCore";
import { useEffect, useMemo, type CSSProperties, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCharts } from "@/redux/features/playerSlice";
import type { TopChartsResponse } from "@/redux/services/types/get-top-charts-response";
import Loader from "@/assets/loader.svg";
import { useParams } from "react-router-dom";
import type { ArtistDetailsResponse } from "@/redux/services/types/get-artist-details-response";
import { cn } from "@/lib/utils";
import SongCard from "./SongCard";
import ChartCard from "./ChartCard";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Header from "./Header";
import {
  filterDataBySearchTerm,
  getTopSongsOfArtist,
  mapTopChartsToSongs,
} from "@/utils";

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
  const dispatch = useAppDispatch();

  const artistDetailsQuery = useGetArtistDetailsByIdQuery(
    { artistId },
    { skip: dataType !== "artistDetails" || !artistId }
  );

  const topChartsQuery = useGetTopCharsQuery(
    { genre_code: genre },
    { skip: dataType === "artistDetails" }
  );

  const queryResult =
    dataType === "artistDetails" ? artistDetailsQuery : topChartsQuery;

  const { data, isFetching, isError, error } = queryResult;

  const topSongsOfArtist = useMemo(
    () => getTopSongsOfArtist(data as ArtistDetailsResponse, dataType),
    [data, dataType]
  );


  const filteredData = useMemo(() => {
    return filterDataBySearchTerm(
      data as TopChartsResponse[],
      searchTerm,
      dataType
    );
  }, [data, searchTerm, dataType]);

  useEffect(() => {
    if (dataType == "songs") {
      if (data) {
        const songs = mapTopChartsToSongs(data as TopChartsResponse[]);

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
        <>
          {dataType !== "artistDetails" && (
            <Content dataType={dataType} cardVariant={cardVariant}>
              {filteredData?.map((song, idx) =>
                dataType === "songs" ? (
                  <li key={song?.id}>
                    <SongCard {...song} songIndex={idx} />
                  </li>
                ) : (
                  <li key={song?.id}>
                    <ChartCard {...song} songIndex={idx} />
                  </li>
                )
              )}
            </Content>
          )}

          {dataType === "artistDetails" && (
            <>
              <Header
                headerType="artistHeader"
                data={data as ArtistDetailsResponse}
              />
              <br />
              <p className="text-2xl font-bold">Top Songs by Artist</p>
              <Content dataType={dataType} cardVariant={cardVariant}>
                {topSongsOfArtist?.map((song, idx) => {
                  const { id, attributes } = song;
                  const chartCardArgs = { id, attributes };
                  return (
                    <li key={song?.id}>
                      <ChartCard {...chartCardArgs} songIndex={idx} />
                    </li>
                  );
                })}
              </Content>
            </>
          )}
        </>
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
    <ul
      className={cn(
        "grid auto-grid",
        dataType === "artistDetails" ? "gap-4" : "gap-8"
      )}
      style={
        {
          "--min-col-size": cardVariant === "chartCard" ? "1fr" : "200px",
        } as CSSProperties
      }
    >
      {children}
    </ul>
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
