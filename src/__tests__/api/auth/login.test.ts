import { POST } from '@/app/api/auth/login/route'
import { prismaMock } from '@/__tests__/__mocks__/prisma'
import { createMockRequest } from '@/__tests__/utils/testUtils'
import bcrypt from 'bcryptjs'

jest.mock('bcryptjs')
jest.mock('@/lib/auth')

describe('/api/auth/login', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should login user successfully with valid credentials', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
      password: '$2a$10$hashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    prismaMock.user.findUnique.mockResolvedValue(mockUser)
    ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)

    const request = createMockRequest('POST', 'http://localhost:3000/api/auth/login', {
      email: 'test@example.com',
      password: 'password123',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.user).toEqual({
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name,
    })
  })

  it('should return error for non-existent user', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)

    const request = createMockRequest('POST', 'http://localhost:3000/api/auth/login', {
      email: 'nonexistent@example.com',
      password: 'password123',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Invalid credentials')
  })

  it('should return error for invalid password', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
      password: '$2a$10$hashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    prismaMock.user.findUnique.mockResolvedValue(mockUser)
    ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

    const request = createMockRequest('POST', 'http://localhost:3000/api/auth/login', {
      email: 'test@example.com',
      password: 'wrongpassword',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Invalid credentials')
  })

  it('should return validation error for invalid email format', async () => {
    const request = createMockRequest('POST', 'http://localhost:3000/api/auth/login', {
      email: 'invalid-email',
      password: 'password123',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBeDefined()
  })

  it('should return validation error for missing password', async () => {
    const request = createMockRequest('POST', 'http://localhost:3000/api/auth/login', {
      email: 'test@example.com',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBeDefined()
  })
})
