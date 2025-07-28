'use client'
import Image from "next/image";
import { Album, Artist, Category, Track } from "@/lib/types";
import { Heart, HeartOff, ListMusic } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toggleFavoriteArtist } from "@/lib/actions/favorites";
import { useLibrary } from "@/lib/providers/LibraryProvider";
import { cn, formatDuration } from "@/lib/utils";
import { useTransition } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import AlbumCard from "@/components/shared/AlbumCard";
import ArtistTopTracks from "./ArtistTopTracks";
import ArtistAlbums from "./ArtistAlbums";

interface ArtistViewProps {
  artistInfo: Artist;
  artistTopTracks: {
    tracks: Track[]
  },
  artistAlbums: {
    items: Album[]
  }
}

const ArtistView = ({ artistInfo, artistTopTracks, artistAlbums }: ArtistViewProps) => {
  const [isPending, startTransition] = useTransition()
  const { artists, setSelectedCategory } = useLibrary()
  const isMobile = useIsMobile()

  const markedAsFav = artists?.some(favArtist => favArtist.id === artistInfo.id)
  const tracksList = isMobile ? artistTopTracks.tracks.slice(0, 4) : artistTopTracks.tracks

  const handleToggleFavorite = () => {
    startTransition(async () => {
      await toggleFavoriteArtist(artistInfo.id)
      setSelectedCategory(Category.Artists)
    })
  }

  return (
    <div className="flex flex-col gap-8 text-foreground">
      <div className="flex flex-col gap-4 items-center md:flex-row md:items-end">
        <Image
          src={artistInfo.images[0].url}
          alt={artistInfo.name}
          width={224}
          height={224}
          className="h-56 w-56 rounded-full object-cover shadow-lg"
        />
        <div className="flex flex-col gap-2 items-center lg:items-start">
          <div className="flex gap-4 items-center lg:flex-col lg:items-start">
            <Tooltip>
              <TooltipTrigger className="cursor-pointer w-8 h-8" onClick={handleToggleFavorite} disabled={isPending}>
                <div className={
                  cn(
                    "group w-8 h-8 bg-primary/30 rounded-full flex justify-center items-center hover:bg-primary hover:scale-110 transition-all",
                    markedAsFav && "bg-primary",
                    isPending && "bg-primary/50 animate-pulse"
                  )
                }>
                  {
                    markedAsFav ? <HeartOff size={20} /> : <Heart size={20} />
                  }
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {markedAsFav ? "Remove from library" : "Save to library"}
              </TooltipContent>
            </Tooltip>
            <h1 className="text-5xl lg:text-6xl font-bold">{artistInfo.name}</h1>
          </div>
          <p className="text-md text-muted-foreground">{artistInfo.followers.total.toLocaleString()} followers</p>
        </div>
      </div>
      <ArtistTopTracks tracksList={tracksList} />
      <ArtistAlbums artistAlbums={artistAlbums.items} />
    </div>
  );
}

export default ArtistView;
