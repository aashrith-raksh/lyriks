import type { TrackDetailsResponse } from "@/redux/services/types/get-track-details-response";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

type SongDetailsHeaderArgs = {
    data?: TrackDetailsResponse
}


type ArtistDetails = {
  attributes: ArtistAttributes;
  id: string;
  type: string;
};

type ArtistAttributes = {
  name: string;
};

const SongDetailsHeader = ({data}:SongDetailsHeaderArgs) => {
  const artworkUrl =
    Object.entries(data?.resources["shazam-songs"] || {})[0][1]?.attributes
      ?.artwork.url ?? "";
  const artistDetails: ArtistDetails | undefined = Object.values(
    data?.resources.artists || {}
  )[0];
  const artistName = artistDetails?.attributes?.name ?? "Unknown Artist";
  const artistId = artistDetails?.id ?? "";
  const albumName =
    Object.values(data?.resources.albums || {})[0].attributes.name ??
    "Unknown Song";
  return (
    <section className="bg-background">
      <Card className="!flex-row items-center py-6 px-4">
        <img
          src={artworkUrl}
          alt={`${albumName} cover`}
          width={220}
          className="rounded-full w-32 block object-center aspect-square"
        />
        <CardContent className="grow p-0">
          <h1 className="text-2xl font-semibold mb-1">{albumName}</h1>
          {artistId ? (
            <Link
              to={`/artists/${artistId}`}
              className="text-sm text-foreground/80 hover:underline"
            >
              {artistName}
            </Link>
          ) : (
            <p className="text-sm text-foreground/80">{artistName}</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default SongDetailsHeader;
