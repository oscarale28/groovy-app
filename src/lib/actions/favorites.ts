'use server'

import { createClient } from '../supabase/server'
import { revalidatePath } from 'next/cache'
import { getSeveralSpotifyData } from './spotify'
import { Album, Artist, Track } from '../types'

export async function toggleFavoriteTrack(trackId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  // Check if already favorited
  const { data: existing } = await supabase
    .from('user_favorite_tracks')
    .select('id')
    .eq('user_id', user.id)
    .eq('spotify_track_id', trackId)
    .single()

  if (existing) {
    // Remove favorite
    const { error } = await supabase
      .from('user_favorite_tracks')
      .delete()
      .eq('id', existing.id)

    if (error) throw new Error('Failed to remove favorite')
    revalidatePath('/library')
    return { favorited: false }
  } else {
    // Add favorite
    const { error } = await supabase
      .from('user_favorite_tracks')
      .insert({
        user_id: user.id,
        spotify_track_id: trackId
      })

    if (error) throw new Error('Failed to add favorite')
    revalidatePath('/library')
    return { favorited: true }
  }
}

export async function toggleFavoriteAlbum(albumId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  // Check if already favorited
  const { data: existing } = await supabase
    .from('user_favorite_albums')
    .select('id')
    .eq('user_id', user.id)
    .eq('spotify_album_id', albumId)
    .single()

  if (existing) {
    // Remove favorite
    const { error } = await supabase
      .from('user_favorite_albums')
      .delete()
      .eq('id', existing.id)

    if (error) throw new Error('Failed to remove favorite album')
    revalidatePath('/library')
    return { favorited: false }
  } else {
    // Add favorite
    const { error } = await supabase
      .from('user_favorite_albums')
      .insert({
        user_id: user.id,
        spotify_album_id: albumId
      })

    if (error) throw new Error('Failed to add favorite album')
    revalidatePath('/library')
    return { favorited: true }
  }
}

export async function toggleFavoriteArtist(artistId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  // Check if already favorited
  const { data: existing } = await supabase
    .from('user_favorite_artists')
    .select('id')
    .eq('user_id', user.id)
    .eq('spotify_artist_id', artistId)
    .single()

  if (existing) {
    // Remove favorite
    const { error } = await supabase
      .from('user_favorite_artists')
      .delete()
      .eq('id', existing.id)

    if (error) throw new Error('Failed to remove favorite artist')
    revalidatePath('/library')
    return { favorited: false }
  } else {
    // Add favorite
    const { error } = await supabase
      .from('user_favorite_artists')
      .insert({
        user_id: user.id,
        spotify_artist_id: artistId
      })

    if (error) throw new Error('Failed to add favorite artist')
    revalidatePath('/library')
    return { favorited: true }
  }
}

export async function getUserFavorites(): Promise<{
  tracks: { tracks: Track[] },
  albums: { albums: Album[] },
  artists: { artists: Artist[] }
}> {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  const { data: savedTracksData, error: savedTracksError } = await supabase
    .from('user_favorite_tracks')
    .select('spotify_track_id')
    .eq('user_id', user.id)
    .order('added_at', { ascending: false })

  const { data: savedAlbumsData, error: savedAlbumsError } = await supabase
    .from('user_favorite_albums')
    .select('spotify_album_id')
    .eq('user_id', user.id)
    .order('added_at', { ascending: false })

  const { data: savedArtistsData, error: savedArtistsError } = await supabase
    .from('user_favorite_artists')
    .select('spotify_artist_id')
    .eq('user_id', user.id)
    .order('added_at', { ascending: false })


  if (savedAlbumsError || savedTracksError || savedArtistsError) {
    throw new Error(
      "Failed to fetch saved data"
    )
  }

  const [tracksData, albumsData, artistsData] = await Promise.all([
    getSeveralSpotifyData<{
      tracks: Track[]
    }>(
      {
        dataType: "tracks",
        itemsIds: savedTracksData.map(track => track.spotify_track_id)
      }
    ),
    getSeveralSpotifyData<{
      albums: Album[]
    }>(
      {
        dataType: "albums",
        itemsIds: savedAlbumsData.map(album => album.spotify_album_id)
      }
    ),
    getSeveralSpotifyData<
      { artists: Artist[] }
    >({
      dataType: "artists",
      itemsIds: savedArtistsData.map(artist => artist.spotify_artist_id)
    })
  ])

  return {
    tracks: tracksData || [],
    albums: albumsData || [],
    artists: artistsData || []
  }
}
