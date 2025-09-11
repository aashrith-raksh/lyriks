import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import type { TrackDetailsResponse } from "@/redux/services/types/get-track-details-response";
import type { ArtistDetailsResponse } from "@/redux/services/types/get-artist-details-response";

type HeaderArgs = {
  data?: TrackDetailsResponse | ArtistDetailsResponse;
  headerType: "songHeader" | "artistHeader";
};

type ArtistDetails = {
  attributes: {
    name: string;
  };
  id: string;
  type: string;
};

const Header = ({ data, headerType }: HeaderArgs) => {
  let artistName = null;
  let artworkUrl = null;
  let artistId = null;
  let albumName = null;
  let genres = null;
  if (headerType == "songHeader") {
    artworkUrl =
      Object.entries(
        (data as TrackDetailsResponse)?.resources["shazam-songs"] || {}
      )[0][1]?.attributes?.artwork.url ?? "";

    const artistDetails: ArtistDetails | undefined = Object.values(
      (data as TrackDetailsResponse)?.resources.artists || {}
    )[0];

    artistName = artistDetails?.attributes?.name ?? "Unknown Artist";
    artistId = artistDetails?.id ?? "";
    albumName =
      Object.values((data as TrackDetailsResponse)?.resources.albums || {})[0]
        .attributes.name ?? "Unknown Song";
  } else {
    artistName = (data as ArtistDetailsResponse).data[0].attributes.name;
    artworkUrl = (data as ArtistDetailsResponse).data[0].attributes.artwork.url;
    genres = (data as ArtistDetailsResponse).data[0].attributes.genreNames;
  }

  let content;
  if (headerType == "songHeader") {
    if (artistId) {
      content = (
        <Link
          to={`/artists/${artistId}`}
          className="text-sm text-foreground/80 hover:underline"
        >
          {artistName}
        </Link>
      );
    } else {
      content = <p className="text-sm text-foreground/80">{artistName}</p>;
    }
  } else {
    content = (
      <ul className="flex mt-2">
        {genres?.map((genre) => (
          <li className="text-sm border px-2 rounded-sm py-0.5 bg-accent">
            {genre}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <section className="bg-background">
      <Card className="!flex-row items-center py-6 px-4">
        <img
          src={artworkUrl}
          alt={`${headerType == "songHeader" ? albumName : artistName} cover`}
          width={220}
          height={220}
          className="rounded-full w-32 block object-center aspect-square"
        />
        <CardContent className="grow p-0">
          <h1 className="text-2xl font-semibold mb-1">
            {headerType == "songHeader" ? albumName : artistName}
          </h1>
          {content}
        </CardContent>
      </Card>
    </section>
  );
};

export default Header;
