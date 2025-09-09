import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "../ui/card";
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
        <DataDisplay cardVariant="chartCard" dataType="charts" />
      </CardContent>
    </Card>
  );
};

export default TopCharts;
