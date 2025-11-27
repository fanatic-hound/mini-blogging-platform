export function createMockRequest(
  method: string,
  url: string,
  body?: any,
  headers?: Record<string, string>
): any {
  const requestInit: any = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  if (body) {
    requestInit.body = body
  }

  // Use the global mocked Request from jest.setup.js
  return new Request(url, requestInit)
}

export function createMockUser() {
  return {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
    password: '$2a$10$hashedpassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export function createMockBlog() {
  return {
    id: 'blog-123',
    title: 'Test Blog',
    content: 'Test content',
    published: true,
    authorId: 'user-123',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export async function extractJsonResponse(response: Response) {
  return await response.json()
}
