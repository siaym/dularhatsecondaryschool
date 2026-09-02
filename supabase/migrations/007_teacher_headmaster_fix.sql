-- Run this in your Supabase SQL Editor to add the missing is_headmaster column
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS is_headmaster BOOLEAN DEFAULT false NOT NULL;
