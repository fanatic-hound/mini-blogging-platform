# Mini Blogging Platform

A modern, full-stack mini blogging platform built with Next.js 14, TypeScript, PostgreSQL, and Prisma.

## Features

- **Authentication**: Secure signup and login with JWT tokens
- **Blog Management**: Create, read, update, and delete blog posts
- **Authorization**: Only blog authors can edit/delete their own posts
- **State Management**: Zustand for global state
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod schema validation
- **Styling**: Tailwind CSS with dark mode support
- **AI-Ready**: Structured for AI agent implementation

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Hook Form + Zod

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- bcryptjs (password hashing)
- jose (JWT authentication)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database running

### Installation

1. **Clone or navigate to the repository**

```bash
cd Mini-Blogging-Platform
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/miniblog?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
OPENAI_API_KEY="your-openai-api-key-here" # Optional
```

Replace the DATABASE_URL with your PostgreSQL connection string.

4. **Setup the database**

```bash
npm run prisma:push
```

This will create the tables in your database based on the Prisma schema.

5. **Generate Prisma Client**

```bash
npm run prisma:generate
```

6. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Mini-Blogging-Platform/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   └── blogs/         # Blog CRUD endpoints
│   │   ├── auth/              # Auth pages (login, signup)
│   │   ├── blogs/             # Blog pages
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   │   ├── AuthProvider.tsx
│   │   └── Navbar.tsx
│   ├── lib/                   # Utility functions
│   │   ├── auth.ts            # JWT utilities
│   │   ├── prisma.ts          # Prisma client
│   │   └── validations.ts     # Zod schemas
│   └── store/
│       └── authStore.ts       # Zustand store
├── .env.example               # Environment variables template
├── package.json
└── README.md
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Blogs

- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create a new blog (authenticated)
- `GET /api/blogs/[id]` - Get a specific blog
- `PUT /api/blogs/[id]` - Update a blog (author only)
- `DELETE /api/blogs/[id]` - Delete a blog (author only)

## Database Schema

### User Model
- id (String, Primary Key)
- email (String, Unique)
- name (String)
- password (String, Hashed)
- blogs (Relation)

### Blog Model
- id (String, Primary Key)
- title (String)
- content (Text)
- published (Boolean, default: true)
- authorId (Foreign Key)
- author (Relation to User)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:push` - Push schema to database
- `npm run prisma:studio` - Open Prisma Studio

## AI Agent Implementation

The platform is structured to support AI agent integration:

1. **API Routes**: RESTful endpoints for programmatic access
2. **JWT Authentication**: Secure token-based auth for agents
3. **OpenAI SDK**: Pre-installed for AI features
4. **Structured Data**: Clear schema and validation

Example AI agent use cases:
- Auto-generate blog content
- Moderate blog posts
- Suggest blog improvements
- Analyze user engagement

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- HTTP-only cookies
- CSRF protection via SameSite cookies
- Input validation with Zod
- Database queries via Prisma (SQL injection protection)

## Contributing

Feel free to submit issues or pull requests!

## License

MIT
