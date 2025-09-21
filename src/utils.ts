import type { Song } from "./redux/features/playerSlice";
import type { ArtistDetailsResponse } from "./redux/services/types/get-artist-details-response";
import type { ChartsByCountryResponse } from "./redux/services/types/get-charts-by-country-response";
import type { TopChartsResponse } from "./redux/services/types/get-top-charts-response";

export function filterDataBySearchTerm(
  data: TopChartsResponse[],
  searchTerm: string,
  dataType: string
) {
  if (dataType === "artistDetails") return [];
  return (
    (data as TopChartsResponse[])
      ?.slice(0, 20)
      .filter((item) =>
        item.attributes.albumName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) || []
  );
}

export const getTopSongsOfArtist = (
  data: ArtistDetailsResponse,
  dataType: string
) => {
  if (dataType === "artistDetails") {
    return (
      (data as ArtistDetailsResponse)?.data[0]?.views["top-songs"]?.data ?? []
    );
  }
  return [];
};

export function mapTopChartsToSongs(data: TopChartsResponse[]): Song[] {
  return (data as TopChartsResponse[])
    .slice(0, 20)
    .map(({ id, attributes }) => ({
      artworkUrl: attributes.artwork.url,
      previewUrl: attributes.previews[0]?.url || "",
      id,
      title: attributes.albumName,
      artist: attributes.artistName,
      songCategory: "charts"
    }));
}

export function mapCountryWiseChartsToSongs(data: ChartsByCountryResponse[]): Song[] {
  return (data as ChartsByCountryResponse[])
    .slice(0, 20)
    .map(({ id, attributes }) => ({
      artworkUrl: attributes.artwork.url,
      previewUrl: attributes.previews[0]?.url || "",
      id,
      title: attributes.albumName,
      artist: attributes.artistName,
      songCategory: "around-you"
    }));
}
