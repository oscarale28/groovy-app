"use client"
import { signInAnonymously } from '@/lib/actions/auth'
import { cn } from '@/lib/utils'
import React from 'react'

const LoginButton = ({ showLabel, classname }: { showLabel: boolean, classname?: string }) => {
  return (
    <div className={
      cn(
        'flex flex-col text-center',
        classname
      )
    }>
      <button
        className='text-foreground cursor-pointer w-full bg-accent py-2 px-1 rounded-2xl transition-all duration-200 hover:bg-accent/80'
        onClick={async () => {
          await signInAnonymously()
        }}>
        Log in
      </button>
      {
        showLabel && (
          <span className='text-xs text-foreground/50'>Login to save your favorite tracks, artists and albums, or create your own playlists.</span>
        )
      }
    </div>
  )
}

export default LoginButton