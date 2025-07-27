import { motion } from "framer-motion"
import AppSidebar from "./sidebar/AppSidebar"
import AppHeader from "./AppHeader"
import { SidebarProvider } from "../ui/sidebar"
import { LibraryProvider } from "@/lib/providers/LibraryProvider"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {

  return (
    <SidebarProvider>
      <LibraryProvider>
        <div className="h-screen flex flex-1 flex-col relative overflow-hidden">
          {/* Animated background */}
          <div className="fixed inset-0 aurora opacity-30" />
          <div className="fixed inset-0 mesh-gradient" />

          <div className="flex flex-1 overflow-hidden relative z-10">
            <AppSidebar />

            <div className="flex-1 flex flex-col py-4 gap-6 overflow-auto">
              <AppHeader />

              <main className="overflow-auto px-4 flex flex-col gap-10">
                {children}
              </main>
            </div>
            <div className="sticky bottom-0 left-0 right-0 z-20">
              {/* <Player /> */}
            </div>
          </div>
        </div>
      </LibraryProvider>
    </SidebarProvider>
  )
}

export default MainLayout