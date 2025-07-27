"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Album } from "@/lib/types"
import { formatDate } from '../../lib/utils';

export function TrendingAlbums({ albums }: { albums: Album[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.1 }}
    >
      <h2 className="text-3xl font-bold text-white mb-6">Últimos lanzamientos</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {albums.map((album, index) => (
          <motion.div
            key={album.id}
            className="bg-card/40 p-3 rounded-lg group cursor-pointer transition-colors hover:bg-card/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -5 }}
          >
            <Image
              src={album.images[0].url}
              alt={album.name}
              width={100}
              height={100}
              className="w-full h-auto rounded-md mb-3"
            />
            <p className="text-sm text-primary/70 capitalize">{album.album_type}</p>
            <h4 className="font-semibold text-lg text-foreground truncate">{album.name}</h4>
            <p className="text-md text-muted-foreground">{album.artists[0].name}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}