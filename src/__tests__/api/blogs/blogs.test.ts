import { GET, POST } from '@/app/api/blogs/route'
import { prismaMock } from '@/__tests__/__mocks__/prisma'
import { createMockRequest, createMockBlog, createMockUser } from '@/__tests__/utils/testUtils'
import * as auth from '@/lib/auth'

jest.mock('@/lib/auth')

describe('/api/blogs', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/blogs', () => {
    it('should return all published blogs', async () => {
      const mockBlogs = [
        {
          ...createMockBlog(),
          author: createMockUser(),
        },
        {
          id: 'blog-456',
          title: 'Second Blog',
          content: 'Second content',
          published: true,
          authorId: 'user-123',
          createdAt: new Date(),
          updatedAt: new Date(),
          author: createMockUser(),
        },
      ]

      prismaMock.blog.findMany.mockResolvedValue(mockBlogs as any)

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.blogs).toHaveLength(2)
      expect(data.blogs[0].title).toBe('Test Blog')
      expect(prismaMock.blog.findMany).toHaveBeenCalledWith({
        where: { published: true },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    })

    it('should return empty array when no blogs exist', async () => {
      prismaMock.blog.findMany.mockResolvedValue([])

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.blogs).toEqual([])
    })
  })

  describe('POST /api/blogs', () => {
    it('should create a new blog when authenticated', async () => {
      const mockSession = {
        userId: 'user-123',
        email: 'test@example.com',
      }

      const mockBlog = {
        ...createMockBlog(),
        author: createMockUser(),
      }

      ;(auth.getSession as jest.Mock).mockResolvedValue(mockSession)
      prismaMock.blog.create.mockResolvedValue(mockBlog as any)

      const request = createMockRequest('POST', 'http://localhost:3000/api/blogs', {
        title: 'New Blog',
        content: 'Blog content',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.blog.title).toBe('Test Blog')
      expect(prismaMock.blog.create).toHaveBeenCalled()
    })

    it('should return 401 when not authenticated', async () => {
      ;(auth.getSession as jest.Mock).mockResolvedValue(null)

      const request = createMockRequest('POST', 'http://localhost:3000/api/blogs', {
        title: 'New Blog',
        content: 'Blog content',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should return validation error for missing title', async () => {
      const mockSession = {
        userId: 'user-123',
        email: 'test@example.com',
      }

      ;(auth.getSession as jest.Mock).mockResolvedValue(mockSession)

      const request = createMockRequest('POST', 'http://localhost:3000/api/blogs', {
        content: 'Blog content',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBeDefined()
    })

    it('should return validation error for missing content', async () => {
      const mockSession = {
        userId: 'user-123',
        email: 'test@example.com',
      }

      ;(auth.getSession as jest.Mock).mockResolvedValue(mockSession)

      const request = createMockRequest('POST', 'http://localhost:3000/api/blogs', {
        title: 'New Blog',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBeDefined()
    })
  })
})
