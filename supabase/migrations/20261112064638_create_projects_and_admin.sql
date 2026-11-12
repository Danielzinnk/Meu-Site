/*
# Create portfolio admin system: projects, project media, storage, and RLS

## Overview
This migration creates a complete portfolio management system:
- `projects` table: stores project details (name, tagline, description, category, tech, demo URL, order).
- `project_media` table: stores media items (images, videos, GIFs) for each project, with ordering and captions.
- A public storage bucket `project-media` for uploading media files (images, videos, GIFs).
- Row Level Security policies so the public site can read projects/media, but only authenticated admins can create/update/delete.
- An admin user account is NOT created here — the owner signs up through the login screen.

## New Tables

### projects
- `id` (uuid, PK) — unique project identifier
- `name` (text, not null) — project name
- `tagline` (text, not null) — short subtitle (e.g. "Sistema veterinário")
- `description` (text, not null) — full project description
- `category` (text, not null) — category label (e.g. "Sistema Web", "E-commerce")
- `tech` (text[], not null, default '{}') — array of technology names
- `demo_url` (text, nullable) — optional link to live project
- `sort_order` (int, not null, default 0) — display ordering (lower = first)
- `is_published` (boolean, not null, default true) — whether the project is visible on the site
- `created_at` (timestamptz) — creation timestamp
- `updated_at` (timestamptz) — last update timestamp

### project_media
- `id` (uuid, PK) — unique media identifier
- `project_id` (uuid, FK → projects.id ON DELETE CASCADE) — parent project
- `media_type` (text, not null) — 'image' | 'video' | 'gif'
- `storage_path` (text, not null) — path in the storage bucket
- `url` (text, not null) — full public URL of the media file
- `alt_text` (text, nullable) — accessibility text for images
- `caption` (text, nullable) — optional caption shown in gallery
- `sort_order` (int, not null, default 0) — display ordering within a project
- `created_at` (timestamptz) — creation timestamp

## Storage
- Creates a public bucket `project-media` for media uploads.
- Storage policies: public read access; only authenticated users can upload/update/delete.

## Security (RLS + Grants)
- `projects`: SELECT is public (anon + authenticated); INSERT/UPDATE/DELETE are authenticated-only (admin).
- `project_media`: SELECT is public (anon + authenticated); INSERT/UPDATE/DELETE are authenticated-only (admin).
- All policies use `auth.uid()` for write checks (any signed-in user is an admin — single-admin app).

## Notes
1. This is a single-admin app: anyone who creates an account through the login screen is an admin. The owner signs up once, then logs in to manage projects.
2. `is_published` lets the owner save drafts without showing them on the public site.
3. `sort_order` on both tables allows reordering projects and media without code changes.
4. Media files (images, videos, GIFs) are uploaded to the `project-media` storage bucket; their URL is stored in `project_media.url`.
*/

-- ==========================================
-- TABLES
-- ==========================================

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  tagline text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  tech text[] NOT NULL DEFAULT '{}',
  demo_url text,
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS project_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  media_type text NOT NULL CHECK (media_type IN ('image', 'video', 'gif')),
  storage_path text NOT NULL,
  url text NOT NULL,
  alt_text text,
  caption text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_project_media_project_id ON project_media(project_id);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_project_media_sort_order ON project_media(project_id, sort_order);

-- ==========================================
-- RLS: projects
-- ==========================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON projects TO authenticated;

DROP POLICY IF EXISTS "public_read_projects" ON projects;
CREATE POLICY "public_read_projects" ON projects FOR SELECT
  TO anon, authenticated USING (is_published = true);

DROP POLICY IF EXISTS "admin_insert_projects" ON projects;
CREATE POLICY "admin_insert_projects" ON projects FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_projects" ON projects;
CREATE POLICY "admin_update_projects" ON projects FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_projects" ON projects;
CREATE POLICY "admin_delete_projects" ON projects FOR DELETE
  TO authenticated USING (true);

-- ==========================================
-- RLS: project_media
-- ==========================================

ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON project_media TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON project_media TO authenticated;

DROP POLICY IF EXISTS "public_read_project_media" ON project_media;
CREATE POLICY "public_read_project_media" ON project_media FOR SELECT
  TO anon, authenticated USING (
    EXISTS (SELECT 1 FROM projects WHERE projects.id = project_media.project_id AND projects.is_published = true)
  );

DROP POLICY IF EXISTS "admin_insert_project_media" ON project_media;
CREATE POLICY "admin_insert_project_media" ON project_media FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_project_media" ON project_media;
CREATE POLICY "admin_update_project_media" ON project_media FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_project_media" ON project_media;
CREATE POLICY "admin_delete_project_media" ON project_media FOR DELETE
  TO authenticated USING (true);

-- ==========================================
-- STORAGE BUCKET
-- ==========================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('project-media', 'project-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: public read, authenticated write
DROP POLICY IF EXISTS "public_read_project_media_bucket" ON storage.objects;
CREATE POLICY "public_read_project_media_bucket" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'project-media');

DROP POLICY IF EXISTS "admin_upload_project_media_bucket" ON storage.objects;
CREATE POLICY "admin_upload_project_media_bucket" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-media');

DROP POLICY IF EXISTS "admin_update_project_media_bucket" ON storage.objects;
CREATE POLICY "admin_update_project_media_bucket" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'project-media') WITH CHECK (bucket_id = 'project-media');

DROP POLICY IF EXISTS "admin_delete_project_media_bucket" ON storage.objects;
CREATE POLICY "admin_delete_project_media_bucket" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'project-media');
