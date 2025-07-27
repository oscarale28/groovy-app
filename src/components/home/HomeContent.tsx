import { Sparkles, TrendingUp, Clock } from "lucide-react"
import { RecommendedArtists } from "./RecommendedArtists"
import { Suspense } from "react"
import { getNewReleases, getRecommendedArtists } from "@/lib/actions/spotify"
import { TrendingAlbums } from "./TrendingAlbums"


const quickAccess = [
  { name: "Mix Diario", icon: Sparkles, color: "from-purple-500 to-pink-500" },
  { name: "Tendencias", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
  { name: "Recientes", icon: Clock, color: "from-indigo-500 to-purple-500" },
]

export async function HomeContent() {
  const recommendedArtists = getRecommendedArtists()
  const newReleases = getNewReleases()
  return (
    <>
      <h1
        className="text-3xl md:text-5xl font-bold text-foreground"
      >
        Buenas noches
      </h1>

      {/* Quick Access */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Acceso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickAccess.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.name}
                className={`floating-card p-2 rounded-2xl cursor-pointer group relative overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                />
                <div className="relative z-10 flex items-center gap-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className="text-white font-semibold">{item.name}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>


      <Suspense fallback={
        <h1>Cargando lanzamientos recientes...</h1>
      }>
        {
          newReleases.then(albums => {
            console.log("New releases fetched:", albums)
            return <TrendingAlbums albums={albums.albums.items} />
          })
        }
      </Suspense>

      <Suspense fallback={
        <h1>Cargando artistas recomendados...</h1>
      }>
        {
          recommendedArtists.then(artists => {
            console.log("Recommended artists fetched:", artists)
            return <RecommendedArtists artists={artists.artists} />
          })
        }
      </Suspense>

      {/* <TrendingSongs /> */}

    </>
  )
}
