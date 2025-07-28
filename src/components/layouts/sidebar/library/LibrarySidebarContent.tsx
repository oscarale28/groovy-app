"use client"
import { Playlist, useLibrary } from '@/lib/providers/LibraryProvider'
import { Album, Artist, Track } from '@/lib/types'
import React, { useEffect } from 'react'
import CategoryList from './CategoryList'

const LibrarySidebarContent = ({ favs, playlists }: {
  favs: {
    tracks: { tracks: Track[] },
    albums: { albums: Album[] },
    artists: { artists: Artist[] }
  },
  playlists: Playlist[]
}) => {

  const { setAlbums, setArtists, setTracks, setPlaylists } = useLibrary()

  useEffect(() => {
    const {
      tracks: favTracks,
      albums: favAlbums,
      artists: favArtists
    } = favs
    setAlbums(favAlbums.albums)
    setTracks(favTracks.tracks)
    setArtists(favArtists.artists)
    setPlaylists(playlists)
  }, [favs])

  return (
    <CategoryList />
  )
}

export default LibrarySidebarContent