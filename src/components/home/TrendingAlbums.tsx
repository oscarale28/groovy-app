import Image from "next/image"
import Link from "next/link"
import { Album } from "@/lib/types"

export function TrendingAlbums({ albums }: { albums: Album[] }) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-white mb-6">New Releases</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {albums.map((album) => (
          <Link href={`/album/${album.id}`} key={album.id}>
            <div className="bg-card/40 p-3 rounded-lg group cursor-pointer transition-colors hover:bg-card/60">
              <Image
                src={album.images[0].url}
                alt={album.name}
                width={100}
                height={100}
                className="w-full h-auto rounded-md mb-3"
              />
              <p className="text-sm text-primary/70 capitalize">{album.album_type}</p>
              <h4 className="font-semibold text-lg text-foreground truncate">{album.name}</h4>
              <p className="text-md text-muted-foreground">{album.artists[0].name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
