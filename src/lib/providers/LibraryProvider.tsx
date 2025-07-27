"use client"
import { createContext, use, useMemo, useState, useEffect } from "react";
import { Database } from "../types/database";
import { Album, Artist, Category, Track } from "../types";

export type Playlist = Database["public"]["Tables"]["playlists"]["Row"];

interface LibraryContextType {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  playlists: Playlist[];
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const fetchLibraryData = async () => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const [userFavorites, userPlaylists] = await Promise.all([
  //       getUserFavorites(),
  //       getUserPlaylists()
  //     ]);

  //     const { tracks: favTracks, albums: favAlbums, artists: favArtists } = userFavorites;

  //     setPlaylists(userPlaylists);
  //     setAlbums(favAlbums);
  //     setArtists(favArtists);
  //     setTracks(favTracks);
  //   } catch (err) {
  //     console.error('Error fetching library data:', err);
  //     setError(err instanceof Error ? err.message : 'Error loading library data');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchLibraryData();
  // }, []);

  const value = useMemo(() => ({
    selectedCategory,
    setSelectedCategory,
    playlists,
    albums,
    setAlbums,
    artists,
    setArtists,
    tracks,
    setTracks,
    isLoading,
    error
  }), [selectedCategory, playlists, albums, setAlbums, artists, setArtists, tracks, setTracks, isLoading, error]);

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

