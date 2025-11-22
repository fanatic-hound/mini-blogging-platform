import { NextRequest, NextResponse } from 'next/server'
import { knowledgeBase } from '@/lib/knowledge-base'

// Simple similarity search function
function calculateSimilarity(text1: string, text2: string): number {
  const words1 = text1.toLowerCase().split(/\s+/)
  const words2 = text2.toLowerCase().split(/\s+/)
  
  const commonWords = words1.filter(word => words2.includes(word))
  return commonWords.length / Math.max(words1.length, words2.length)
}

// Find relevant FAQs based on user query
function findRelevantFAQs(query: string, limit: number = 3) {
  const scoredFAQs = knowledgeBase.faqs.map(faq => {
    const questionScore = calculateSimilarity(query, faq.question)
    const answerScore = calculateSimilarity(query, faq.answer) * 0.5
    const categoryScore = calculateSimilarity(query, faq.category) * 0.3
    
    return {
      faq,
      score: questionScore + answerScore + categoryScore
    }
  })
  
  return scoredFAQs
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .filter(item => item.score > 0.1)
    .map(item => item.faq)
}

// Generate AI response based on knowledge base
function generateResponse(query: string): string {
  const relevantFAQs = findRelevantFAQs(query, 3)
  
  if (relevantFAQs.length === 0) {
    return `I'm sorry, I couldn't find specific information about "${query}" in my knowledge base. 

However, I can help you with questions about:
- Creating an account and logging in
- Creating, editing, and deleting blog posts
- Platform features and security
- Troubleshooting common issues

Could you please rephrase your question or ask about one of these topics?`
  }
  
  if (relevantFAQs.length === 1) {
    const faq = relevantFAQs[0]
    return `${faq.answer}

Is there anything else you'd like to know?`
  }
  
  // Multiple relevant FAQs found
  let response = "Here's what I found that might help:\n\n"
  
  relevantFAQs.forEach((faq, index) => {
    response += `**${faq.question}**\n${faq.answer}\n\n`
  })
  
  response += "Does this answer your question? Feel free to ask for more details!"
  
  return response
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { question } = body
    
    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required and must be a string' },
        { status: 400 }
      )
    }
    
    if (question.trim().length < 3) {
      return NextResponse.json(
        { error: 'Question is too short. Please provide more details.' },
        { status: 400 }
      )
    }
    
    if (question.length > 500) {
      return NextResponse.json(
        { error: 'Question is too long. Please keep it under 500 characters.' },
        { status: 400 }
      )
    }
    
    // Generate response based on knowledge base
    const answer = generateResponse(question.trim())
    
    // Find the category of the best match
    const relevantFAQs = findRelevantFAQs(question.trim(), 1)
    const category = relevantFAQs.length > 0 ? relevantFAQs[0].category : 'General'
    
    return NextResponse.json({
      question: question.trim(),
      answer,
      category,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('AI query error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve all FAQs or by category
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    if (category) {
      const filteredFAQs = knowledgeBase.faqs.filter(
        faq => faq.category.toLowerCase() === category.toLowerCase()
      )
      
      return NextResponse.json({
        category,
        faqs: filteredFAQs,
        total: filteredFAQs.length
      })
    }
    
    // Get all categories
    const categorySet = new Set(knowledgeBase.faqs.map(faq => faq.category))
    const categories = Array.from(categorySet)
    
    return NextResponse.json({
      title: knowledgeBase.title,
      lastUpdated: knowledgeBase.lastUpdated,
      categories,
      totalFAQs: knowledgeBase.faqs.length,
      faqs: knowledgeBase.faqs
    })
  } catch (error) {
    console.error('Get knowledge base error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
