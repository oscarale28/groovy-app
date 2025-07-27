"use client"
import { createContext, use, useMemo, useState, useEffect } from "react";
import { Database } from "../types/database";
import { Category } from "../types";
import { getUserFavorites } from "../actions/favorites";
import { getUserPlaylists } from "../actions/playlists";

export type Playlist = Database["public"]["Tables"]["playlists"]["Row"];
export type Album = Omit<
  Database["public"]["Tables"]["user_favorite_albums"]["Row"],
  'id' | 'user_id'>;
export type Artist = Omit<Database["public"]["Tables"]["user_favorite_artists"]["Row"], 'id' | 'user_id'>;
export type Track = Omit<Database["public"]["Tables"]["user_favorite_tracks"]["Row"], 'id' | 'user_id'>;


interface LibraryContextType {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  playlists: Playlist[];
  albums: Album[];
  artists: Artist[];
  tracks: Track[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const LibraryContext = createContext<LibraryContextType>({
  selectedCategory: Category.Playlists,
  setSelectedCategory: () => { },
  playlists: [],
  albums: [],
  artists: [],
  tracks: [],
  isLoading: false,
  error: null,
  refetch: async () => { },
});

export const LibraryProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.Playlists);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLibraryData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [userFavorites, userPlaylists] = await Promise.all([
        getUserFavorites(),
        getUserPlaylists()
      ]);

      const { tracks: favTracks, albums: favAlbums, artists: favArtists } = userFavorites;

      setPlaylists(userPlaylists);
      setAlbums(favAlbums);
      setArtists(favArtists);
      setTracks(favTracks);
    } catch (err) {
      console.error('Error fetching library data:', err);
      setError(err instanceof Error ? err.message : 'Error loading library data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLibraryData();
  }, []);

  const value = useMemo(() => ({
    selectedCategory,
    setSelectedCategory,
    playlists,
    albums,
    artists,
    tracks,
    isLoading,
    error,
    refetch: fetchLibraryData
  }), [selectedCategory, playlists, albums, artists, tracks, isLoading, error]);

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

