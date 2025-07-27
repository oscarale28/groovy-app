
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { getAlbumDetails } from "@/lib/actions/spotify";
import AlbumView from "./AlbumView";

type AlbumPageProps = {
  params: Promise<{ albumId: string }>;
};

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { albumId } = await params;
  const album = getAlbumDetails(albumId);

  return (
    <Suspense fallback={<Skeleton className="h-96 w-full" />}>
      {
        album ? album.then(data => <AlbumView album={data} />) : (
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">Album not found</p>
          </div>
        )
      }
    </Suspense>
  );
}
