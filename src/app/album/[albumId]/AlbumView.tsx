"use client"
import Image from "next/image";
import Link from "next/link";

import { Album } from "@/lib/types";
import TracksTable from "@/components/shared/TracksTable";
import { Heart } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toggleFavoriteAlbum } from "@/lib/actions/favorites";
import { useLibrary } from "@/lib/providers/LibraryProvider";
import { cn } from "@/lib/utils";

interface AlbumViewProps {
  album: Album;
}

const AlbumView = ({ album }: AlbumViewProps) => {

  const { albums } = useLibrary()

  const markedAsFav = albums.some(favAlbum => favAlbum.id === album.id)

  return (
    <div className="flex flex-col gap-8 text-foreground">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <Image
          src={album.images[0].url}
          alt={album.name}
          width={224}
          height={224}
          className="h-56 w-56 rounded-md object-cover shadow-lg"
        />
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 lg:flex-col">
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" onClick={
                async () => toggleFavoriteAlbum(album.id)
              }>
                <div className={
                  cn(
                    "group w-8 h-8 bg-primary/30 rounded-full flex justify-center items-center hover:bg-primary hover:scale-110 transition-all",
                    markedAsFav && "bg-primary"
                  )
                }>
                  <Heart size={20} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                Save to favorites
              </TooltipContent>
            </Tooltip>
            <h1 className="text-5xl lg:text-6xl font-bold">{album.name}</h1>
          </div>
          <div className="flex items-center gap-2 text-md text-muted-foreground">
            <Link
              href={`/artist/${album.artists[0].id}`}
              className="hover:underline text-primary"
            >
              {album.artists[0].name}
            </Link>
            <span>•</span>
            <span>
              {new Date(album.release_date).getFullYear()}
            </span>
            <span>•</span>
            <span>{album.total_tracks} songs</span>
          </div>
        </div>
      </div>
      <TracksTable tracks={album.tracks.items} />
    </div >
  );
}

export default AlbumView;