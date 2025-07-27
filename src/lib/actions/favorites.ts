'use server'

import { createClient } from '../supabase/server'
import { revalidatePath } from 'next/cache'

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

export async function getUserFavorites() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  const [tracks, albums, artists] = await Promise.all([
    supabase
      .from('user_favorite_tracks')
      .select('spotify_track_id, added_at')
      .eq('user_id', user.id)
      .order('added_at', { ascending: false }),

    supabase
      .from('user_favorite_albums')
      .select('spotify_album_id, added_at')
      .eq('user_id', user.id)
      .order('added_at', { ascending: false }),

    supabase
      .from('user_favorite_artists')
      .select('spotify_artist_id, added_at')
      .eq('user_id', user.id)
      .order('added_at', { ascending: false })
  ])

  if (tracks.error) throw new Error('Failed to fetch favorite tracks')
  if (albums.error) throw new Error('Failed to fetch favorite albums')
  if (artists.error) throw new Error('Failed to fetch favorite artists')

  return {
    tracks: tracks.data || [],
    albums: albums.data || [],
    artists: artists.data || []
  }
}