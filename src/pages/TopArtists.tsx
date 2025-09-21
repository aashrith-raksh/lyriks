import Error, { type CustomErrorResponseType } from "@/components/Error";
import Loading from "@/components/Loading";
import type { SongCardArgs } from "@/components/SongCard";
import SongCard from "@/components/SongCard";
import { cn } from "@/lib/utils";
import { useGetTopCharsQuery } from "@/redux/services/shazamCore";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useMemo, type CSSProperties } from "react";

function TopArtists() {
  const { data, error, isFetching, isError } = useGetTopCharsQuery({});
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
    }
  }, [data]);

  if (!isFetching) {
    if (isError) {
      const errorData = (error as FetchBaseQueryError)?.data;
      const errorMessage =
        (errorData as CustomErrorResponseType)?.detail ||
        "Please try again after some time";

      content = <Error errorMessage={errorMessage} />;
    } else {
      content = (
        <section>
          <h1 className="text-4xl mb-4 font-bold">Top Artists</h1>

          <ul
            className={cn("grid auto-grid gap-4")}
            style={
              {
                "--min-col-size": "200px",
              } as CSSProperties
            }
          >
            {filteredData!.map((item) => (
              <li>
                <SongCard {...item} clickable={false}/>
              </li>
            ))}
          </ul>
        </section>
      );
    }
  }

  return content;
}

export default TopArtists;
