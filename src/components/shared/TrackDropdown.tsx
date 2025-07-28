'use client'

import React, { useState, useTransition } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { LoaderIcon, MoreHorizontal } from 'lucide-react'
import { toggleFavoriteTrack } from '@/lib/actions/favorites'
import { Category, Track } from '@/lib/types'
import { useLibrary } from '@/lib/providers/LibraryProvider'
import { cn } from '@/lib/utils'
import { AddToPlaylistModal } from './AddToPlaylistModal'

const TrackDropdown = ({ track }: { track: Track }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { tracks, setSelectedCategory } = useLibrary()
  const inLibrary = tracks?.some(t => t.id === track.id)
  const action = inLibrary ? "Remove from" : "Add to"

  const handleToggleFavorite = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    startTransition(async () => {
      await toggleFavoriteTrack(track.id)
      setSelectedCategory(Category.Tracks)
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className={
            cn(
              "cursor-pointer p-2 rounded-md bg-transparent hover:bg-accent",
              isPending && "bg-accent/50 animate-pulse"
            )
          }>
            {
              isPending ? <LoaderIcon className='animate-spin' /> :
                <MoreHorizontal className="text-muted-foreground" />
            }
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={handleToggleFavorite}>{action} library</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsModalOpen(true)}>Add to playlist</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AddToPlaylistModal
        track={track}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default TrackDropdown
