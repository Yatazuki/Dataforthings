# Supabase Database Configuration

## Overview
This document contains information about the Supabase configuration for Yatazuki.com. The site uses Supabase for authentication and data storage.

## Supabase Connection Details
- **Project URL**: https://qqplzgqhkffwvefbnyte.supabase.co
- **API Key**: sbp_1a4f543fb917a5d78183d4576a97e18b960c96a5 (service key - KEEP SECURE)
- **Project Reference ID**: qqplzgqhkffwvefbnyte

> **⚠️ IMPORTANT SECURITY NOTICE**: 
> - The API key included here is a service key with full access to your database. 
> - This should NEVER be exposed in client-side code or public repositories.
> - For client-side code, you should use the "anon" public key instead.
> - Consider rotating this key if you suspect it has been compromised.

## Database Tables

### 1. auth.users
- Default Supabase authentication table
- Created and managed by Supabase Auth

### 2. notes
- Stores user notes
- Schema:
  ```sql
  create table notes (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id),
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
  );
  ```

### 3. login
- Custom user profile information
- Schema:
  ```sql
  CREATE TABLE login (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, 
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
  ```

### 4. game_scores
- Stores user game scores
- Schema:
  ```sql
  CREATE TABLE game_scores (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    game_type VARCHAR(20) NOT NULL,
    score INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
  ```

## Row Level Security (RLS) Policies

These policies ensure users can only access their own data:

```sql
-- Enable RLS
alter table notes enable row level security;

-- Policies for the notes table
create policy "Users can read all notes" on notes
  for select using (true);

create policy "Users can insert their own notes" on notes
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own notes" on notes
  for update using (auth.uid() = user_id);

create policy "Users can delete their own notes" on notes
  for delete using (auth.uid() = user_id);
```

## Domain Configuration

To secure your Supabase connection:

1. In the Supabase dashboard, go to Authentication → URL Configuration
2. Add the following site URLs:
   - https://yatazuki.com
   - http://yatazuki.com
   - https://www.yatazuki.com
   - http://www.yatazuki.com

3. Set your redirect URLs to:
   - https://yatazuki.com/dashboard.html
   - http://yatazuki.com/dashboard.html

## Security Best Practices

1. **API Key Protection**:
   - Use environment variables for the Supabase API key in backend code
   - Never expose service keys in client-side code
   - Use the anon/public key for client-side code

2. **CORS Configuration**:
   - Restrict API access to your domain only
   - Current settings allow only yatazuki.com to access the backend

3. **Row Level Security**:
   - All tables should have RLS enabled
   - Create policies that limit data access based on user ID

4. **User Data**:
   - Enforce email verification
   - Use secure password policies
   - Implement rate limiting for authentication attempts

## Backup and Recovery

1. Set up daily automated backups of your Supabase project
2. Test restoration process periodically
3. Consider a separate backup storage solution for critical data

## Environment Variables

For security reasons, store the following values as environment variables on the server:

```
SUPABASE_URL=https://qqplzgqhkffwvefbnyte.supabase.co
SUPABASE_SERVICE_KEY=sbp_1a4f543fb917a5d78183d4576a97e18b960c96a5
SUPABASE_ANON_KEY=[your_anon_key]
FRONTEND_URL=https://yatazuki.com
``` 