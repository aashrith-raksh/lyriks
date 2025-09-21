import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "./ui/card";
import type {
  Relationships,
} from "@/redux/services/types/get-top-charts-response";
import PlayPauseButton from "./PlayPauseButton";
import { useAppSelector } from "@/redux/hook";
import type { SongCategory } from "@/redux/features/playerSlice";

type SongCardAttributes = {
  albumName?: string;
  artwork?: {url:string};
  artistName?: string;
}
export type SongCardArgs = {
  id?: string | number | undefined;
  attributes?: SongCardAttributes;
  relationships?: Partial<Relationships>;
  songIndex: number;
  songCategory: SongCategory;
  clickable?: boolean;

};

const SongCard = ({
  id,
  attributes,
  relationships,
  songIndex,
  songCategory,
  clickable=true
}: SongCardArgs) => {
  const {activeSongIndex, activeSongCategory} = useAppSelector(
    (state) => state.player
  );

  const albumName = attributes?.albumName || "Unknown Album"
  const artworkUrl = attributes?.artwork?.url || ""
  const artistName = attributes?.artistName || "Unknown Artist"
  const artistId = relationships?.artists?.data[0]?.id || null


  const isActive = (songIndex == activeSongIndex && songCategory == activeSongCategory);

  return (
    <Card
      key={id ?? albumName}
      className={`p-3 h-auto border-none ${
        isActive && "shadow-xl  shadow-foreground/50"
      }`}
    >
      <CardContent className="p-0 relative group">
        <img
          src={artworkUrl}
          alt={albumName + " album cover"}
          className="w-full h-40 object-cover rounded-md"
        />
        {clickable && <PlayPauseButton songIndex={songIndex} songCategory={songCategory} />}
      </CardContent>
      <CardFooter className="flex flex-col items-start px-0">
        <Link className="font-semibold hover:underline" to={`/songs/${id}`}>{attributes!.albumName}</Link>
        <Link
          to={`/artists/${artistId}`}
          className="text-muted-foreground text-sm hover:underline"
        >
          {artistName}
        </Link>
      </CardFooter>
    </Card>
  );
};



export default SongCard;
