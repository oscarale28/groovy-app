import { Sparkles, TrendingUp, Clock } from "lucide-react"
import { RecommendedArtists } from "./RecommendedArtists"
import { Suspense } from "react"
import { getNewReleases, getSeveralSpotifyData } from "@/lib/actions/spotify"
import { TrendingAlbums } from "./TrendingAlbums"
import { RECOMMENDED_ARTISTS_IDS } from "@/lib/consts"
import { Artist } from "@/lib/types"


const quickAccess = [
  { name: "Mix Diario", icon: Sparkles, color: "from-purple-500 to-pink-500" },
  { name: "Tendencias", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
  { name: "Recientes", icon: Clock, color: "from-indigo-500 to-purple-500" },
]

export async function HomeContent() {
  const recommendedArtists = getSeveralSpotifyData<{
    artists: Artist[]
  }>(
    {
      dataType: "artists",
      itemsIds: RECOMMENDED_ARTISTS_IDS
    }
  )
  const newReleases = getNewReleases()
  return (
    <>
      <h1
        className="text-3xl md:text-5xl font-bold text-foreground"
      >
        Buenas noches
      </h1>

      <Suspense fallback={
        <h1>Cargando lanzamientos recientes...</h1>
      }>
        {
          newReleases.then(albums => (
            <TrendingAlbums albums={albums.albums.items} />
          ))
        }
      </Suspense>

      <Suspense fallback={
        <h1>Cargando artistas recomendados...</h1>
      }>
        {
          recommendedArtists.then(artists => (
            <RecommendedArtists artists={artists.artists} />
          ))
        }
      </Suspense>
    </>
  )
}
