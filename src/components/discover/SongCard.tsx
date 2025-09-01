import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import type {
  Attributes,
  Relationships,
} from "@/redux/services/types/get-top-charts-response";
import PlayPauseButton from "./PlayPauseButton";
import { useAppSelector } from "@/redux/hook";

export type SongCardArgs = {
  id?: string | number | undefined;
  attributes?: Attributes;
  relationships?: Relationships;
  songIndex: number;
};

const SongCard = ({
  id,
  attributes,
  relationships,
  songIndex,
}: SongCardArgs) => {
  const activeSongIndex = useAppSelector(
    (state) => state.player.activeSongIndex
  );

  const isActive = songIndex == activeSongIndex;

  return (
    <Card
      key={id ?? attributes!.albumName}
      className={`p-3 h-auto border-none ${
        isActive && "shadow-xl  shadow-foreground/50"
      }`}
    >
      <CardContent className="p-0 relative group">
        <img
          src={attributes!.artwork.url}
          alt={attributes!.albumName + " album cover"}
          className="w-full h-40 object-cover rounded-md"
        />
        <PlayPauseButton songIndex={songIndex} />
      </CardContent>
      <CardFooter className="flex flex-col items-start px-0">
        <Link className="font-semibold hover:underline" to={`/songs/${id}`}>{attributes!.albumName}</Link>
        <Link
          to={`artists/${relationships!.artists.data[0].id}`}
          className="text-muted-foreground text-sm hover:underline"
        >
          {attributes!.artistName}
        </Link>
      </CardFooter>
    </Card>
  );
};



export default SongCard;
