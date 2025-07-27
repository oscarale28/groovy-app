"use client"
import { useLibrary } from '@/lib/providers/LibraryProvider'
import { Album, Artist, Track } from '@/lib/types'
import React, { useEffect } from 'react'
import CategoryList from './CategoryList'

const LibrarySidebarContent = ({ favs }: {
  favs: {
    tracks: { tracks: Track[] },
    albums: { albums: Album[] },
    artists: { artists: Artist[] }
  }
}) => {

  const { setAlbums, setArtists, setTracks } = useLibrary()

  useEffect(() => {
    const {
      tracks: favTracks,
      albums: favAlbums,
      artists: favArtists
    } = favs
    setAlbums(favAlbums.albums)
    setTracks(favTracks.tracks)
    setArtists(favArtists.artists)
  }, [favs])

  return (
    <CategoryList />
  )
}

export default LibrarySidebarContent