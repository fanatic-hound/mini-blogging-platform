import { POST } from '@/app/api/ai/query/route'
import { createMockRequest } from '@/__tests__/utils/testUtils'

describe('/api/ai/query', () => {
  it('should return answer for valid question', async () => {
    const request = createMockRequest('POST', 'http://localhost:3000/api/ai/query', {
      question: 'How do I create an account?',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.answer).toBeDefined()
    expect(data.question).toBe('How do I create an account?')
    expect(data.category).toBeDefined()
    expect(data.timestamp).toBeDefined()
  })

  it('should return response for any question', async () => {
    const request = createMockRequest('POST', 'http://localhost:3000/api/ai/query', {
      question: 'What is the price of Bitcoin today in USD?',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.answer).toBeDefined()
    expect(data.question).toBe('What is the price of Bitcoin today in USD?')
    expect(typeof data.answer).toBe('string')
  })

  it('should return error for empty question', async () => {
    const request = createMockRequest('POST', 'http://localhost:3000/api/ai/query', {
      question: '',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBeDefined()
  })

  it('should return error for too short question', async () => {
    const request = createMockRequest('POST', 'http://localhost:3000/api/ai/query', {
      question: 'Hi',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('too short')
  })

  it('should return error for too long question', async () => {
    const longQuestion = 'a'.repeat(501)
    const request = createMockRequest('POST', 'http://localhost:3000/api/ai/query', {
      question: longQuestion,
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('too long')
  })

  it('should return error for missing question field', async () => {
    const request = createMockRequest('POST', 'http://localhost:3000/api/ai/query', {})

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBeDefined()
  })
})
