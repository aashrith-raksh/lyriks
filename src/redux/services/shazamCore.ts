import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TopChartsResponse } from "./types/get-top-charts-response";

type GetTopChartsArgs = {
  genre_code?: string;
  country_code?: string;
};
const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/",
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
  }),
});

export const { useGetTopCharsQuery } = shazamCoreApi;
export default shazamCoreApi;
