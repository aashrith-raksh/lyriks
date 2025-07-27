
import { Card, CardContent, CardFooter } from "../ui/card";
import { songs } from "../../assets/constants";

const DiscoverContent = () => {
  return (
    <div className="grid discover-content-grid gap-4 2xl:grid-cols-5">
      {songs.map((song, idx) => (
        <Card key={idx} className="p-3 h-auto border-none">
          <CardContent className="p-0">
            <img
              src={song.image}
              alt={song.artistName + ' album cover'}
              className="w-full h-40 object-cover rounded-md"
            />
          </CardContent>
          <CardFooter className="flex flex-col items-start px-0">
            <span className="font-semibold">{song.artistName}</span>
            <span className="text-muted-foreground text-sm">{song.albumName}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DiscoverContent;
