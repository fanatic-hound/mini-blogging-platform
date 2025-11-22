# Upload to GitHub - Step-by-Step Guide

## Prerequisites
- Git installed on your machine
- GitHub account created at https://github.com

## Step 1: Initialize Git Repository

Open PowerShell in your project directory and run:

```powershell
# Initialize Git
git init

# Check status
git status
```

## Step 2: Stage All Files

```powershell
# Add all files to staging
git add .

# Verify what's staged
git status
```

## Step 3: Create First Commit

```powershell
# Commit with a message
git commit -m "Initial commit: Mini Blogging Platform with AI Support Agent"
```

## Step 4: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `Mini-Blogging-Platform` (or your preferred name)
3. Description: "A full-stack mini blogging platform with AI support agent"
4. Choose: **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have them)
6. Click **"Create repository"**

## Step 5: Connect to GitHub

After creating the repository, GitHub will show you commands. Use these:

```powershell
# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/Mini-Blogging-Platform.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 6: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. The README.md should display on the repository homepage

## Quick Command Summary

```powershell
# One-time setup
git init
git add .
git commit -m "Initial commit: Mini Blogging Platform with AI Support Agent"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/Mini-Blogging-Platform.git
git branch -M main
git push -u origin main
```

## Future Updates

After initial upload, use these commands to push updates:

```powershell
# Check what changed
git status

# Add changes
git add .

# Commit with message
git commit -m "Your commit message describing changes"

# Push to GitHub
git push
```

## Common Issues & Solutions

### Issue: "fatal: remote origin already exists"
```powershell
# Remove existing remote
git remote remove origin

# Add it again
git remote add origin https://github.com/YOUR_USERNAME/Mini-Blogging-Platform.git
```

### Issue: Authentication required
- GitHub now requires Personal Access Tokens instead of passwords
- Go to: Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token with `repo` scope
- Use token as password when pushing

### Issue: "fatal: not a git repository"
```powershell
# Make sure you're in the project directory
cd C:\Projects\Mini-Blogging-Platform

# Initialize git
git init
```

## Environment Variables Security ⚠️

Your `.env` file is already in `.gitignore`, so sensitive data won't be uploaded. 

Make sure to:
1. Document required environment variables in README
2. Never commit `.env` file
3. Create `.env.example` for reference (already created)

## What Gets Uploaded

✅ Uploaded:
- All source code
- Configuration files
- README.md and documentation
- .env.example (template)
- package.json and dependencies list

❌ NOT Uploaded (in .gitignore):
- /node_modules (too large, can be reinstalled)
- /.next (build artifacts)
- .env (sensitive credentials)
- Database migrations
- Build files

## After Upload

Remember to add a GitHub repository description and topics:
1. Go to your repository settings
2. Add topics: `nextjs`, `typescript`, `postgresql`, `prisma`, `ai-agent`, `blogging-platform`
3. Add description: "Full-stack mini blogging platform with authentication, CRUD operations, and AI support agent"

## Clone on Another Machine

Others (or you on another machine) can clone with:

```powershell
git clone https://github.com/YOUR_USERNAME/Mini-Blogging-Platform.git
cd Mini-Blogging-Platform
npm install
# Setup .env file
# Run prisma push
npm run prisma:push
npm run dev
```
