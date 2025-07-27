"use client"
import { useSidebar } from '@/components/ui/sidebar'
import { useLibrary } from '@/lib/providers/LibraryProvider'
import { Category } from '@/lib/types'
import React from 'react'
import { LibraryItemCard } from './LibraryItemCard'

const CategoryList = () => {
  const { state } = useSidebar()
  const {
    selectedCategory,
    playlists,
    albums,
    artists,
    tracks
  } = useLibrary()

  const listToRender = {
    [Category.Playlists]: playlists,
    [Category.Albums]: albums,
    [Category.Artists]: artists,
    [Category.Tracks]: tracks,
  }[selectedCategory]

  if (state === "collapsed") return null

  if (!listToRender || listToRender.length === 0) {
    return (
      <div className="text-muted-foreground text-sm mt-2">
        No items found in {selectedCategory.toLowerCase()}.
      </div>
    )
  }

  return (
    <div className='mt-2'>
      {listToRender.map((item, index) => (
        <LibraryItemCard key={('id' in item ? item.id : index)} item={item} />
      ))}
    </div>
  )
}

export default CategoryList