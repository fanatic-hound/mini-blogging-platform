import { prismaMock } from '@/__tests__/__mocks__/prisma'
import { POST } from '@/app/api/auth/signup/route'
import { createMockRequest } from '@/__tests__/utils/testUtils'
import bcrypt from 'bcryptjs'

jest.mock('bcryptjs')
jest.mock('@/lib/auth')

describe('/api/auth/signup', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create a new user successfully', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'newuser@example.com',
      name: 'New User',
    }

    prismaMock.user.findUnique.mockResolvedValue(null)
    prismaMock.user.create.mockResolvedValue(mockUser as any)
    ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword')

    const request = createMockRequest('POST', 'http://localhost:3000/api/auth/signup', {
      email: 'newuser@example.com',
      password: 'password123',
      name: 'New User',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.user).toEqual({
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name,
    })
    expect(prismaMock.user.create).toHaveBeenCalled()
  })

  it('should return error if user already exists', async () => {
    const existingUser = {
      id: 'user-123',
      email: 'existing@example.com',
      name: 'Existing User',
      password: 'hashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    prismaMock.user.findUnique.mockResolvedValue(existingUser)

    const request = createMockRequest('POST', 'http://localhost:3000/api/auth/signup', {
      email: 'existing@example.com',
      password: 'password123',
      name: 'Test User',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('User already exists')
  })

  it('should return validation error for invalid email', async () => {
    const request = createMockRequest('POST', 'http://localhost:3000/api/auth/signup', {
      email: 'invalid-email',
      password: 'password123',
      name: 'Test User',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBeDefined()
  })

  it('should return validation error for short password', async () => {
    const request = createMockRequest('POST', 'http://localhost:3000/api/auth/signup', {
      email: 'test@example.com',
      password: '123',
      name: 'Test User',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBeDefined()
  })

  it('should return validation error for missing name', async () => {
    const request = createMockRequest('POST', 'http://localhost:3000/api/auth/signup', {
      email: 'test@example.com',
      password: 'password123',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBeDefined()
  })
})
