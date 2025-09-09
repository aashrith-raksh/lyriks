export type ChartCardArgs = SongCardArgs;
import type { SongCardArgs } from "./SongCard";
import { useAppSelector } from "@/redux/hook";
import PlayPauseButton from "./PlayPauseButton";
import { Card } from "../ui/card";

const ChartCard = ({
  id,
  attributes,
  relationships,
  songIndex,
}: ChartCardArgs) => {
  const activeSongIndex = useAppSelector(
    (state) => state.player.activeSongIndex
  );

  const albumName = attributes?.albumName || "Unknown Album"
  const artworkUrl = attributes?.artwork?.url || ""
  const artistName = attributes?.artistName || "Unknown Artist"
  const artistId = relationships?.artists?.data[0]?.id || null



  const isActive = songIndex == activeSongIndex;
  return (
    <>
      <Card
        key={id}
        className={`h-auto border-none !flex-row gap-4 p-2 items-center justify-between ${
          isActive && "shadow-lg   shadow-foreground/10"
        }`}
      >
        <CardHeader className="p-0 basis-1/6 !gap-0 rounded-full">
          <img
            src={artworkUrl}
            alt={`${albumName} album cover`}
            className="w-full max-w-full object-contain rounded-full"
          />
        </CardHeader>
        <CardContent className="flex flex-col flex-1 items-start p-0">
          <p className="font-normal text-[13px] leading-5">
            {albumName}
          </p>
          {(artistId != null) && (
            <Link
              to={`artists/${artistId}`}
              className="text-muted-foreground text-xs hover:underline"
            >
              {artistName}
            </Link>
          )}
        </CardContent>
        <CardFooter className="basis-1/6 grid p-0 place-content-center">
          <PlayPauseButton songIndex={songIndex} variant="chartCard" />
        </CardFooter>
      </Card>
    </>
  );
};

export default ChartCard