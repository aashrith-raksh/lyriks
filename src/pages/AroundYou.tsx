import Error, { type CustomErrorResponseType } from "@/components/Error";
import Loading from "@/components/Loading";
import type { SongCardArgs } from "@/components/SongCard";
import SongCard from "@/components/SongCard";
import { cn } from "@/lib/utils";
import { setTopSongsAroundYou } from "@/redux/features/playerSlice";
import { useGetChartsByCountryCodeQuery } from "@/redux/services/shazamCore";
import { mapCountryWiseChartsToSongs } from "@/utils";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useDispatch } from "react-redux";

function AroundYou() {
  const [countryCode, setCountryCode] = useState(null);
  const dispatch = useDispatch();

  const { data, error, isFetching, isError } = useGetChartsByCountryCodeQuery({
    countryCode,
  });
  let content = <Loading />;

  const filteredData: SongCardArgs[] | undefined = useMemo(() => {
    if (data) {
      return data.slice(0, 20).map<SongCardArgs>((item, idx) => ({
        id: item.id,
        attributes: {
          albumName: item.attributes.albumName,
          artwork: {
            url: item.attributes.artwork.url,
          },
          artistName: item.attributes.artistName,
        },
        relationships: item.relationships,
        songIndex: idx,
        songCategory: "around-you",
      }));
    }else{
      return []
    }
  }, [data]);

  useEffect(() => {
    const fetchUrl = `${import.meta.env.VITE_GEO_API_HOST}?apiKey=${
      import.meta.env.VITE_GEO_API_KEY
    }`;
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        setCountryCode(data.location.country);
      });
  }, []);

  useEffect(() => {
    if (data) {
      const topSongsAroundYou = mapCountryWiseChartsToSongs(data);

      dispatch(setTopSongsAroundYou({ topSongsAroundYou }));
    }
  }, [data]);

  if (!isFetching) {
    if (countryCode && isError) {
      const errorData = (error as FetchBaseQueryError)?.data;
      const errorMessage =
        (errorData as CustomErrorResponseType)?.detail ||
        "Please try again after some time";

      content = <Error errorMessage={errorMessage} />;
    } else {
      content = (
        <section>
          <h1 className="text-4xl mb-4 font-bold">Top songs around you</h1>

          <ul
            className={cn("grid auto-grid gap-4")}
            style={
              {
                "--min-col-size": "200px",
              } as CSSProperties
            }
          >
            {filteredData?.map((item) => (
              <li>
                <SongCard {...item} />
              </li>
            ))}
          </ul>
        </section>
      );
    }
  }

  return content;
}

export default AroundYou;
