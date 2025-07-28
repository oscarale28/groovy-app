import { RecommendedArtists } from "./RecommendedArtists"
import { Suspense } from "react"
import { getNewReleases, getSeveralSpotifyData } from "@/lib/actions/spotify"
import { TrendingAlbums } from "./TrendingAlbums"
import { RECOMMENDED_ARTISTS_IDS } from "@/lib/consts"
import { Artist } from "@/lib/types"
import { TrendingAlbumsSkeleton } from "./TrendingAlbumsSkeleton"
import { RecommendedArtistsSkeleton } from "./RecommendedArtistsSkeleton"

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

  let greeting = ""
  const hour = new Date(new Date().toLocaleString("en-US", { timeZone: "America/El_Salvador" })).getHours();
  if (hour >= 18 && hour < 24) {
    greeting = "Good evening"
  } else {
    greeting = "Good morning"
  }

  return (
    <>
      <h1
        className="text-3xl md:text-5xl font-bold text-foreground"
      >
        {greeting}
      </h1>

      <Suspense fallback={<TrendingAlbumsSkeleton />}>
        {
          newReleases.then(albums => (
            <TrendingAlbums albums={albums.albums.items} />
          ))
        }
      </Suspense>

      <Suspense fallback={<RecommendedArtistsSkeleton />}>
        {
          recommendedArtists.then(artists => (
            <RecommendedArtists artists={artists.artists} />
          ))
        }
      </Suspense>
    </>
  )
}
