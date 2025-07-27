import Image from "next/image";
import Link from "next/link";
import { Artist, Album, Track } from "@/lib/types";
import { Playlist } from "@/lib/providers/LibraryProvider";

interface LibraryItemCardProps {
  item: Playlist | Artist | Album | Track;
}

export function LibraryItemCard({ item }: LibraryItemCardProps) {
  let imageUrl = "";
  let title = "";
  let subtitle = "";
  let link = "";

  if ("album_type" in item) { // It's an Album
    const album = item as Album;
    imageUrl = album.images?.[0]?.url || "";
    title = album.name;
    subtitle = album.artists[0].name;
    link = `/album/${album.id}`;
  } else if ("followers" in item) { // It's an Artist
    const artist = item as Artist;
    imageUrl = artist.images?.[0]?.url || "";
    title = artist.name;
    subtitle = "Artist";
    link = `/artist/${artist.id}`;
  } else { // It's a Track
    const track = item as Track;
    imageUrl = track.album.images?.[0]?.url || "";
    title = track.name;
    subtitle = track.artists[0].name;
    link = `/album/${track.album.id}`;
  }

  return (
    <Link href={link} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted">
      <Image
        src={imageUrl}
        alt={title}
        width={48}
        height={48}
        className="h-12 w-12 rounded-md object-cover"
      />
      <div className="flex flex-col">
        <span className="font-semibold">{title}</span>
        <span className="text-sm text-muted-foreground">{subtitle}</span>
      </div>
    </Link>
  );
}