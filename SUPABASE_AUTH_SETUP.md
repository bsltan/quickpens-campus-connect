# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication in your QuickPens Campus Connect application.

## Prerequisites

- A Supabase account (free tier is sufficient)
- Your QuickPens Campus Connect project running locally

## Step 1: Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project
3. Give your project a name (e.g., "quickpens-campus-connect")
4. Set a secure database password
5. Choose a region closest to your users
6. Wait for your project to be created (this may take a few minutes)

## Step 2: Get Your Supabase Credentials

1. Once your project is created, go to the project dashboard
2. In the left sidebar, click on "Project Settings"
3. Click on "API" in the settings menu
4. You'll find your project URL and anon/public key here

## Step 3: Configure Your Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

3. Save the file
4. Restart your development server if it's running

## Step 4: Configure Supabase Authentication Settings

1. In your Supabase dashboard, go to "Authentication" in the left sidebar
2. Under "URL Configuration", set your site URL to your local development URL (e.g., `http://localhost:8080`)
3. Add any additional redirect URLs you need (e.g., `http://localhost:8080/reset-password`)

## Step 5: Test Authentication

Your application now has the following authentication features:

- **Sign Up**: Users can create new accounts
- **Sign In**: Existing users can log in
- **Password Reset**: Users can reset their passwords
- **Protected Routes**: Some routes require authentication
- **User Profile**: Authenticated users can view their profile

To test:

1. Click "Sign Up" in the header to create a new account
2. Confirm your email (check your email inbox)
3. Sign in with your credentials
4. Access your profile page

## Authentication Components

The following components have been added to your project:

- `SignUp`: User registration form
- `SignIn`: Login form
- `ResetPassword`: Password reset request form
- `Profile`: User profile page
- `ProtectedRoute`: Higher-order component to protect routes

## Customization

You can customize the authentication components to match your application's design and requirements. The components are located in the `src/components/auth` directory.

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

## Troubleshooting

- If you encounter CORS issues, make sure your site URL is correctly set in the Supabase dashboard
- If password reset emails aren't arriving, check your spam folder and verify your email settings in Supabase
- For any other issues, refer to the Supabase documentation or community forums