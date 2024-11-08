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
  ('00000000-0000-0000-0000-000000000000', '3b6513a7-87a3-4e83-a3f4-1c247fc8088f', 'authenticated', 'authenticated', 'user1@test.com', crypt('test123!', gen_salt('bf')), NOW(), null, null, '{"provider":"email","providers":["email"]}', '{}', NOW(), NOW(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '44836706-c0a4-49d3-9d50-2f427f947fcc', 'authenticated', 'authenticated', 'user2@test.com', crypt('test123!', gen_salt('bf')), NOW(), null, null, '{"provider":"email","providers":["email"]}', '{}', NOW(), NOW(), '', '', '', '');

-- Insert application users (matching auth.users IDs)
INSERT INTO public.user (id, created_at) VALUES
  ('3b6513a7-87a3-4e83-a3f4-1c247fc8088f', NOW()),
  ('44836706-c0a4-49d3-9d50-2f427f947fcc', NOW());

-- Insert areas for each user
INSERT INTO public.Area (id, created_at, updated_at, name, description, user_id) VALUES
  ('8ed01e29-168f-45de-b77c-651e856ae35d', NOW(), NOW(), 'Work', 'Work-related projects and tasks', '3b6513a7-87a3-4e83-a3f4-1c247fc8088f'),
  ('54c692c9-384a-4d17-8620-1e6132a6f392', NOW(), NOW(), 'Personal', 'Personal projects and goals', '3b6513a7-87a3-4e83-a3f4-1c247fc8088f'),
  ('2314f2ba-f08f-464c-8b8f-823322162414', NOW(), NOW(), 'Home', 'Home management and improvements', '44836706-c0a4-49d3-9d50-2f427f947fcc');

-- Insert projects for each area
INSERT INTO public.Project (id, created_at, updated_at, due_at, name, description, "order", user_id, status, area_id) VALUES
  -- Projects for User 1's Work Area
  ('bec1407f-2b50-427b-92bf-d9aed16f4569', NOW(), NOW(), NOW() + interval '30 days', 'Q4 Planning', 'Strategic planning for Q4', 1, '3b6513a7-87a3-4e83-a3f4-1c247fc8088f', 'in_progress', '8ed01e29-168f-45de-b77c-651e856ae35d'),
  ('f5f59622-1f5f-472b-bd0b-62afbd8d38d6', NOW(), NOW(), NOW() + interval '60 days', 'Website Redesign', 'Company website overhaul', 2, '3b6513a7-87a3-4e83-a3f4-1c247fc8088f', 'not_started', '8ed01e29-168f-45de-b77c-651e856ae35d'),
  
  -- Projects for User 1's Personal Area
  ('4ecdbd52-4f36-4815-bbc9-ccf4c4a7cfd6', NOW(), NOW(), NOW() + interval '90 days', 'Fitness Goal', 'Personal fitness improvement plan', 1, '3b6513a7-87a3-4e83-a3f4-1c247fc8088f', 'in_progress', '54c692c9-384a-4d17-8620-1e6132a6f392'),
  
  -- Projects for User 2's Home Area
  ('c1f07f65-615a-4fcd-a7ae-45dc6cd07daa', NOW(), NOW(), NOW() + interval '45 days', 'Kitchen Remodel', 'Kitchen renovation project', 1, '44836706-c0a4-49d3-9d50-2f427f947fcc', 'not_started', '2314f2ba-f08f-464c-8b8f-823322162414');

-- Insert milestones for projects
INSERT INTO public.Milestone (id, created_at, updated_at, due_at, name, description, "order", status, project_id) VALUES
  ('c5b8dfe1-a551-4d65-b2e6-524b2b9a72af', NOW(), NOW(), NOW() + interval '15 days', 'Initial Planning', 'Complete initial planning phase', 1, 'not_started', 'bec1407f-2b50-427b-92bf-d9aed16f4569'),
  ('460b0441-6c5c-4659-83e2-120298c20f57', NOW(), NOW(), NOW() + interval '45 days', 'Design Phase', 'Complete website design', 1, 'not_started', 'f5f59622-1f5f-472b-bd0b-62afbd8d38d6');

-- Insert tasks for each project
INSERT INTO public.Task (id, created_at, updated_at, due_at, name, description, "order", status, project_id, milestone_id, parent_id) VALUES
  -- Tasks for Q4 Planning Project
  ('fa94e3fc-110b-444b-8064-6526cf46c996', NOW(), NOW(), NOW() + interval '7 days', 'Review Q3 Metrics', 'Analyze Q3 performance data', 1, 'not_started', 'bec1407f-2b50-427b-92bf-d9aed16f4569', 'c5b8dfe1-a551-4d65-b2e6-524b2b9a72af', null),
  ('9379dab6-36ed-48b1-a0bc-47e5ad1729b3', NOW(), NOW(), NOW() + interval '14 days', 'Draft Strategy Document', 'Create Q4 strategy outline', 2, 'not_started', 'bec1407f-2b50-427b-92bf-d9aed16f4569', null, null),
  
  -- Tasks for Website Redesign Project
  ('f4576df5-af4d-4e8a-bb44-5e8f4d0f7c06', NOW(), NOW(), NOW() + interval '30 days', 'Wireframe Design', 'Create website wireframes', 1, 'not_started', 'f5f59622-1f5f-472b-bd0b-62afbd8d38d6', '460b0441-6c5c-4659-83e2-120298c20f57', null),
  
  -- Subtasks for Wireframe Design
  ('1f16aee8-5128-4107-8a5a-3931bf8c37ab', NOW(), NOW(), NOW() + interval '25 days', 'Homepage Wireframe', 'Design homepage layout', 1, 'not_started', 'f5f59622-1f5f-472b-bd0b-62afbd8d38d6', null, 'f4576df5-af4d-4e8a-bb44-5e8f4d0f7c06'),
  ('b4cd8bbb-4248-47d2-bd2a-396237512139', NOW(), NOW(), NOW() + interval '28 days', 'Product Page Wireframe', 'Design product page layout', 2, 'not_started', 'f5f59622-1f5f-472b-bd0b-62afbd8d38d6', null, 'f4576df5-af4d-4e8a-bb44-5e8f4d0f7c06'),
  
  -- Tasks for Fitness Goal Project
  ('3e111135-fd49-479a-938f-5e0fa536f3e6', NOW(), NOW(), NOW() + interval '7 days', 'Create Workout Schedule', 'Plan weekly workout routine', 1, 'not_started', '4ecdbd52-4f36-4815-bbc9-ccf4c4a7cfd6', null, null),
  
  -- Tasks for Kitchen Remodel Project
  ('f5215ba8-7534-47c2-86a2-e3aedcb5c049', NOW(), NOW(), NOW() + interval '15 days', 'Get Contractor Quotes', 'Contact and compare contractors', 1, 'not_started', 'c1f07f65-615a-4fcd-a7ae-45dc6cd07daa', null, null);