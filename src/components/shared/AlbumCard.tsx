import { Album } from '@/lib/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AlbumCard = ({ album, classname }: { album: Album, classname?: string }) => {
  return (
    <Link href={`/album/${album.id}`} key={album.id}>
      <div className={
        cn(
          "flex-1 bg-muted/50 p-3 rounded-lg group cursor-pointer transition-colors duration-200 hover:bg-muted flex flex-col",
          classname
        )
      }>
        <Image
          src={album.images[0].url}
          alt={album.name}
          width={100}
          height={100}
          className='aspect-square w-full rounded-lg mb-3'
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-sm text-primary/70 capitalize">{album.album_type}</p>
            <h4 className="font-semibold text-lg text-foreground truncate">{album.name}</h4>
          </div>
          <p className="text-md text-muted-foreground">{album.artists[0].name}</p>
        </div>
      </div>
    </Link>
  )
}

export default AlbumCard