import { Loader2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useGetTopCharsQuery } from "@/redux/services/shazamCore";

const DiscoverContent = () => {
  const { data, isFetching, isError } = useGetTopCharsQuery({});
  let content = (
    <div className="flex-1 flex justify-center items-center">
        <Loader2 size={40}/>
    </div>
  );

  if (!isFetching) {
    if (isError) {
      content = (
        <div className="flex-1 flex justify-center items-center">
          <p className="text-red-500 text-center font-light">
            <span className="text-xl font-semibold">Error while fetching top charts</span>
            <br />
            Please try again later
          </p>
        </div>
      );
    } else {
      content = (
        <div className="grid discover-content-grid gap-4 2xl:grid-cols-5">
          {data &&
            data.map(({ id, attributes }) => (
              <Card key={id} className="p-3 h-auto border-none">
                <CardContent className="p-0">
                  <img
                    src={attributes.artwork.url}
                    alt={attributes.albumName + " album cover"}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start px-0">
                  <span className="font-semibold">{attributes.artistName}</span>
                  <span className="text-muted-foreground text-sm">
                    {attributes.albumName}
                  </span>
                </CardFooter>
              </Card>
            ))}
        </div>
      );
    }
  }

  return content;
};

export default DiscoverContent;

/*
1. Implement Loading cards animation
2. Routing when clicked on song title 
3. ROuting when clicked on artist name
=================================
    4.THE. ACTUAL. MUSIC. PLAYER.
=================================
*/
