'use client'

import { Skeleton } from '@/components/ui/skeleton'

export default function AlbumViewSkeleton() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center gap-6">
        <Skeleton className="h-48 w-48 rounded-md" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-10 w-48" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
