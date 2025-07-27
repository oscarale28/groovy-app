import { Category } from "@/lib/types"
import CategoryChip from "./CategoryChip"
import CategoryList from "./CategoryList"
import { getCurrentUser } from "@/lib/actions/auth"
import LoginButton from "@/components/shared/LoginButton"

const CATEGORIES: Category[] = [Category.Playlists, Category.Albums, Category.Artists, Category.Tracks]

const LibrarySidebar = async () => {

  const user = await getCurrentUser()

  if (!user) {
    return (
      <LoginButton showLabel classname="py-4 gap-2" />
    )
  }
  return (
    <div className="flex flex-col gap-2 my-1">
      <div className="flex items-center gap-2 px-2 py-1 overflow-x-auto">
        {CATEGORIES.map((category: Category) => (
          <CategoryChip
            key={category}
            category={category}
          />
        ))}
      </div>
      <CategoryList />
    </div>
  )
}

export default LibrarySidebar