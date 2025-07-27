'use server'

import { createClient } from '../supabase/server'

type AuthenticatedAction<T extends any[], R> = (user: any, ...args: T) => Promise<R>

export async function withSupabaseAuth<T extends any[], R>(
  action: AuthenticatedAction<T, R>
) {
  return async (...args: T): Promise<R> => {
    const supabase = await createClient()

    // Intentar obtener usuario actual
    let { data: { user } } = await supabase.auth.getUser()

    // Si no hay usuario, crear sesión anónima
    if (!user) {
      const { data, error } = await supabase.auth.signInAnonymously()
      if (error) {
        throw new Error('Failed to authenticate: ' + error.message)
      }
      user = data.user
    }

    if (!user) {
      throw new Error('Authentication failed')
    }

    // Ejecutar la acción con el usuario autenticado
    return action(user, ...args)
  }
}