'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

interface FAQ {
  id: number
  category: string
  question: string
  answer: string
}

interface KnowledgeBase {
  title: string
  lastUpdated: string
  categories: string[]
  totalFAQs: number
  faqs: FAQ[]
}

export default function KnowledgeBasePage() {
  const [kb, setKb] = useState<KnowledgeBase | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchKnowledgeBase()
  }, [])

  const fetchKnowledgeBase = async () => {
    try {
      const response = await fetch('/api/ai/query')
      const data = await response.json()
      setKb(data)
    } catch (error) {
      console.error('Failed to fetch knowledge base:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredFAQs = kb?.faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  }) || []

  const groupedFAQs = filteredFAQs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = []
    }
    acc[faq.category].push(faq)
    return acc
  }, {} as Record<string, FAQ[]>)

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl">Loading knowledge base...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              📚 Knowledge Base
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Find answers to common questions about the Mini Blogging Platform
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Last updated: {kb?.lastUpdated}
            </p>
          </div>

          {/* AI Agent Link */}
          <div className="mb-8 bg-blue-50 dark:bg-blue-900 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  🤖 Need Personalized Help?
                </h2>
                <p className="text-blue-700 dark:text-blue-200">
                  Chat with our AI support agent for instant, customized assistance
                </p>
              </div>
              <Link
                href="/support"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Chat Now
              </Link>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for questions..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Filter by Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="All">All Categories ({kb?.totalFAQs})</option>
                  {kb?.categories.map(category => (
                    <option key={category} value={category}>
                      {category} ({kb.faqs.filter(f => f.category === category).length})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* FAQs */}
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No FAQs found matching your search.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedFAQs).map(([category, faqs]) => (
                <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {category}
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <details
                        key={faq.id}
                        className="group border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                      >
                        <summary className="cursor-pointer list-none flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                            {faq.question}
                          </h3>
                          <span className="text-gray-400 group-open:rotate-180 transition-transform">
                            ▼
                          </span>
                        </summary>
                        <p className="mt-3 text-gray-600 dark:text-gray-300 pl-0">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer CTA */}
          <div className="mt-8 text-center bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Still have questions?
            </p>
            <Link
              href="/support"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Chat with AI Support Agent
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
