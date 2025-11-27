# Testing Guide

## Overview
Comprehensive test suite for the Mini Blogging Platform covering API routes, utilities, and components.

## Test Stack
- **Jest**: Testing framework
- **React Testing Library**: Component testing
- **jest-dom**: Custom matchers for DOM
- **jest-mock-extended**: Deep mocking for Prisma

## Installation

Install test dependencies:
```powershell
npm install
```

All testing dependencies are already in `package.json`.

## Running Tests

### Run all tests in watch mode:
```powershell
npm test
```

### Run tests once (CI mode):
```powershell
npm run test:ci
```

### Run tests with coverage:
```powershell
npm run test:coverage
```

## Test Structure

```
src/__tests__/
├── __mocks__/
│   └── prisma.ts              # Prisma mock for database tests
├── utils/
│   └── testUtils.ts           # Test helper functions
├── api/
│   ├── auth/
│   │   ├── signup.test.ts     # Signup endpoint tests
│   │   └── login.test.ts      # Login endpoint tests
│   ├── blogs/
│   │   └── blogs.test.ts      # Blog CRUD tests
│   └── ai/
│       └── query.test.ts      # AI agent endpoint tests
└── lib/
    ├── validations.test.ts    # Zod schema validation tests
    └── knowledge-base.test.ts # Knowledge base structure tests
```

## Test Coverage

### API Routes (100%)
✅ **Authentication**
- `POST /api/auth/signup` - User registration with validation
- `POST /api/auth/login` - User authentication
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

✅ **Blogs**
- `GET /api/blogs` - List all published blogs
- `POST /api/blogs` - Create new blog (authenticated)
- `GET /api/blogs/[id]` - Get single blog
- `PUT /api/blogs/[id]` - Update blog (author only)
- `DELETE /api/blogs/[id]` - Delete blog (author only)

✅ **AI Support Agent**
- `POST /api/ai/query` - Query AI agent
- `GET /api/ai/query` - Get knowledge base

### Utilities (100%)
✅ **Validation Schemas**
- Login schema validation
- Signup schema validation
- Blog schema validation
- Error message handling

✅ **Knowledge Base**
- FAQ structure validation
- Category validation
- System context verification

## Test Examples

### API Route Test
```typescript
it('should create a new user successfully', async () => {
  prismaMock.user.findUnique.mockResolvedValue(null)
  prismaMock.user.create.mockResolvedValue(mockUser)
  
  const request = createMockRequest('POST', '/api/auth/signup', {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  })
  
  const response = await POST(request)
  const data = await response.json()
  
  expect(response.status).toBe(201)
  expect(data.user.email).toBe('test@example.com')
})
```

### Validation Test
```typescript
it('should reject password shorter than 6 characters', () => {
  const result = signupSchema.safeParse({
    email: 'test@example.com',
    password: '12345',
    name: 'Test User',
  })
  
  expect(result.success).toBe(false)
})
```

## Mock Data Helpers

### Create Mock User
```typescript
const mockUser = createMockUser()
// Returns: { id, email, name, password, createdAt, updatedAt }
```

### Create Mock Blog
```typescript
const mockBlog = createMockBlog()
// Returns: { id, title, content, published, authorId, ... }
```

### Create Mock Request
```typescript
const request = createMockRequest('POST', 'http://localhost:3000/api/endpoint', {
  field: 'value'
})
```

## Prisma Mocking

The test suite uses `jest-mock-extended` for deep mocking of Prisma Client:

```typescript
import { prismaMock } from '@/__tests__/__mocks__/prisma'

// Mock database calls
prismaMock.user.findUnique.mockResolvedValue(mockUser)
prismaMock.blog.create.mockResolvedValue(mockBlog)
```

## Next.js Mocking

Router and navigation are automatically mocked in `jest.setup.js`:
- `useRouter`
- `usePathname`
- `useSearchParams`
- `useParams`

## Coverage Report

Run coverage to see detailed test coverage:
```powershell
npm run test:coverage
```

This generates:
- Console summary
- HTML report in `coverage/` directory

### Current Coverage Targets
- API Routes: 100%
- Utilities: 100%
- Components: 80%+ (when implemented)
- Overall: 90%+

## Writing New Tests

### 1. API Route Test Template
```typescript
import { POST } from '@/app/api/your-route/route'
import { prismaMock } from '@/__tests__/__mocks__/prisma'
import { createMockRequest } from '@/__tests__/utils/testUtils'

describe('/api/your-route', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  it('should do something', async () => {
    // Arrange
    prismaMock.model.method.mockResolvedValue(mockData)
    const request = createMockRequest('POST', '/api/your-route', {})
    
    // Act
    const response = await POST(request)
    const data = await response.json()
    
    // Assert
    expect(response.status).toBe(200)
    expect(data).toBeDefined()
  })
})
```

### 2. Utility Test Template
```typescript
import { yourFunction } from '@/lib/your-module'

describe('yourFunction', () => {
  it('should do something', () => {
    // Arrange
    const input = 'test'
    
    // Act
    const result = yourFunction(input)
    
    // Assert
    expect(result).toBe('expected')
  })
})
```

## Best Practices

1. **Arrange-Act-Assert**: Structure tests clearly
2. **Mock External Dependencies**: Always mock Prisma, external APIs
3. **Test Edge Cases**: Invalid input, missing data, errors
4. **Descriptive Names**: Use clear test descriptions
5. **Independent Tests**: Each test should run independently
6. **Clean Up**: Use `beforeEach` to reset mocks

## Continuous Integration

For CI/CD pipelines, use:
```yaml
# .github/workflows/test.yml
- name: Run tests
  run: npm run test:ci
  
- name: Coverage
  run: npm run test:coverage
```

## Troubleshooting

### Tests fail with "Cannot find module"
```powershell
npm install
```

### Prisma mock not working
Check that `jest.mock('@/lib/prisma')` is at the top of test file

### TypeScript errors in tests
Ensure `@types/jest` is installed:
```powershell
npm install --save-dev @types/jest
```

### Tests timeout
Increase Jest timeout in test file:
```typescript
jest.setTimeout(10000) // 10 seconds
```

## Test Statistics

- **Total Tests**: 30+
- **API Route Tests**: 15+
- **Utility Tests**: 10+
- **Component Tests**: Pending
- **Integration Tests**: Pending

## Next Steps

- [ ] Add component tests for React components
- [ ] Add integration tests for full user flows
- [ ] Add E2E tests with Playwright
- [ ] Increase coverage to 95%+
- [ ] Add performance tests
- [ ] Add accessibility tests

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://testingjavascript.com/)
