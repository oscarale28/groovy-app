"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Play } from "lucide-react"

// TODO: Replace with real data type from Spotify API
type Playlist = {
  id: string
  name: string
  image: string
  description: string
}

interface PlaylistCardProps {
  playlist: Playlist
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <div className="bg-card/40 p-4 rounded-2xl group relative cursor-pointer transition-colors duration-300 hover:bg-card/60">
      <div className="relative mb-4">
        <Image
          src={playlist.image}
          alt={playlist.name}
          width={300}
          height={300}
          className="w-full h-auto rounded-lg"
        />
        <motion.div
          className="absolute bottom-2 right-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 0,
            y: 10,
          }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button className="p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-110">
            <Play size={24} />
          </button>
        </motion.div>
      </div>
      <div>
        <h3 className="font-bold text-lg text-white truncate">{playlist.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {playlist.description}
        </p>
      </div>
    </div>
  )
}