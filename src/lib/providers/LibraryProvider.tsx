"use client"
import { createContext, use, useMemo, useState } from "react";
import { Database } from "../types/database";
import { Album, Artist, Category, Track } from "../types";

export type Playlist = Database["public"]["Tables"]["playlists"]["Row"];

interface LibraryContextType {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  playlists: Playlist[];
  setPlaylists: (playlists: Playlist[]) => void;
  albums: Album[];
  setAlbums: (albums: Album[]) => void;
  artists: Artist[];
  setArtists: (artists: Artist[]) => void;
  tracks: Track[];
  setTracks: (tracks: Track[]) => void;
}

const LibraryContext = createContext<LibraryContextType>({
  selectedCategory: Category.Playlists,
  setSelectedCategory: () => { },
  playlists: [],
  setPlaylists: () => { },
  albums: [],
  setAlbums: () => { },
  artists: [],
  setArtists: () => { },
  tracks: [],
  setTracks: () => { },

});

export const LibraryProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.Playlists);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);

  const value = useMemo(() => ({
    selectedCategory,
    setSelectedCategory,
    playlists,
    setPlaylists,
    albums,
    setAlbums,
    artists,
    setArtists,
    tracks,
    setTracks
  }), [selectedCategory, playlists, setPlaylists, albums, setAlbums, artists, setArtists, tracks, setTracks]);

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = use(LibraryContext);
  if (context === undefined) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
};

