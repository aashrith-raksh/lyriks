import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "../ui/card";

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

const TopArtists = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-baseline justify-between">
        <CardTitle className="text-lg">Top Artists</CardTitle>
        <CardAction className=" self-auto">
          <Link
            to="/top-artists"
            className="text-xs font-normal  hover:underline"
          >
            See more
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default TopArtists;
