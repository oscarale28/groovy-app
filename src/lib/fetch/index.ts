import { cookies } from "next/headers"
import { SPOTIFY_ROUTES } from "../consts"
import { getSpotifyAccessToken } from "../actions/spotify"

type SpotifyFetchParams = {
  url: string
  options?: RequestInit
}

export async function spotifyFetch({
  url,
  options = {}
}: SpotifyFetchParams): Promise<any> {
  const cookiesStore = await cookies()
  let accessToken = cookiesStore.get('spotify_access_token')?.value

  if (!accessToken) {
    const tokenData = await getSpotifyAccessToken()
    accessToken = tokenData.access_token
  }

  const BASE_URL = SPOTIFY_ROUTES.base

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      'Authorization': `Bearer ${accessToken}`
    },
    next: { revalidate: 3600 } // Cache for 1 hour
  })

  if (!response.ok) {
    console.log(response.url)
    throw new Error(`Spotify API request failed with status ${response.status}`)
  }

  return response.json()
}