import { Suspense } from "react";
import ArtistView from "./ArtistView";
import ArtistViewSkeleton from "./ArtistViewSkeleton";
import { getArtistDetails } from "@/lib/actions/spotify";

type ArtistPageProps = {
  params: Promise<{ artistId: string }>;
};

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { artistId } = await params;
  const artistCompleteData = getArtistDetails(artistId);

  return (
    <Suspense fallback={<ArtistViewSkeleton />}>
      {
        artistCompleteData ? artistCompleteData.then(data => (
          <ArtistView
            artistInfo={data.artistInfo}
            artistTopTracks={data.artistTopTracks}
            artistAlbums={data.artistAlbums}
          />
        )) : (
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">Artist not found</p>
          </div>
        )
      }
    </Suspense>
  );
}