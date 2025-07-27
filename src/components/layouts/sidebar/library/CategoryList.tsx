"use client"
import { useSidebar } from '@/components/ui/sidebar'
import { useLibrary } from '@/lib/providers/LibraryProvider'
import { Category } from '@/lib/types'
import React from 'react'

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
      <div className="text-muted-foreground text-sm p-2">
        No items found in {selectedCategory.toLowerCase()}.
      </div>
    )
  }

  const getItemName = (item: any) => {
    if ('name' in item) return item.name
    if ('title' in item) return item.title
    return 'Unknown'
  }

  return (
    <div>
      {listToRender.map((item, index) => (
        <div key={('id' in item ? item.id : index)}>{getItemName(item)}</div>
      ))}
    </div>
  )
}

export default CategoryList