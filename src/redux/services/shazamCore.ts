import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TopChartsResponse } from "./types/get-top-charts-response";
import type { TrackDetailsResponse } from "./types/get-track-details-response";

type GetTopChartsArgs = {
  genre_code?: string;
  country_code?: string;
};

type GetTrackDetailsArgs = {
  songId?: number | string
}
const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${import.meta.env.VITE_RAPIDAPI_API_HOST}`,
    prepareHeaders: (headers) => {
      headers.set(
        "x-rapidapi-key",
        import.meta.env.VITE_RAPIDAPI_API_KEY
      );
      headers.set("x-rapidapi-host", "shazam-core.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopChars: builder.query<TopChartsResponse[], GetTopChartsArgs>({
      query: ({ genre_code = "POP", country_code = "DZ" }) =>
        `/v1/charts/genre-world?genre_code=${genre_code}&country_code=${country_code}`,
    }),
    getTrackDetailsById: builder.query<TrackDetailsResponse, GetTrackDetailsArgs>({
      query: ({songId}) => `/v2/tracks/details?track_id=${songId}`
    })
  }),
});

export const { useGetTopCharsQuery, useGetTrackDetailsByIdQuery } = shazamCoreApi;
export default shazamCoreApi;
