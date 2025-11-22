'use client'

import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    logout()
    router.push('/')
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            MiniBlog
          </Link>
          
          <div className="flex gap-4 items-center">
            <Link
              href="/blogs"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
            >
              Blogs
            </Link>
            
            <Link
              href="/support"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
            >
              🤖 Support
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  href="/blogs/create"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
                >
                  Create Blog
                </Link>
                <span className="text-gray-700 dark:text-gray-300">
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
