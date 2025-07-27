"use client"
import { useSidebar } from '@/components/ui/sidebar'
import { useLibrary } from '@/lib/providers/LibraryProvider'
import { Category } from '@/lib/types'
import React from 'react'

const CategoryChip = ({ category }: { category: Category }) => {

  const { selectedCategory, setSelectedCategory } = useLibrary()
  const { state } = useSidebar()

  if (state === "collapsed") return null

  return (
    <button
      key={category}
      className={`flex items-center justify-center px-2 py-1 text-xs font-medium text-foreground bg-primary/30 rounded-xl cursor-pointer hover:bg-primary/50 transition-all duration-200 ${selectedCategory === category ? 'bg-primary/80' : ''}`}
      onClick={() => {
        console.log('clicked category:', category)
        setSelectedCategory(category)
      }}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </button>
  )
}

export default CategoryChip