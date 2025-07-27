'use server'

import { RECOMMENDED_ARTISTS_IDS, ROUTES } from "../consts"
import { spotifyFetch } from "../fetch"
import { Album, Artist } from "../types"

export async function getSpotifyAccessToken() {

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Spotify client ID and secret must be set in environment variables')
  }

  const authorization = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authorization}`
    },
    body: 'grant_type=client_credentials',
  })

  return response.json()
}

export async function getRecommendedArtists(): Promise<{
  artists: Artist[]
}> {
  const tracksIds = RECOMMENDED_ARTISTS_IDS
  const ARTISTS_ENDPOINT = ROUTES.spotify.artists.getArtists

  const response = await spotifyFetch({
    url: `${ARTISTS_ENDPOINT}?ids=${tracksIds.join(',')}`,
  })

  return response ?? []
}

export async function getNewReleases(): Promise<{
  albums: {
    href: string
    limit: number
    next: string | null
    offest: number
    previous: string | null
    total: number
    items: Album[]
  }
}> {
  const NEW_RELEASES_ENDPOINT = ROUTES.spotify.albums.getNewReleases

  const response = await spotifyFetch({
    url: `${NEW_RELEASES_ENDPOINT}?limit=4`,
  })

  return response ?? []
}
