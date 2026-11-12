export interface ProjectMediaRow {
  id: string;
  project_id: string;
  media_type: 'image' | 'video' | 'gif';
  storage_path: string;
  url: string;
  alt_text: string | null;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface ProjectRow {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tech: string[];
  demo_url: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  project_media?: ProjectMediaRow[];
}

export interface ProjectMedia {
  src: string;
  alt: string;
  caption?: string;
  mediaType: 'image' | 'video' | 'gif';
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tech: string[];
  demoUrl?: string;
  images: ProjectMedia[];
}

export function mapProjectRow(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    category: row.category,
    tech: row.tech ?? [],
    demoUrl: row.demo_url ?? undefined,
    images: (row.project_media ?? [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((m) => ({
        src: m.url,
        alt: m.alt_text ?? m.caption ?? '',
        caption: m.caption ?? undefined,
        mediaType: m.media_type,
      })),
  };
}
