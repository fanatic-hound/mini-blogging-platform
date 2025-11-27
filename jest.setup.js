// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// Polyfill for TextEncoder/TextDecoder
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock fetch for Node environment
global.fetch = jest.fn()

// Mock Next.js server APIs (Request, Response, Headers, etc.)
// These are needed because Next.js server components use Web APIs
class MockHeaders extends Map {
  constructor(init) {
    super()
    if (init) {
      if (init instanceof Headers || init instanceof MockHeaders) {
        init.forEach((value, key) => this.set(key, value))
      } else if (Array.isArray(init)) {
        init.forEach(([key, value]) => this.set(key, value))
      } else if (typeof init === 'object') {
        Object.entries(init).forEach(([key, value]) => this.set(key, value))
      }
    }
  }
  
  append(key, value) {
    const existing = this.get(key)
    if (existing) {
      this.set(key, `${existing}, ${value}`)
    } else {
      this.set(key, value)
    }
  }
  
  getSetCookie() {
    return this.get('set-cookie')?.split(', ') || []
  }
}

class MockRequest {
  constructor(input, init = {}) {
    this.url = typeof input === 'string' ? input : input.url
    this.method = init.method || 'GET'
    this.headers = new MockHeaders(init.headers)
    this.body = init.body
    this._bodyUsed = false
  }
  
  async json() {
    if (this._bodyUsed) throw new TypeError('Body already used')
    this._bodyUsed = true
    return typeof this.body === 'string' ? JSON.parse(this.body) : this.body
  }
  
  async text() {
    if (this._bodyUsed) throw new TypeError('Body already used')
    this._bodyUsed = true
    return typeof this.body === 'string' ? this.body : JSON.stringify(this.body)
  }
  
  clone() {
    return new MockRequest(this.url, {
      method: this.method,
      headers: this.headers,
      body: this.body,
    })
  }
}

class MockResponse {
  constructor(body, init = {}) {
    this.body = body
    this.status = init.status || 200
    this.statusText = init.statusText || 'OK'
    this.headers = new MockHeaders(init.headers)
    this.ok = this.status >= 200 && this.status < 300
  }
  
  async json() {
    return typeof this.body === 'string' ? JSON.parse(this.body) : this.body
  }
  
  async text() {
    return typeof this.body === 'string' ? this.body : JSON.stringify(this.body)
  }
  
  static json(data, init) {
    return new MockResponse(JSON.stringify(data), {
      ...init,
      headers: {
        'content-type': 'application/json',
        ...init?.headers,
      },
    })
  }
}

// Assign to global
global.Headers = MockHeaders
global.Request = MockRequest
global.Response = MockResponse

// Mock next/server module
jest.mock('next/server', () => {
  const originalModule = jest.requireActual('next/server')
  
  return {
    ...originalModule,
    NextRequest: MockRequest,
    NextResponse: {
      json: (data, init) => MockResponse.json(data, init),
      redirect: (url, init) => new MockResponse(null, { ...init, status: init?.status || 307, headers: { location: url } }),
      next: (init) => new MockResponse(null, init),
    },
  }
})

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  useParams() {
    return {}
  },
}))

// Mock Next.js cookies
const mockCookieStore = new Map()
jest.mock('next/headers', () => ({
  cookies: jest.fn(async () => ({
    get: jest.fn((name) => mockCookieStore.get(name) || { value: 'mock-token' }),
    set: jest.fn((name, value, options) => {
      mockCookieStore.set(name, { value, ...options })
      return undefined
    }),
    delete: jest.fn((name) => {
      mockCookieStore.delete(name)
      return undefined
    }),
    has: jest.fn((name) => mockCookieStore.has(name)),
    getAll: jest.fn(() => Array.from(mockCookieStore.entries()).map(([name, data]) => ({ name, ...data }))),
  })),
  headers: jest.fn(async () => ({
    get: jest.fn(),
    has: jest.fn(),
    entries: jest.fn(() => []),
  })),
}))

// Mock environment variables
process.env.JWT_SECRET = 'test-secret-key'
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test'

// Mock jose library (JWT)
jest.mock('jose', () => ({
  SignJWT: jest.fn().mockImplementation(() => ({
    setProtectedHeader: jest.fn().mockReturnThis(),
    setIssuedAt: jest.fn().mockReturnThis(),
    setExpirationTime: jest.fn().mockReturnThis(),
    sign: jest.fn().mockResolvedValue('mock-jwt-token'),
  })),
  jwtVerify: jest.fn().mockResolvedValue({
    payload: { userId: 'user-123', email: 'test@example.com' },
  }),
}))

// Mock Prisma Client
jest.mock('@/lib/prisma', () => {
  const { prismaMock } = require('./src/__tests__/__mocks__/prisma')
  return {
    prisma: prismaMock,
  }
})

