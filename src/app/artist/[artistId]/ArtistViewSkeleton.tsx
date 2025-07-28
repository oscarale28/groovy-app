'use client'

import { Skeleton } from '@/components/ui/skeleton'

export default function ArtistViewSkeleton() {
  return (
    <div className="flex flex-col gap-8 text-foreground">
      <div className="flex items-center gap-6">
        <Skeleton className="h-48 w-48 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-10 w-48" />
        </div>
      </div>
      <Skeleton className="h-8 w-32" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center bg-muted/50 rounded-lg py-3 px-4 gap-3">
            <Skeleton className="h-15 w-15 rounded-md" />
            <div className="flex-1">
              <Skeleton className="h-6 mb-2 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>

      <Skeleton className="h-8 w-24" />
      <div className="flex gap-6 overflow-x-auto">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col gap-6 w-60 bg-card/40 p-3 rounded-lg animate-pulse">
            <Skeleton className="h-60 w-60 rounded-md" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div >
  )
}