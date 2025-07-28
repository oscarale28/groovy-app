import Image from "next/image"
import { Artist } from "@/lib/types"
import Link from "next/link"

export function RecommendedArtists({ artists }: { artists: Artist[] }) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-white mb-6">Recommended Artists</h2>
      <div className="flex space-x-8 overflow-x-auto pb-4 scrollbar-hide">
        {artists?.map((artist) => (
          <Link key={artist.id} href={`/artist/${artist.id}`}>
            <div
              className="flex-shrink-0 w-40 text-center group cursor-pointer"
            >
              <Image
                src={artist.images[0]?.url}
                alt={artist.name}
                width={100}
                height={100}
                className="w-full h-40 object-cover rounded-full mb-3 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/30"
              />
              <h3 className="font-semibold text-white truncate">{artist.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}