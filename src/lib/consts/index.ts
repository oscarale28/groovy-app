
const RECOMMENDED_ARTISTS_IDS: string[] = [
  '4q3ewBCX7sLwd24euuV69X', // Bad Bunny 
  '2LRoIwlKmHjgvigdNGBHNo', // Feid
  '0k17h0D3J5VfsdmQ1iZtE9', // Pink Floyd
  '7okwEbXzyT2VffBmyQBWLz', // Maná
  '42LEQxfXLEuzdqorKBbUVN', // RaiNao
  '2YZyLoL8N0Wb9xBt1NhZWg', // Kendrick Lamar
  '0GM7qgcRCORpGnfcN2tCiB', // Tainy
  '4uqzzJg3ww5eH7IgGV7DMT' // Bunbury
]

const SPOTIFY_ROUTES = {
  base: "https://api.spotify.com/v1",
  getArtists: "/artists",
  getSingleArtist: "/artist/:id",
  getNewReleases: "/browse/new-releases",
  getAlbums: "/albums",
  getSingleAlbum: "/albums/:id",
  getTracks: "/tracks"
}

export {
  RECOMMENDED_ARTISTS_IDS,
  SPOTIFY_ROUTES
}