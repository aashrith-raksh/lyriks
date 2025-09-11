import {
  useGetArtistDetailsByIdQuery,
  useGetTopCharsQuery,
} from "@/redux/services/shazamCore";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCharts } from "@/redux/features/playerSlice";
import type { TopChartsResponse } from "@/redux/services/types/get-top-charts-response";
import { useParams } from "react-router-dom";
import type { ArtistDetailsResponse } from "@/redux/services/types/get-artist-details-response";
import SongCard from "./SongCard";
import ChartCard from "./ChartCard";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Header from "./Header";
import {
  filterDataBySearchTerm,
  getTopSongsOfArtist,
  mapTopChartsToSongs,
} from "@/utils";
import Loading from "./Loading";
import Error from "./Error";
import DataDisplayContent from "./DataDisplayContent";

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
            <DataDisplayContent dataType={dataType} cardVariant={cardVariant}>
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
            </DataDisplayContent>
          )}

          {dataType === "artistDetails" && (
            <>
              <Header
                headerType="artistHeader"
                data={data as ArtistDetailsResponse}
              />
              <br />
              <p className="text-2xl font-bold">Top Songs by Artist</p>
              <DataDisplayContent dataType={dataType} cardVariant={cardVariant}>
                {topSongsOfArtist?.map((song, idx) => {
                  const { id, attributes } = song;
                  const chartCardArgs = { id, attributes };
                  return (
                    <li key={song?.id}>
                      <ChartCard {...chartCardArgs} songIndex={idx} />
                    </li>
                  );
                })}
              </DataDisplayContent>
            </>
          )}
        </>
      );
    }
  }

  return content;
};






export default DataDisplay;
