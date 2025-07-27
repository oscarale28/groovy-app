export interface ArtistTracks {
    tracks: Track[];
}

export interface Track {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIDS;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: null;
    track_number: number;
    type: TrackType;
    uri: string;
}

export interface Album {
    album_type: AlbumTypeEnum;
    artists: Artist[];
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_playable: boolean;
    name: string;
    release_date: string;
    release_date_precision: ReleaseDatePrecision;
    total_tracks: number;
    type: AlbumTypeEnum;
    uri: string;
}

export enum AlbumTypeEnum {
    Album = "album",
    Single = "single",
}

export interface Artist {
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    genres: string[];
    id: string;
    images: SpotifyImage[];
    name: string;
    type: ArtistType;
    uri: string;
}

export interface Followers {
    href: string | null;
    total: number;
}

export interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

export interface ExternalUrls {
    spotify: string;
}

export enum ArtistType {
    Artist = "artist",
}

export interface Image {
    url: string;
    height: number;
    width: number;
}

export enum ReleaseDatePrecision {
    Day = "day",
}

export interface ExternalIDS {
    isrc: string;
}

export enum TrackType {
    Track = "track",
}

export enum Category {
    Playlists = "playlists",
    Albums = "albums",
    Artists = "artists",
    Tracks = "tracks"
}

