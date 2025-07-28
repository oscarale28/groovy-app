import AlbumCard from '@/components/shared/AlbumCard'
import { Album } from '@/lib/types'
import React from 'react'

const ArtistAlbums = ({ artistAlbums }: { artistAlbums: Album[] }) => {
  return (
    <>
      <h1 className="text-3xl font-bold">Albums</h1>
      <div className="flex gap-6 overflow-x-auto">
        {artistAlbums.map(album => (
          <AlbumCard key={album.id} album={album} classname="w-60" />
        ))}
      </div>
    </>
  )
}

export default ArtistAlbums