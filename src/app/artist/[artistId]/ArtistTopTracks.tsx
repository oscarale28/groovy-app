import { Track } from '@/lib/types'
import { formatDuration } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const ArtistTopTracks = ({ tracksList }: { tracksList: Track[] }) => {
  return (
    <>
      <h1 className="text-3xl font-bold">Top Tracks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tracksList.map(track => (
          <div key={track.id} className="flex items-center bg-muted/50 hover:bg-muted rounded-lg py-3 px-4 gap-3 transition-colors duration-200">
            <Image
              src={track.album.images[0].url}
              alt={track.name}
              width={60}
              height={60}
              className="rounded-md"
            />
            <div className="flex-1">
              <h2 className="font-semibold">{track.name}</h2>
              <p className="text-sm text-muted-foreground line-clamp-1">{track.artists.map(artist => artist.name).join(", ")}</p>
            </div>
            <p className="text-sm text-muted-foreground">{formatDuration(track.duration_ms)}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default ArtistTopTracks