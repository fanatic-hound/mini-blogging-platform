import { knowledgeBase } from '@/lib/knowledge-base'

describe('Knowledge Base', () => {
  it('should have a title', () => {
    expect(knowledgeBase.title).toBe('Mini Blogging Platform - Help Center')
  })

  it('should have FAQs', () => {
    expect(knowledgeBase.faqs).toBeDefined()
    expect(Array.isArray(knowledgeBase.faqs)).toBe(true)
    expect(knowledgeBase.faqs.length).toBeGreaterThan(0)
  })

  it('should have valid FAQ structure', () => {
    const faq = knowledgeBase.faqs[0]
    
    expect(faq).toHaveProperty('id')
    expect(faq).toHaveProperty('category')
    expect(faq).toHaveProperty('question')
    expect(faq).toHaveProperty('answer')
    expect(typeof faq.id).toBe('number')
    expect(typeof faq.category).toBe('string')
    expect(typeof faq.question).toBe('string')
    expect(typeof faq.answer).toBe('string')
  })

  it('should have unique FAQ IDs', () => {
    const ids = knowledgeBase.faqs.map(faq => faq.id)
    const uniqueIds = new Set(ids)
    
    expect(ids.length).toBe(uniqueIds.size)
  })

  it('should have system context', () => {
    expect(knowledgeBase.systemContext).toBeDefined()
    expect(typeof knowledgeBase.systemContext).toBe('string')
    expect(knowledgeBase.systemContext.length).toBeGreaterThan(0)
  })

  it('should have multiple categories', () => {
    const categories = [...new Set(knowledgeBase.faqs.map(faq => faq.category))]
    
    expect(categories.length).toBeGreaterThan(1)
  })

  it('should have expected categories', () => {
    const categories = [...new Set(knowledgeBase.faqs.map(faq => faq.category))]
    
    expect(categories).toContain('Getting Started')
    expect(categories).toContain('Blog Management')
  })
})
