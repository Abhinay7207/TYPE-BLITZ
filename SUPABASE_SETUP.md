# Supabase Setup Instructions

## Enable Email Authentication

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `hawcvivpntlbvwprvzdk`
3. Navigate to **Authentication** → **Providers**
4. Find **Email** provider
5. Make sure it's **Enabled** (it should be by default)
6. Scroll down and click **Save**

## Configure Email Settings (Optional but Recommended)

1. In **Authentication** → **Email Templates**
2. You can customize the confirmation email template
3. For development, you can disable email confirmation:
   - Go to **Authentication** → **Providers** → **Email**
   - Toggle **Confirm email** to OFF (for testing only)

## Run the Database Schema

If you haven't already, run the SQL schema:

1. Go to **SQL Editor** in Supabase
2. Copy the content from `schema.sql`
3. Paste and click **Run**

This creates:
- `profiles` table
- `results` table
- Row Level Security policies
- Automatic profile creation trigger

## Test Authentication

1. Refresh your TypeBlitz app
2. Click **Sign In**
3. Choose **Sign Up** to create a new account
4. Enter email and password
5. Sign in and complete a typing test
6. Your score will be saved!

## Optional: Enable Google OAuth

If you want to use Google Sign-In instead:

1. Go to **Authentication** → **Providers**
2. Find **Google** provider
3. Click **Enable**
4. Follow the instructions to get Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://hawcvivpntlbvwprvzdk.supabase.co/auth/v1/callback`
5. Copy Client ID and Client Secret to Supabase
6. Save

Then update `Auth.tsx` to include Google sign-in option.
