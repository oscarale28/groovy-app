import MainLayout from "@/components/layouts/MainLayout"
import { HomeContent } from "../components/home/HomeContent"

async function HomePage() {
  // TODO: Check if user is authenticated via Supabase
  // const cookieStore = await cookies()
  // const token = cookieStore.get('supabase-auth-token')
  // if (!token) redirect('/login')

  return (
    <MainLayout>
      <HomeContent />
    </MainLayout>
  )
}

export default HomePage