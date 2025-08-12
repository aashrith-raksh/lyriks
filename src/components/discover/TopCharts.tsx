import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter,
} from "../ui/card";
import type { SongCardArgs } from "./SongCard";
import { useAppSelector } from "@/redux/hook";
import PlayPauseButton from "./PlayPauseButton";
import DataDisplay from "./DataDisplay";

const TopCharts = () => {
  // const { data } = useGetTopCharsQuery({});
  return (
    <Card className="w-full max-w-md mx-auto gap-4 mb-4">
      <CardHeader className="flex flex-row items-baseline justify-between">
        <CardTitle className="text-lg">Top Charts</CardTitle>
        <CardAction className=" self-auto">
          <Link
            to="top-charts"
            className="text-xs font-normal  hover:underline"
          >
            See more
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="py-0">
        <DataDisplay displayCardVariant="chartCard">
          {(song: Partial<ChartCardArgs>, idx: number) => (
            <ChartCard {...song} songIndex={idx} />
          )}
        </DataDisplay>
      </CardContent>
    </Card>
  );
};

type ChartCardArgs = SongCardArgs;

const ChartCard = ({
  id,
  attributes,
  relationships,
  songIndex,
}: ChartCardArgs) => {
  const activeSongIndex = useAppSelector(
    (state) => state.player.activeSongIndex
  );

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
            src={attributes!.artwork.url}
            alt={attributes!.albumName + " album cover"}
            className="w-full max-w-full object-contain rounded-full"
          />
        </CardHeader>
        <CardContent className="flex flex-col flex-1 items-start p-0">
          <p className="font-normal text-[13px] leading-5">
            {attributes!.albumName}
          </p>
          <Link
            to={`artists/${relationships!.artists.data[0].id}`}
            className="text-muted-foreground text-xs hover:underline"
          >
            {attributes!.artistName}
          </Link>
        </CardContent>
        <CardFooter className="basis-1/6 grid p-0 place-content-center">
          <PlayPauseButton songIndex={songIndex} variant="chartCard" />
        </CardFooter>
      </Card>
    </>
  );
};

export default TopCharts;
