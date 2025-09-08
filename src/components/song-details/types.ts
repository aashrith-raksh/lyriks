import type { TrackDetailsResponse } from "@/redux/services/types/get-track-details-response";

export type SongDetailsHeaderArgs = {
  data?: TrackDetailsResponse;
};

export type ArtistDetails = {
  attributes: ArtistAttributes;
  id: string;
  type: string;
};

export type ArtistAttributes = {
  name: string;
};

export type LyricsArgs = SongDetailsHeaderArgs;
