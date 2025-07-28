import { Album } from "@/lib/types"
import AlbumCard from "../shared/AlbumCard"

export function TrendingAlbums({ albums }: { albums: Album[] }) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-white mb-6">New Releases</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </section>
  )
}
