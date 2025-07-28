'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function RecommendedArtistsSkeleton() {
  return (
    <section>
      <h2 className="text-3xl font-bold text-white mb-6">Recommended Artists</h2>
      <div className="flex space-x-8 pb-4 w-full">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center justify-center flex-shrink-0 w-40">
            <Skeleton className="mb-3 h-32 w-32 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </section>
  )
}
