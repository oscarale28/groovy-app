
import { Suspense } from "react";

import AlbumView from "./AlbumView";
import AlbumViewSkeleton from "./AlbumViewSkeleton";
import { getAlbumDetails } from "@/lib/actions/spotify";

type AlbumPageProps = {
  params: Promise<{ albumId: string }>;
};

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { albumId } = await params;
  const album = getAlbumDetails(albumId);

  return (
    <Suspense fallback={<AlbumViewSkeleton />}>
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
