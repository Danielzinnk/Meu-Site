import { supabase } from '@/lib/supabase';
import type { ProjectRow, ProjectMediaRow } from '@/lib/types';

export async function fetchPublishedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*, project_media(*)')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data as ProjectRow[];
}

export async function fetchAllProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*, project_media(*)')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data as ProjectRow[];
}

export async function fetchProjectMedia(projectId: string) {
  const { data, error } = await supabase
    .from('project_media')
    .select('*')
    .eq('project_id', projectId)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data as ProjectMediaRow[];
}

export async function createProject(input: {
  name: string;
  tagline: string;
  description: string;
  category: string;
  tech: string[];
  demo_url?: string | null;
  sort_order?: number;
  is_published?: boolean;
}) {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      name: input.name,
      tagline: input.tagline,
      description: input.description,
      category: input.category,
      tech: input.tech,
      demo_url: input.demo_url || null,
      sort_order: input.sort_order ?? 0,
      is_published: input.is_published ?? true,
    })
    .select()
    .single();

  if (error) throw error;
  return data as ProjectRow;
}

export async function updateProject(
  id: string,
  input: Partial<{
    name: string;
    tagline: string;
    description: string;
    category: string;
    tech: string[];
    demo_url: string | null;
    sort_order: number;
    is_published: boolean;
  }>
) {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as ProjectRow;
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}

const STORAGE_BUCKET = 'project-media';

function getMediaType(file: File): 'image' | 'video' | 'gif' {
  if (file.type === 'image/gif') return 'gif';
  if (file.type.startsWith('video/')) return 'video';
  return 'image';
}

export async function uploadMedia(
  projectId: string,
  file: File,
  caption?: string
): Promise<ProjectMediaRow> {
  const mediaType = getMediaType(file);
  const ext = file.name.split('.').pop() || 'bin';
  const fileName = `${projectId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = fileName;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  const url = urlData.publicUrl;

  const { count } = await supabase
    .from('project_media')
    .select('*', { count: 'exact', head: true })
    .eq('project_id', projectId);

  const { data, error } = await supabase
    .from('project_media')
    .insert({
      project_id: projectId,
      media_type: mediaType,
      storage_path: path,
      url,
      alt_text: caption || file.name,
      caption: caption || null,
      sort_order: count ?? 0,
    })
    .select()
    .single();

  if (error) throw error;
  return data as ProjectMediaRow;
}

export async function deleteMedia(mediaId: string, storagePath: string) {
  const { error: storageError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .remove([storagePath]);
  if (storageError) throw storageError;

  const { error } = await supabase.from('project_media').delete().eq('id', mediaId);
  if (error) throw error;
}

export async function reorderMedia(projectId: string, orderedIds: string[]) {
  const updates = orderedIds.map((id, index) =>
    supabase.from('project_media').update({ sort_order: index }).eq('id', id)
  );
  await Promise.all(updates);
}
