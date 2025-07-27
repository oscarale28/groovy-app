"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Music } from "lucide-react"

// TODO: Replace with real data from Spotify API
const mockTrendingSongs = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    duration: "2:47",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "3",
    title: "good 4 u",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    duration: "2:58",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "4",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: "3:23",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function TrendingSongs() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9 }}
    >
      <h2 className="text-3xl font-bold text-white mb-6">Tendencias</h2>
      <div className="space-y-3">
        {mockTrendingSongs.map((song, index) => (
          <motion.div
            key={song.id}
            className="flex items-center p-3 rounded-lg hover:bg-card/50 transition-colors duration-200 cursor-pointer group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <div className="flex items-center w-12 text-muted-foreground">
              <span className="text-lg font-bold group-hover:hidden">{index + 1}</span>
              <Play size={24} className="hidden group-hover:block text-purple-400" />
            </div>
            <Image
              src={song.image}
              alt={song.title}
              width={50}
              height={50}
              className="w-12 h-12 rounded-md mr-4"
            />
            <div className="flex-grow">
              <h4 className="font-semibold text-white">{song.title}</h4>
              <p className="text-sm text-muted-foreground">{song.artist}</p>
            </div>
            <p className="text-sm text-muted-foreground hidden md:block">{song.album}</p>
            <div className="w-20 text-right text-muted-foreground ml-4">
              {song.duration}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}