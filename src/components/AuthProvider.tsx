'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const setUser = useAuthStore((state) => state.setUser)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
          cache: 'no-store',
        })
        const data = await response.json()
        
        if (data.user) {
          setUser(data.user)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsChecking(false)
      }
    }

    checkAuth()
  }, [setUser])

  // Prevent flash of unauthenticated content
  if (isChecking) {
    return null
  }

  return <>{children}</>
}
