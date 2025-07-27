import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter,
} from "../ui/card";
import { songs } from "../../assets/constants";
import { Link } from "react-router-dom";

const artists = [
  "Taylor Swift",
  "Drake",
  "Billie Eilish",
  "Ed Sheeran",
  "Adele",
  "The Weeknd",
  "BTS",
  "Dua Lipa",
  "Post Malone",
  "Olivia Rodrigo",
];

const DiscoverTopCharts = () => {
  return (
    <Card className="w-full max-w-md mx-auto gap-4">
      <CardHeader className="flex flex-row items-baseline justify-between">
        <CardTitle className="text-lg">Top Charts</CardTitle>
        <CardAction className=" self-auto">
          <Link to="#" className="text-xs font-normal  hover:underline">
            See more
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="py-0">
        <ul className="space-y-4">
          {songs.slice(0, 5).map((song, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <img
                src={song.image}
                alt={song.artistName}
                width={40}
                className="object-cover aspect-square rounded-full"
              />
              <div>
                <p className="font-medium leading-tight text-foreground/90 text-sm">
                  {song.artistName}
                </p>
                <div className="text-xs text-muted-foreground">
                  {song.albumName}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 mt-10">
        <div className="flex w-full items-baseline justify-between">
          <span className="font-semibold text-lg text-foreground">
            Top Artists
          </span>
          <Link to="#" className="text-xs font-normal  hover:underline">
            See more
          </Link>
        </div>
        <ul className="flex flex-wrap gap-2 mt-2">
          {artists.slice(0, 5).map((artist, idx) => (
            <li
              key={idx}
              className="bg-muted px-2 py-1 rounded text-xs font-medium"
            >
              {artist}
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
};

export default DiscoverTopCharts;
