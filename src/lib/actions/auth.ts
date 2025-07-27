'use server'

import { createClient } from "../supabase/server"

export async function signInAnonymously() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInAnonymously()

  console.log("Sign in anonymously:", data, error)

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function ensureAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If no user, create anonymous session
  if (!user) {
    const { data, error } = await supabase.auth.signInAnonymously()
    if (error) {
      throw new Error('Failed to create anonymous session')
    }
    return data.user
  }

  return user
}

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}