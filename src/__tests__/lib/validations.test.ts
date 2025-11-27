import { loginSchema, signupSchema, blogSchema } from '@/lib/validations'

describe('Validation Schemas', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      }

      const result = loginSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject missing password', () => {
      const invalidData = {
        email: 'test@example.com',
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('signupSchema', () => {
    it('should validate correct signup data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      }

      const result = signupSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject password shorter than 6 characters', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '12345',
        name: 'Test User',
      }

      const result = signupSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject missing name', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password123',
      }

      const result = signupSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject invalid email format', () => {
      const invalidData = {
        email: 'not-an-email',
        password: 'password123',
        name: 'Test User',
      }

      const result = signupSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('blogSchema', () => {
    it('should validate correct blog data', () => {
      const validData = {
        title: 'Test Blog',
        content: 'This is test content',
      }

      const result = blogSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject missing title', () => {
      const invalidData = {
        content: 'This is test content',
      }

      const result = blogSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject missing content', () => {
      const invalidData = {
        title: 'Test Blog',
      }

      const result = blogSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject empty title', () => {
      const invalidData = {
        title: '',
        content: 'This is test content',
      }

      const result = blogSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject empty content', () => {
      const invalidData = {
        title: 'Test Blog',
        content: '',
      }

      const result = blogSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})
