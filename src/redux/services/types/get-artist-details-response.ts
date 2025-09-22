export interface ArtistDetailsResponse {
 data: RootObjectDatum[];
}

export interface RootObjectDatum {
 attributes:    PurpleAttributes;
 avatar:        string;
 href:          string;
 id:            string;
 meta:          PurpleMeta;
 relationships: Relationships;
 type:          Type;
 views:         DatumViews;
}

export interface PurpleAttributes {
 artistBio:        string;
 artwork:          Artwork;
 bornOrFormed:     string;
 editorialArtwork: PurpleEditorialArtwork;
 genreNames:       GenreName[];
 name:             Name;
 origin:           string;
 url:              string;
}

export interface PurpleEditorialArtwork {
 subscriptionCover?: Artwork;
 subscriptionHero?:  Artwork;
}

export interface Artwork {
 bgColor:       string;
 gradient?:     Gradient;
 hasP3:         boolean;
 height:        number;
 textColor1:    string;
 textColor2:    string;
 textColor3:    string;
 textColor4:    string;
 textGradient?: string[];
 url:           string;
 width:         number;
}

export interface Gradient {
 color: string;
 y2:    number;
}


export type GenreName =
  | "Alternative"
  | "Folk"
  | "Music"
  | "Pop"
  | "Singer/Songwriter";

export type Name =
  | "Alex Warren"
  | "Alex Warren & Jelly Roll"
  | "Alex Warren & Luke Combs"
  | "Alex Warren & ROSÉ";

export interface PurpleMeta {
 views: MetaViews;
}

export interface MetaViews {
 order: string[];
}

export interface Relationships {
 albums: Albums;
}

export interface Albums {
 data:  AlbumsDatum[];
 href:  string;
 next?: string;
}

export interface AlbumsDatum {
 attributes?: FluffyAttributes;
 href:        string;
 id:          string;
 type:        Type;
}

export interface FluffyAttributes {
 artistName?:            Name;
 artwork:                Artwork;
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 audioTraits?:           any[];
 curatorName?:           string;
 description?:           Description;
 durationInMillis?:      number;
 editorialArtwork:       FluffyEditorialArtwork;
 editorialNotes?:        EditorialNotes;
 editorialPlaylistKind?: string;
 genreNames?:            GenreName[];
 has4K?:                 boolean;
 hasCollaboration?:      boolean;
 hasHDR?:                boolean;
 isChart?:               boolean;
 isrc?:                  string;
 lastModifiedDate?:      Date;
 name:                   string;
 playParams:             PlayParams;
 playlistType?:          string;
 previews?:              Preview[];
 releaseDate?:           Date;
 supportsSing?:          boolean;
 url:                    string;
 videoTraits?:           string[];
}

export interface Description {
 short:    string;
 standard: string;
}

export interface FluffyEditorialArtwork {
 subscriptionCover?: Artwork;
 subscriptionHero?:  Artwork;
}

export interface EditorialNotes {
 name?:    string;
 short:    string;
 standard: string;
 tagline:  string;
}

export interface PlayParams {
 id:           string;
 kind:         Kind;
 versionHash?: string;
}

export type Kind =
  | "album"
  | "musicVideo"
  | "playlist"
  | "song";

export interface Preview {
 artwork?: Artwork;
 hlsUrl?:  string;
 url:      string;
}

export type Type =
  | "albums"
  | "artists"
  | "music-videos"
  | "playlists"
  | "songs";

export interface DatumViews {
 "featured-albums":  FeaturedAlbums;
 "full-albums":      FeaturedAlbums;
 "latest-release":   FeaturedAlbums;
 playlists:          FeaturedAlbums;
 "similar-artists":  FeaturedAlbums;
 "top-music-videos": FeaturedAlbums;
 "top-songs":        FeaturedAlbums;
}

export interface FeaturedAlbums {
 attributes: FeaturedAlbumsAttributes;
 data:       FeaturedAlbumsDatum[];
 href:       string;
 next?:      string;
}

export interface FeaturedAlbumsAttributes {
 title: string;
}

export interface FeaturedAlbumsDatum {
 attributes:     TentacledAttributes;
 href:           string;
 id:             string;
 meta?:          FluffyMeta;
 relationships?: Relationships;
 type:           Type;
}

export interface TentacledAttributes {
 albumName?:                 string;
 artistBio?:                 string;
 artistName?:                Name;
 artwork:                    Artwork;
 audioLocale?:               AudioLocale;
 audioTraits?:               AudioTrait[];
 bornOrFormed?:              string;
 composerName?:              string;
 copyright?:                 string;
 curatorName?:               string;
 description?:               Description;
 discNumber?:                number;
 durationInMillis?:          number;
 editorialArtwork:           TentacledEditorialArtwork;
 editorialNotes?:            EditorialNotes;
 editorialPlaylistKind?:     string;
 genreNames?:                GenreName[];
 has4K?:                     boolean;
 hasCollaboration?:          boolean;
 hasHDR?:                    boolean;
 hasLyrics?:                 boolean;
 hasTimeSyncedLyrics?:       boolean;
 isAppleDigitalMaster?:      boolean;
 isChart?:                   boolean;
 isCompilation?:             boolean;
 isComplete?:                boolean;
 isMasteredForItunes?:       boolean;
 isPrerelease?:              boolean;
 isSingle?:                  boolean;
 isVocalAttenuationAllowed?: boolean;
 isrc?:                      string;
 lastModifiedDate?:          Date;
 name:                       string;
 origin?:                    string;
 playParams?:                PlayParams;
 playlistType?:              string;
 previews?:                  Preview[];
 recordLabel?:               string;
 releaseDate?:               Date;
 supportsSing?:              boolean;
 trackCount?:                number;
 trackNumber?:               number;
 upc?:                       string;
 url:                        string;
 videoTraits?:               string[];
}

export const AudioLocale = {
 EnUS : "en-US",
} as const

export type AudioLocale = (typeof AudioLocale)[keyof typeof AudioLocale]

export const AudioTrait = {
 Atmos: "atmos",
 Lossless: "lossless",
 LossyStereo: "lossy-stereo",
 Spatial: "spatial",
} as const

export type AudioTrait = (typeof AudioTrait)[keyof typeof AudioTrait]



export interface TentacledEditorialArtwork {
 bannerUber?:         Artwork;
 staticDetailSquare?: Artwork;
 staticDetailTall?:   Artwork;
 storeFlowcase?:      Artwork;
 subscriptionCover?:  Artwork;
 subscriptionHero?:   Artwork;
 superHeroTall?:      Artwork;
}

export interface FluffyMeta {
 contentVersion: ContentVersion;
}

export interface ContentVersion {
 MZ_INDEXER: number;
 RTCI:       number;
}
