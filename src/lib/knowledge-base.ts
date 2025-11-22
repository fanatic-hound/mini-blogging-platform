export const knowledgeBase = {
  title: "Mini Blogging Platform - Help Center",
  lastUpdated: "November 2025",
  
  faqs: [
    {
      id: 1,
      category: "Getting Started",
      question: "How do I create an account?",
      answer: "To create an account, click on 'Sign Up' in the navigation bar. Fill in your name, email, and password (minimum 6 characters). Once submitted, you'll be automatically logged in and can start creating blogs."
    },
    {
      id: 2,
      category: "Getting Started",
      question: "How do I log in?",
      answer: "Click on 'Login' in the navigation bar, enter your registered email and password, then click 'Login'. If you've forgotten your password, please contact support."
    },
    {
      id: 3,
      category: "Blog Management",
      question: "How do I create a blog post?",
      answer: "After logging in, navigate to the 'Blogs' page and click on 'Create New Blog'. Enter a title and content for your blog post, then click 'Create Blog'. Your blog will be published immediately."
    },
    {
      id: 4,
      category: "Blog Management",
      question: "Can I edit my blog posts?",
      answer: "Yes! Navigate to your blog post by clicking 'Read more' on the blogs page. If you're the author, you'll see 'Edit' and 'Delete' buttons. Click 'Edit' to modify your blog post, make your changes, and click 'Save Changes'."
    },
    {
      id: 5,
      category: "Blog Management",
      question: "How do I delete a blog post?",
      answer: "Open your blog post and click the 'Delete' button (only visible to the author). Confirm the deletion when prompted. This action cannot be undone."
    },
    {
      id: 6,
      category: "Blog Management",
      question: "Can I edit or delete someone else's blog?",
      answer: "No, you can only edit or delete your own blog posts. The Edit and Delete buttons will only appear on blogs you've authored."
    },
    {
      id: 7,
      category: "Features",
      question: "What features does the platform have?",
      answer: "The platform includes: user authentication (signup/login), blog creation with rich text content, blog editing and deletion (for authors only), viewing all published blogs with author information, dark mode support, and responsive design for all devices."
    },
    {
      id: 8,
      category: "Features",
      question: "Is there a character limit for blog posts?",
      answer: "There's no strict character limit, but we recommend keeping your content readable and engaging. Both title and content fields are required when creating a blog."
    },
    {
      id: 9,
      category: "Account & Security",
      question: "Is my data secure?",
      answer: "Yes! We use industry-standard security practices including password hashing with bcrypt, JWT-based authentication, HTTP-only cookies, and PostgreSQL database with Prisma ORM to prevent SQL injection."
    },
    {
      id: 10,
      category: "Account & Security",
      question: "How long does my login session last?",
      answer: "Your login session lasts for 7 days. After that, you'll need to log in again. You can log out manually at any time by clicking 'Logout' in the navigation bar."
    },
    {
      id: 11,
      category: "Technical",
      question: "What technology is this platform built with?",
      answer: "The platform is built with Next.js 14 (React), TypeScript, Tailwind CSS, PostgreSQL database, Prisma ORM, JWT authentication, and Zustand for state management."
    },
    {
      id: 12,
      category: "Technical",
      question: "Does the platform support markdown?",
      answer: "Currently, the platform supports plain text with line breaks preserved. Markdown support may be added in future updates."
    },
    {
      id: 13,
      category: "Troubleshooting",
      question: "I'm getting an 'Unauthorized' error",
      answer: "This means you're not logged in or your session has expired. Please log in again. If you're trying to create, edit, or delete a blog, make sure you're logged in with the correct account."
    },
    {
      id: 14,
      category: "Troubleshooting",
      question: "My blog post isn't showing up",
      answer: "Make sure you successfully created the blog post (you should see a success message or be redirected to the blogs page). Refresh the blogs page. If the problem persists, try logging out and logging back in."
    },
    {
      id: 15,
      category: "Troubleshooting",
      question: "I forgot my password",
      answer: "Currently, there is no automated password recovery. Please contact support for assistance with resetting your password."
    },
    {
      id: 16,
      category: "About",
      question: "Who can see my blog posts?",
      answer: "All published blog posts are publicly visible to anyone visiting the platform, whether they have an account or not. However, only you (the author) can edit or delete your posts."
    },
    {
      id: 17,
      category: "About",
      question: "Can I make a blog post private or draft?",
      answer: "Currently, all created blogs are published immediately. Draft and private post features may be added in future updates."
    },
    {
      id: 18,
      category: "Support",
      question: "How do I contact support?",
      answer: "You can use this AI support agent for immediate help with common questions. For more complex issues, please reach out through the contact information provided in the application."
    }
  ],

  // System information for the AI agent
  systemContext: `You are a helpful support agent for the Mini Blogging Platform. 
Your role is to assist users with questions about the platform's features, functionality, and troubleshooting.

Key Platform Features:
- User authentication (signup, login, logout)
- Blog post creation, editing, and deletion
- View all published blogs
- Authors can only edit/delete their own posts
- JWT-based secure authentication
- PostgreSQL database with Prisma ORM
- Built with Next.js 14, TypeScript, and Tailwind CSS

Always be friendly, concise, and helpful. If a question is not in your knowledge base, 
politely inform the user that you don't have that information and suggest they contact support.`
}

export type FAQ = typeof knowledgeBase.faqs[0]
export type FAQCategory = FAQ['category']
