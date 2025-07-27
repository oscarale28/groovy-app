import { Category } from "@/lib/types"
import CategoryChip from "./CategoryChip"
import { getCurrentUser } from "@/lib/actions/auth"
import LoginButton from "@/components/shared/LoginButton"
import { getUserFavorites } from "@/lib/actions/favorites"
import { Suspense } from "react"
import LibrarySidebarContent from "./LibrarySidebarContent"

const CATEGORIES: Category[] = [Category.Playlists, Category.Albums, Category.Artists, Category.Tracks]

const LibrarySidebar = async () => {

  const user = await getCurrentUser()
  const userFavorites = getUserFavorites()

  if (!user) {
    return (
      <LoginButton showLabel classname="py-4 gap-2" />
    )
  }

  return (
    <div className="flex flex-col gap-2 my-1 px-2">
      <div className="flex items-center gap-2 py-1 overflow-x-auto">
        {CATEGORIES.map((category: Category) => (
          <CategoryChip
            key={category}
            category={category}
          />
        ))}
      </div>
      <Suspense fallback={
        <>Loading user favorites...</>
      }>
        {
          userFavorites.then(favs =>
            <LibrarySidebarContent favs={favs} />
          ).catch(() => (
            <h1>
              Failed to retrieve user library.
            </h1>
          ))
        }
      </Suspense>
    </div>
  )
}

export default LibrarySidebar