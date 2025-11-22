'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import Navbar from '@/components/Navbar'

interface Blog {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  author: {
    id: string
    name: string
    email: string
  }
}

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const user = useAuthStore((state) => state.user)

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${params.id}`)
      const data = await response.json()

      if (response.ok) {
        setBlog(data.blog)
        setTitle(data.blog.title)
        setContent(data.blog.content)
      } else {
        setError(data.error || 'Blog not found')
      }
    } catch (error) {
      console.error('Failed to fetch blog:', error)
      setError('Failed to load blog')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchBlog()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })

      const data = await response.json()

      if (response.ok) {
        setBlog(data.blog)
        setIsEditing(false)
      } else {
        setError(data.error || 'Failed to update blog')
      }
    } catch (error) {
      console.error('Update error:', error)
      setError('Failed to update blog')
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return
    }

    try {
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/blogs')
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to delete blog')
      }
    } catch (error) {
      console.error('Delete error:', error)
      setError('Failed to delete blog')
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl">Loading blog...</p>
        </div>
      </>
    )
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <p className="text-xl text-red-600 mb-4">{error || 'Blog not found'}</p>
          <Link
            href="/blogs"
            className="text-blue-600 hover:underline"
          >
            ← Back to all blogs
          </Link>
        </div>
      </>
    )
  }

  const isAuthor = user?.id === blog.author.id

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blogs"
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            ← Back to all blogs
          </Link>

          {isEditing ? (
            <form onSubmit={handleUpdate} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Edit Blog
              </h1>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false)
                    setTitle(blog.title)
                    setContent(blog.content)
                    setError('')
                  }}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {blog.title}
              </h1>

              <div className="flex items-center justify-between mb-6 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <p>By <span className="font-semibold">{blog.author.name}</span></p>
                  <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                </div>

                {isAuthor && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {blog.content}
                </p>
              </div>

              {blog.updatedAt !== blog.createdAt && (
                <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {new Date(blog.updatedAt).toLocaleDateString()}
                </p>
              )}
            </article>
          )}
        </div>
      </div>
    </>
  )
}
