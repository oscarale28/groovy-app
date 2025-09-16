import React from 'react'
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { getCurrentUser } from '@/lib/actions/auth';
import LoginButton from '../shared/LoginButton';

const AppHeader = async () => {

  const user = await getCurrentUser()

  return (
    <header className='px-4'>
      <div className='flex justify-between p-4 gap-8 rounded-xl bg-card'>
        <div className="flex items-center gap-3 flex-5">
          <SidebarTrigger />
          <Separator orientation='vertical' />
          <div className="flex-1 md:block">
            <form className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground" size={18} />
              <Input
                type="text"
                placeholder="What do you want to listen today?"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent! pl-10 text-foreground placeholder-foreground rounded-xl"
              />
            </form>
          </div>
        </div>

        {
          !user && (
            <LoginButton showLabel={false} classname='flex-1' />
          )
        }
      </div>

    </header>
  )
}

export default AppHeader