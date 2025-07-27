import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { toggleFavoriteTrack } from '@/lib/actions/favorites'
import { Track } from '@/lib/types'
import { useLibrary } from '@/lib/providers/LibraryProvider'

const TrackDropdown = ({ track }: { track: Track }) => {

  const { tracks } = useLibrary()
  const inLibrary = tracks?.some(t => t.id === track.id)
  const action = inLibrary ? "Remove from" : "Add to"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="cursor-pointer p-2 rounded-md bg-transparent hover:bg-accent">
          <MoreHorizontal className="text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={async () => toggleFavoriteTrack(track.id)}>{action} library</DropdownMenuItem>
        <DropdownMenuItem>Add to playlist</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TrackDropdown