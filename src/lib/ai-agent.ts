/**
 * AI Agent Example for Mini Blogging Platform
 * 
 * This file demonstrates how to integrate AI agents with the platform.
 * You can use this as a starting point for implementing AI features.
 */

import OpenAI from 'openai'

// Initialize OpenAI client (requires OPENAI_API_KEY in .env)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Generate blog content using AI
 */
export async function generateBlogContent(topic: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant that writes engaging blog posts.',
      },
      {
        role: 'user',
        content: `Write a blog post about: ${topic}`,
      },
    ],
  })

  return completion.choices[0].message.content || ''
}

/**
 * Improve existing blog content
 */
export async function improveBlogContent(content: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are an editor that improves blog posts while maintaining the original message.',
      },
      {
        role: 'user',
        content: `Please improve this blog post:\n\n${content}`,
      },
    ],
  })

  return completion.choices[0].message.content || ''
}

/**
 * Generate blog title from content
 */
export async function generateTitle(content: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a creative writer who generates catchy blog titles.',
      },
      {
        role: 'user',
        content: `Generate a catchy title for this blog post:\n\n${content}`,
      },
    ],
  })

  return completion.choices[0].message.content || ''
}

/**
 * Moderate blog content for inappropriate material
 */
export async function moderateContent(content: string): Promise<{
  flagged: boolean
  categories: string[]
}> {
  const moderation = await openai.moderations.create({
    input: content,
  })

  const result = moderation.results[0]
  
  return {
    flagged: result.flagged,
    categories: Object.entries(result.categories)
      .filter(([_, flagged]) => flagged)
      .map(([category]) => category),
  }
}

/**
 * AI Agent API Route Example
 * 
 * To use this in your app, create a new API route:
 * src/app/api/ai/generate-blog/route.ts
 * 
 * Example usage:
 * 
 * import { NextRequest, NextResponse } from 'next/server'
 * import { getSession } from '@/lib/auth'
 * import { generateBlogContent } from '@/lib/ai-agent'
 * 
 * export async function POST(request: NextRequest) {
 *   const session = await getSession()
 *   
 *   if (!session) {
 *     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
 *   }
 *   
 *   const { topic } = await request.json()
 *   const content = await generateBlogContent(topic)
 *   
 *   return NextResponse.json({ content })
 * }
 */

/**
 * Example: Using AI to analyze all blogs
 */
export async function analyzeBlogEngagement(blogs: Array<{
  title: string
  content: string
  createdAt: Date
}>) {
  const blogSummaries = blogs.map(b => 
    `Title: ${b.title}\nDate: ${b.createdAt.toDateString()}\nLength: ${b.content.length} chars`
  ).join('\n\n')

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a data analyst specializing in content analytics.',
      },
      {
        role: 'user',
        content: `Analyze these blog posts and provide insights:\n\n${blogSummaries}`,
      },
    ],
  })

  return completion.choices[0].message.content
}
