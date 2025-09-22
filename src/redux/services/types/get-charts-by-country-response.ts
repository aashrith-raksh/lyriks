export interface ChartsByCountryResponse {
 attributes:    Attributes;
 href:          string;
 id:            string;
 meta:          Meta;
 relationships: Relationships;
 type:          RootObjectType;
}

export interface Attributes {
 albumName:                 string;
 artistName:                string;
 artwork:                   Artwork;
 audioLocale:               AudioLocale;
 audioTraits:               AudioTrait[];
 composerName?:             string;
 contentRating?:            ContentRating;
 discNumber:                number;
 durationInMillis?:         number;
 genreNames:                string[];
 hasLyrics:                 boolean;
 hasTimeSyncedLyrics:       boolean;
 isAppleDigitalMaster:      boolean;
 isMasteredForItunes:       boolean;
 isVocalAttenuationAllowed: boolean;
 isrc:                      string;
 name:                      string;
 playParams?:               PlayParams;
 previews:                  Preview[];
 releaseDate:               Date;
 trackNumber:               number;
 url:                       string;
}

export interface Artwork {
 bgColor:    string;
 hasP3:      boolean;
 height:     number;
 textColor1: string;
 textColor2: string;
 textColor3: string;
 textColor4: string;
 url:        string;
 width:      number;
}

// ---- AudioLocale ----
export const AudioLocale = {
  Ar: "ar",
  EnUS: "en-US",
  EsES: "es-ES",
  Fi: "fi",
  FrFR: "fr-FR",
  Ig: "ig",
  Nl: "nl",
  PtPT: "pt-PT",
  Ru: "ru",
  Sq: "sq",
  ZhHansCN: "zh-Hans-CN",
  Zxx: "zxx",
} as const;

export type AudioLocale = (typeof AudioLocale)[keyof typeof AudioLocale];

// ---- AudioTrait ----
export const AudioTrait = {
  Atmos: "atmos",
  HiResLossless: "hi-res-lossless",
  Lossless: "lossless",
  LossyStereo: "lossy-stereo",
  Spatial: "spatial",
} as const;

export type AudioTrait = (typeof AudioTrait)[keyof typeof AudioTrait];

// ---- ContentRating ----
export const ContentRating = {
  Explicit: "explicit",
} as const;

export type ContentRating = (typeof ContentRating)[keyof typeof ContentRating];

// ---- Kind ----
export const Kind = {
  Song: "song",
} as const;

export type Kind = (typeof Kind)[keyof typeof Kind];

// ---- DatumType ----
export const DatumType = {
  Artists: "artists",
  MusicVideos: "music-videos",
} as const;

export type DatumType = (typeof DatumType)[keyof typeof DatumType];

// ---- RootObjectType ----
export const RootObjectType = {
  Songs: "songs",
} as const;

export type RootObjectType = (typeof RootObjectType)[keyof typeof RootObjectType];

// ---- Interfaces remain unchanged ----
export interface PlayParams {
  id: string;
  kind: Kind;
}

export interface Preview {
  url: string;
}

export interface Meta {
  contentVersion: ContentVersion;
  formerIds?: string[];
}

export interface ContentVersion {
  MZ_INDEXER: number;
  RTCI: number;
}

export interface Relationships {
  artists: Artists;
  "music-videos": MusicVideos;
}

export interface Artists {
  data: Datum[];
  href: string;
}

export interface Datum {
  href: string;
  id: string;
  type: DatumType;
}

export interface MusicVideos {
  data: Datum[];
  href: string;
  next?: string;
}
