'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function TrendingAlbumsSkeleton() {
  return (
    <section>
      <h2 className="text-3xl font-bold text-white mb-6">New Releases</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card/40 p-3 rounded-lg animate-pulse">
            <Skeleton className="w-full h-64 rounded-md mb-3" />
            <Skeleton className="h-4 w-3/4 mb-1" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </section>
  )
}
