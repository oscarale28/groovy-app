import Image from "next/image";
import Link from "next/link";
import { Artist, Album, Track } from "@/lib/types";
import { Playlist } from "@/lib/providers/LibraryProvider";
import { Disc, ListMusic, LucideProps, Music2Icon, User } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface LibraryItemCardProps {
  item: Playlist | Artist | Album | Track;
}

const buildItemProps = (item: Playlist | Artist | Album | Track): {
  imageUrl?: string;
  Icon?: ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;
  title: string;
  subtitle?: string;
  link: string;
} => {
  if ("album_type" in item) {
    const album = item;
    return {
      imageUrl: album.images?.[0]?.url,
      Icon: Disc,
      title: album.name,
      subtitle: album.artists[0].name,
      link: `/album/${album.id}`,
    };
  }

  if ("followers" in item) {
    const artist = item;
    return {
      imageUrl: artist.images?.[0]?.url,
      Icon: User,
      title: artist.name,
      subtitle: "Artist",
      link: `/artist/${artist.id}`,
    };
  }

  if ("visibility_status" in item) {
    const playlist = item;
    return {
      Icon: ListMusic,
      title: playlist.name,
      subtitle: playlist.description ?? "",
      link: `/`,
    };
  }

  const track = item;
  if (track.album) {
    return {
      imageUrl: track.album.images?.[0]?.url,
      Icon: Music2Icon,
      title: track.name,
      subtitle: track.artists[0]?.name || "Unknown Artist",
      link: `/album/${track.album.id}`,
    };
  }

  return {
    Icon: Music2Icon,
    title: item.name,
    link: `/track/${item.id}`,
  };

}

export function LibraryItemCard({ item }: LibraryItemCardProps) {
  const { imageUrl, Icon, title, subtitle, link } = buildItemProps(item);

  return (
    <Link href={link} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted">
      {
        imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={48}
            height={48}
            className="h-12 w-12 rounded-md object-cover"
          />) : (
          Icon && <Icon />
        )
      }
      <div className="flex flex-col">
        <span className="font-semibold">{title}</span>
        <span className="text-sm text-muted-foreground/60">{subtitle}</span>
      </div>
    </Link>
  );
}