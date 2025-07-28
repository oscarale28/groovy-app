'use client'

import { useState, useTransition } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { addTrackToPlaylist, getUserPlaylists } from '@/lib/actions/playlists'
import { Track } from '@/lib/types'
import { toast } from 'sonner'
import { useLibrary } from '@/lib/providers/LibraryProvider'
import { NewPlaylistForm } from './NewPlaylistForm'
import { PlusCircle, ListMusic } from 'lucide-react'

interface Playlist {
  id: string;
  name: string;
}

interface AddToPlaylistModalProps {
  track: Track
  isOpen: boolean
  onClose: () => void
}

export function AddToPlaylistModal({ track, isOpen, onClose }: AddToPlaylistModalProps) {
  const { playlists } = useLibrary()
  const [modalContent, setModalContent] = useState<("playlists" | "newPlaylistForm")>("playlists")
  const [isPending, startTransition] = useTransition()

  const handleAddTrackToPlaylist = (playlistId: string, playlistName: string) => {
    startTransition(async () => {
      try {
        await addTrackToPlaylist(playlistId, track.id)
        toast.success(`"${track.name}" has been added to "${playlistName}"`)
        onClose()
      } catch (error) {
        toast.error((error as Error).message)
      }
    })
  }

  const handleFormSuccess = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      setModalContent("playlists")
      onClose()
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-3xl font-bold text-foreground'>
            {modalContent === "playlists" ? "Add to playlist" : "Create New Playlist"}
          </DialogTitle>
          <DialogDescription className='text-md'>
            {modalContent === "playlists"
              ? `Create a new playlist or select an existing one to add "${track.name}".`
              : `Create a new playlist to add "${track.name}".`}
          </DialogDescription>
        </DialogHeader>

        {modalContent === "playlists" ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {playlists.length === 0 && (
                <p className="text-sm text-muted-foreground">No playlists found.</p>
              )}

              {playlists.map((playlist) => (
                <Button
                  className='bg-primary/5 flex justify-start text-md text-accent-foreground hover:bg-accent hover:text-accent-foreground'
                  key={playlist.id}
                  onClick={() => handleAddTrackToPlaylist(playlist.id, playlist.name)}
                  disabled={isPending}
                >
                  <ListMusic className="h-4 w-4 mr-2" />
                  {playlist.name}
                </Button>
              ))}
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setModalContent("newPlaylistForm")}>
                <PlusCircle className="h-4 w-4" /> Create New Playlist
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <NewPlaylistForm trackId={track.id} onSuccess={handleFormSuccess} />
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setModalContent("playlists")}>
                <ListMusic className="h-4 w-4" /> Back to Playlists
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}