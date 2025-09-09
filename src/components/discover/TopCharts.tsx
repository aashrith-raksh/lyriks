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
  return (
    <Card className="w-full max-w-md mx-auto gap-4 mb-4 max-h-full">
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
      <CardContent className="py-0 overflow-y-scroll scrollbar-custom">
        <DataDisplay cardVariant="chartCard" dataType="charts">
          {(song: Partial<ChartCardArgs>, idx: number) => (
            <ChartCard {...song} songIndex={idx} />
          )}
        </DataDisplay>
      </CardContent>
    </Card>
  );
};


export default TopCharts;
