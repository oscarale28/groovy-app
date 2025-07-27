'use server'

import { SPOTIFY_ROUTES } from "../consts"
import { spotifyFetch } from "../fetch"
import { Album } from "../types"

async function getSpotifyAccessToken() {

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

type GetSeveralSpotifyDataProps = {
  dataType: "artists" | "albums" | "tracks"
  itemsIds: string[]
}

async function getSeveralSpotifyData<T>(props: GetSeveralSpotifyDataProps): Promise<T> {

  const { itemsIds, dataType } = props

  if (!itemsIds || itemsIds.length === 0) {
    return [] as T
  }

  const queryIds = itemsIds
  const ENDPOINT = {
    ["artists"]: SPOTIFY_ROUTES.getArtists,
    ["albums"]: SPOTIFY_ROUTES.getAlbums,
    ["tracks"]: SPOTIFY_ROUTES.getTracks
  }[dataType]

  const response = await spotifyFetch({
    url: `${ENDPOINT}?ids=${queryIds.join(',')}`,
  })

  return response ?? []
}

async function getNewReleases(): Promise<{
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
  const NEW_RELEASES_ENDPOINT = SPOTIFY_ROUTES.getNewReleases

  const response = await spotifyFetch({
    url: `${NEW_RELEASES_ENDPOINT}?limit=4`,
  })

  return response ?? []
}

async function getAlbumDetails(albumId: string): Promise<Album> {
  const ALBUM_ENDPOINT = SPOTIFY_ROUTES.getSingleAlbum.replace(':id', albumId)

  const response = await spotifyFetch({
    url: ALBUM_ENDPOINT,
  })

  return response
}

export {
  getSpotifyAccessToken,
  getSeveralSpotifyData,
  getNewReleases,
  getAlbumDetails
}