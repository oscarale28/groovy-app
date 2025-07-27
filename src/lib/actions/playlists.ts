'use server'

import { createClient } from '../supabase/server'
import { revalidatePath } from 'next/cache'

export async function getUserPlaylists() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  const { data, error } = await supabase
    .from('playlists')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error('Failed to fetch playlists')
  }

  return data || []
}

export async function createPlaylist(formData: FormData) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const visibility = formData.get('visibility') as 'public' | 'private' | 'unlisted'

  if (!name) {
    throw new Error('Playlist name is required')
  }

  const { data, error } = await supabase
    .from('playlists')
    .insert({
      user_id: user.id,
      name,
      description: description || null,
      visibility_status: visibility || 'private'
    })
    .select()
    .single()

  if (error) {
    throw new Error('Failed to create playlist')
  }

  revalidatePath('/playlists')
  revalidatePath('/library')
  return data
}

export async function addTrackToPlaylist(playlistId: string, trackId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  // Verify playlist ownership
  const { data: playlist, error: playlistError } = await supabase
    .from('playlists')
    .select('id')
    .eq('id', playlistId)
    .eq('user_id', user.id)
    .single()

  if (playlistError || !playlist) {
    throw new Error('Playlist not found or unauthorized')
  }

  // Check if track already exists in playlist
  const { data: existingTrack } = await supabase
    .from('playlist_tracks')
    .select('id')
    .eq('playlist_id', playlistId)
    .eq('spotify_track_id', trackId)
    .single()

  if (existingTrack) {
    throw new Error('Track already exists in playlist')
  }

  // Get current max position
  const { data: tracks } = await supabase
    .from('playlist_tracks')
    .select('position')
    .eq('playlist_id', playlistId)
    .order('position', { ascending: false })
    .limit(1)

  const nextPosition = (tracks?.[0]?.position ?? 0) + 1

  const { data, error } = await supabase
    .from('playlist_tracks')
    .insert({
      playlist_id: playlistId,
      spotify_track_id: trackId,
      position: nextPosition
    })
    .select()
    .single()

  if (error) {
    throw new Error('Failed to add track to playlist')
  }

  revalidatePath(`/playlists/${playlistId}`)
  revalidatePath('/library')
  return data
}

export async function removeTrackFromPlaylist(playlistId: string, trackId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  // Verify playlist ownership
  const { data: playlist, error: playlistError } = await supabase
    .from('playlists')
    .select('id')
    .eq('id', playlistId)
    .eq('user_id', user.id)
    .single()

  if (playlistError || !playlist) {
    throw new Error('Playlist not found or unauthorized')
  }

  const { error } = await supabase
    .from('playlist_tracks')
    .delete()
    .eq('playlist_id', playlistId)
    .eq('spotify_track_id', trackId)

  if (error) {
    throw new Error('Failed to remove track from playlist')
  }

  revalidatePath(`/playlists/${playlistId}`)
  revalidatePath('/library')
  return { success: true }
}

export async function deletePlaylist(playlistId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  // Verify playlist ownership
  const { data: playlist, error: playlistError } = await supabase
    .from('playlists')
    .select('id')
    .eq('id', playlistId)
    .eq('user_id', user.id)
    .single()

  if (playlistError || !playlist) {
    throw new Error('Playlist not found or unauthorized')
  }

  const { error } = await supabase
    .from('playlists')
    .delete()
    .eq('id', playlistId)

  if (error) {
    throw new Error('Failed to delete playlist')
  }

  revalidatePath('/playlists')
  revalidatePath('/library')
  return { success: true }
}