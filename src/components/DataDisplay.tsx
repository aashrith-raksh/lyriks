import {
  useGetArtistDetailsByIdQuery,
  useGetTopCharsQuery,
} from "@/redux/services/shazamCore";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  setArtistTopSongs,
  setCharts,
  type Song,
} from "@/redux/features/playerSlice";
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
    if (dataType != "artistDetails") {
      if (data) {
        console.log("Setting topCharts, dataType:", dataType)
        const songs = mapTopChartsToSongs(data as TopChartsResponse[]);

        dispatch(setCharts(songs));
      }
    } else {
      if (data) {
        console.log("Setting artistTopSongs, dataType:", dataType)

        const artistTopSongs: Song[] = topSongsOfArtist.slice(0,10).map((item) => {
          const title = item.attributes.albumName || "Unknown album";
          const artist = item.attributes.artistName || "Unknown artist";
          const id = item.id;
          const previewUrl = item.attributes.previews?.[0]?.url || "";
          const artworkUrl = item.attributes.artwork.url;

          return {
            title,
            artist,
            id,
            previewUrl,
            artworkUrl,
            songCategory: "artistTopSongs"
          };
        });

        dispatch(
          setArtistTopSongs({
            activeSongCategory: "artistTopSongs",
            artistTopSongs,
          })
        );
      }
    }
  }, [data, dispatch, dataType, topSongsOfArtist]);

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
                    <SongCard songCategory={"charts"} {...song} songIndex={idx} />
                  </li>
                ) : (
                  <li key={song?.id}>
                    <ChartCard songCategory={"charts"} {...song} songIndex={idx} />
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
                      <ChartCard songCategory={"artistTopSongs"} {...chartCardArgs} songIndex={idx} />
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
