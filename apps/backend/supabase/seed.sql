-- Insert test users into auth.users table
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES
  ('00000000-0000-0000-0000-000000000000', 'c9c2d34e-7c3a-4f84-8c9c-9c7c3b4e5f6a', 'authenticated', 'authenticated', 'user1@test.com', crypt('test123!', gen_salt('bf')), NOW(), null, null, '{"provider":"email","providers":["email"]}', '{}', NOW(), NOW(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', 'd8d1e45f-8d4b-5e95-9d8d-8d8d4c5f6e7b', 'authenticated', 'authenticated', 'user2@test.com', crypt('test123!', gen_salt('bf')), NOW(), null, null, '{"provider":"email","providers":["email"]}', '{}', NOW(), NOW(), '', '', '', '');

-- Insert application users (matching auth.users IDs)
INSERT INTO public.user (id, created_at) VALUES
  ('c9c2d34e-7c3a-4f84-8c9c-9c7c3b4e5f6a', NOW()),
  ('d8d1e45f-8d4b-5e95-9d8d-8d8d4c5f6e7b', NOW());

-- Insert areas for each user
INSERT INTO public.Area (id, created_at, updated_at, name, description, user_id) VALUES
  ('a1b2c3d4-e5f6-4a5b-8c9d-1a2b3c4d5e6f', NOW(), NOW(), 'Work', 'Work-related projects and tasks', 'c9c2d34e-7c3a-4f84-8c9c-9c7c3b4e5f6a'),
  ('b2c3d4e5-f6a7-5b6c-9d0e-2b3c4d5e6f7a', NOW(), NOW(), 'Personal', 'Personal projects and goals', 'c9c2d34e-7c3a-4f84-8c9c-9c7c3b4e5f6a'),
  ('c3d4e5f6-a7b8-6c7d-0e1f-3c4d5e6f7a8b', NOW(), NOW(), 'Home', 'Home management and improvements', 'd8d1e45f-8d4b-5e95-9d8d-8d8d4c5f6e7b');

-- Insert projects for each area
INSERT INTO public.Project (id, created_at, updated_at, due_at, name, description, "order", user_id, status, area_id) VALUES
  -- Projects for User 1's Work Area
  ('d4e5f6a7-b8c9-7d8e-1f2a-4d5e6f7a8b9c', NOW(), NOW(), NOW() + interval '30 days', 'Q4 Planning', 'Strategic planning for Q4', 1, 'c9c2d34e-7c3a-4f84-8c9c-9c7c3b4e5f6a', 'In Progress', 'a1b2c3d4-e5f6-4a5b-8c9d-1a2b3c4d5e6f'),
  ('e5f6a7b8-c9d0-8e9f-2a3b-5e6f7a8b9c0d', NOW(), NOW(), NOW() + interval '60 days', 'Website Redesign', 'Company website overhaul', 2, 'c9c2d34e-7c3a-4f84-8c9c-9c7c3b4e5f6a', 'Planning', 'a1b2c3d4-e5f6-4a5b-8c9d-1a2b3c4d5e6f'),
  
  -- Projects for User 1's Personal Area
  ('f6a7b8c9-d0e1-9f0a-3b4c-6f7a8b9c0d1e', NOW(), NOW(), NOW() + interval '90 days', 'Fitness Goal', 'Personal fitness improvement plan', 1, 'c9c2d34e-7c3a-4f84-8c9c-9c7c3b4e5f6a', 'Active', 'b2c3d4e5-f6a7-5b6c-9d0e-2b3c4d5e6f7a'),
  
  -- Projects for User 2's Home Area
  ('a7b8c9d0-e1f2-0a1b-4c5d-7a8b9c0d1e2f', NOW(), NOW(), NOW() + interval '45 days', 'Kitchen Remodel', 'Kitchen renovation project', 1, 'd8d1e45f-8d4b-5e95-9d8d-8d8d4c5f6e7b', 'Planning', 'c3d4e5f6-a7b8-6c7d-0e1f-3c4d5e6f7a8b');

-- Insert tasks for each project
INSERT INTO public.Task (id, created_at, updated_at, due_at, name, description, "order", completed, project_id, parent_id) VALUES
  -- Tasks for Q4 Planning Project
  ('b8c9d0e1-f2a3-1b2c-5d6e-8b9c0d1e2f3a', NOW(), NOW(), NOW() + interval '7 days', 'Review Q3 Metrics', 'Analyze Q3 performance data', 1, false, 'd4e5f6a7-b8c9-7d8e-1f2a-4d5e6f7a8b9c', null),
  ('c9d0e1f2-a3b4-2c3d-6e7f-9c0d1e2f3a4b', NOW(), NOW(), NOW() + interval '14 days', 'Draft Strategy Document', 'Create Q4 strategy outline', 2, false, 'd4e5f6a7-b8c9-7d8e-1f2a-4d5e6f7a8b9c', null),
  
  -- Tasks for Website Redesign Project
  ('d0e1f2a3-b4c5-3d4e-7f8a-0d1e2f3a4b5c', NOW(), NOW(), NOW() + interval '30 days', 'Wireframe Design', 'Create website wireframes', 1, false, 'e5f6a7b8-c9d0-8e9f-2a3b-5e6f7a8b9c0d', null),
  
  -- Subtasks for Wireframe Design
  ('e1f2a3b4-c5d6-4e5f-8a9b-1e2f3a4b5c6d', NOW(), NOW(), NOW() + interval '25 days', 'Homepage Wireframe', 'Design homepage layout', 1, false, 'e5f6a7b8-c9d0-8e9f-2a3b-5e6f7a8b9c0d', 'd0e1f2a3-b4c5-3d4e-7f8a-0d1e2f3a4b5c'),
  ('f2a3b4c5-d6e7-5f6a-9b0c-2f3a4b5c6d7e', NOW(), NOW(), NOW() + interval '28 days', 'Product Page Wireframe', 'Design product page layout', 2, false, 'e5f6a7b8-c9d0-8e9f-2a3b-5e6f7a8b9c0d', 'd0e1f2a3-b4c5-3d4e-7f8a-0d1e2f3a4b5c'),
  
  -- Tasks for Fitness Goal Project
  ('a3b4c5d6-e7f8-6a7b-0c1d-3a4b5c6d7e8f', NOW(), NOW(), NOW() + interval '7 days', 'Create Workout Schedule', 'Plan weekly workout routine', 1, false, 'f6a7b8c9-d0e1-9f0a-3b4c-6f7a8b9c0d1e', null),
  
  -- Tasks for Kitchen Remodel Project
  ('b4c5d6e7-f8a9-7b8c-1d2e-4b5c6d7e8f9a', NOW(), NOW(), NOW() + interval '15 days', 'Get Contractor Quotes', 'Contact and compare contractors', 1, false, 'a7b8c9d0-e1f2-0a1b-4c5d-7a8b9c0d1e2f', null);