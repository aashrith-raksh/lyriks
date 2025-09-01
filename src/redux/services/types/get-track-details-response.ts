export interface TrackDetailsResponse {
 data:      Datum[];
 resources: Resources;
}

export interface Datum {
 id:   string;
 type: string;
}

export interface Resources {
 albums:              ResourcesAlbums;
 "artist-highlights": ArtistHighlights;
 artists:             Artists;
 lyrics:              ResourcesLyrics;
 "related-tracks":    RelatedTracks;
 "shazam-artists":    ShazamArtists;
 "shazam-songs":      ShazamSongs;
 songs:               Songs;
 "track-highlights":  TrackHighlights;
}

export interface ResourcesAlbums {
 "1441164495": The1441164495;
}

export interface The1441164495 {
 attributes: The1441164495_Attributes;
 id:         string;
 type:       string;
}

export interface The1441164495_Attributes {
 artistName:  string;
 name:        string;
 releaseDate: string;
}

export interface ArtistHighlights {
 "136975": Datum;
}

export interface Artists {
 "136975": The136975;
}

export interface The136975 {
 attributes: The136975_Attributes;
 id:         string;
 type:       string;
}

export interface The136975_Attributes {
 name: string;
}

export interface ResourcesLyrics {
 "30679967": The30679967;
}

export interface The30679967 {
 attributes?: The30679967_Attributes;
 href:        string;
 id:          string;
 type:        string;
}

export interface The30679967_Attributes {
 footer:             string;
 musixmatchLyricsId: string;
 providerName:       string;
 syncAvailable:      boolean;
 text:               string[];
}

export interface RelatedTracks {
 "track-similarities-id-216314": Datum;
}

export interface ShazamArtists {
 "42": Datum;
}

export interface ShazamSongs {
 "216314": The216314;
}

export interface The216314 {
 attributes:    The216314_Attributes;
 id:            string;
 relationships: Relationships;
 type:          string;
}

export interface The216314_Attributes {
 artist:                string;
 artwork:               Artwork;
 classicalAvailability: boolean;
 explicit:              boolean;
 genres:                Genres;
 images:                Images;
 isrc:                  string;
 label:                 string;
 primaryArtist:         string;
 share:                 Share;
 streaming:             Streaming;
 title:                 string;
 type:                  string;
 webUrl:                string;
}

export interface Artwork {
 bgColor:    string;
 textColor1: string;
 textColor2: string;
 textColor3: string;
 textColor4: string;
 url:        string;
}

export interface Genres {
 primary: string;
}

export interface Images {
 artistAvatar: string;
 coverArt:     string;
 coverArtHq:   string;
}

export interface Share {
 href:     string;
 html:     string;
 image:    string;
 snapchat: string;
 subject:  string;
 text:     string;
 twitter:  string;
}

export interface Streaming {
 deeplink: string;
 preview:  string;
 store:    string;
}

export interface Relationships {
 albums:              ArtistHighlightsClass;
 "artist-highlights": ArtistHighlightsClass;
 artists:             ArtistHighlightsClass;
 lyrics:              RelationshipsLyrics;
 "related-tracks":    ArtistHighlightsClass;
 "shazam-artists":    ArtistHighlightsClass;
 songs:               ArtistHighlightsClass;
 "track-highlights":  ArtistHighlightsClass;
}

export interface ArtistHighlightsClass {
 data: Datum[];
}

export interface RelationshipsLyrics {
 data: The30679967[];
}

export interface Songs {
 "1441164738": The1441164738;
}

export interface The1441164738 {
 attributes: The1441164738_Attributes;
 id:         string;
 type:       string;
}

export interface The1441164738_Attributes {
 hasLyrics:           boolean;
 hasTimeSyncedLyrics: boolean;
 unitags:             Unitag[];
}

export interface Unitag {
 namespace: string;
 score:     number;
 tag:       string;
}

export interface TrackHighlights {
 "1441164961": Datum;
}
