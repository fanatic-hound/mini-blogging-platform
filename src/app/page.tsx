import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Mini Blogging Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Share your thoughts with the world
          </p>
          
          <div className="flex gap-4 justify-center mb-12">
            <Link
              href="/auth/signup"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
            <Link
              href="/auth/login"
              className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Log In
            </Link>
            <Link
              href="/blogs"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              View Blogs
            </Link>
          </div>

          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Features</h2>
            <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
              <li>✅ User authentication (signup/login with JWT)</li>
              <li>✅ Create, read, update, and delete blogs</li>
              <li>✅ Only authors can edit/delete their blogs</li>
              <li>✅ Everyone can view published blogs</li>
              <li>✅ State management with Zustand</li>
              <li>✅ Secure password hashing with bcrypt</li>
              <li>✅ PostgreSQL database with Prisma ORM</li>
              <li>✅ AI agent ready implementation</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
