import { useState } from 'react';
import { X, Plus, Trash2, Film, Image as ImageIcon, FileType, Upload, Loader2, Eye, EyeOff, ExternalLink, Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import {
  fetchAllProjects,
  fetchProjectMedia,
  createProject,
  updateProject,
  deleteProject,
  uploadMedia,
  deleteMedia,
} from '@/lib/projectApi';
import { supabase } from '@/lib/supabase';
import type { ProjectRow, ProjectMediaRow } from '@/lib/types';

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const [projects, setProjects] = useState<ProjectRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectRow | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectRow | null>(null);

  const loadProjects = async () => {
    try {
      const data = await fetchAllProjects();
      setProjects(data);
    } catch (err) {
      console.error('Erro ao carregar projetos:', err);
    } finally {
      setLoading(false);
    }
  };

  if (projects === null && loading) {
    loadProjects();
  }

  if (selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        onBack={async () => {
          setSelectedProject(null);
          await loadProjects();
        }}
      />
    );
  }

  if (showForm) {
    return (
      <ProjectForm
        project={editingProject}
        onClose={() => {
          setShowForm(false);
          setEditingProject(null);
        }}
        onSaved={async () => {
          setShowForm(false);
          setEditingProject(null);
          await loadProjects();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-sm font-semibold text-white">
              daniel<span className="text-brand-400">.dev</span> / admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-ink-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Ver site
            </a>
            <button
              onClick={signOut}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-ink-300 transition-colors hover:bg-red-500/20 hover:text-red-400"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Projetos</h1>
            <p className="mt-1 text-sm text-ink-400">
              {projects?.length ?? 0} projeto(s) cadastrado(s)
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-400"
          >
            <Plus className="h-4 w-4" />
            Novo projeto
          </button>
        </div>

        {loading && (
          <div className="mt-12 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-brand-400" />
          </div>
        )}

        {!loading && projects && projects.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-white/10 bg-ink-900/40 p-12 text-center">
            <p className="text-ink-400">Nenhum projeto cadastrado ainda.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-400"
            >
              <Plus className="h-4 w-4" />
              Criar primeiro projeto
            </button>
          </div>
        )}

        {!loading && projects && projects.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-white/5 bg-ink-900/40 transition-all hover:border-brand-500/20"
              >
                {project.project_media && project.project_media.length > 0 ? (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.project_media[0].url}
                      alt={project.project_media[0].alt_text || project.name}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-ink-900/60">
                    <ImageIcon className="h-10 w-10 text-ink-700" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-base font-bold text-white">{project.name}</h3>
                      <p className="text-xs text-accent-400">{project.tagline}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                        project.is_published
                          ? 'bg-green-500/15 text-green-400'
                          : 'bg-ink-700/50 text-ink-400'
                      }`}
                    >
                      {project.is_published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {project.is_published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-ink-500">
                    <span className="rounded bg-white/5 px-2 py-0.5">{project.category}</span>
                    <span className="inline-flex items-center gap-1">
                      <ImageIcon className="h-3 w-3" />
                      {project.project_media?.length ?? 0} mídia(s)
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                    >
                      Gerenciar
                    </button>
                    <button
                      onClick={() => {
                        setEditingProject(project);
                        setShowForm(true);
                      }}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      Editar
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Excluir "${project.name}"? Isso remove todas as mídias.`)) {
                          try {
                            await deleteProject(project.id);
                            await loadProjects();
                          } catch (err) {
                            alert('Erro ao excluir: ' + (err instanceof Error ? err.message : 'desconhecido'));
                          }
                        }
                      }}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-ink-400 transition-colors hover:bg-red-500/20 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// PROJECT FORM
// ==========================================

interface ProjectFormProps {
  project: ProjectRow | null;
  onClose: () => void;
  onSaved: () => void;
}

function ProjectForm({ project, onClose, onSaved }: ProjectFormProps) {
  const [name, setName] = useState(project?.name ?? '');
  const [tagline, setTagline] = useState(project?.tagline ?? '');
  const [description, setDescription] = useState(project?.description ?? '');
  const [category, setCategory] = useState(project?.category ?? '');
  const [tech, setTech] = useState((project?.tech ?? []).join(', '));
  const [demoUrl, setDemoUrl] = useState(project?.demo_url ?? '');
  const [isPublished, setIsPublished] = useState(project?.is_published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setError('');
    setSaving(true);
    try {
      const techArray = tech.split(',').map((t) => t.trim()).filter(Boolean);
      const payload = {
        name,
        tagline,
        description,
        category,
        tech: techArray,
        demo_url: demoUrl || null,
        is_published: isPublished,
      };

      if (project) {
        await updateProject(project.id, payload);
      } else {
        await createProject(payload);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <h1 className="font-display text-lg font-bold text-white">
            {project ? 'Editar projeto' : 'Novo projeto'}
          </h1>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-sm text-ink-400 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" />
            Cancelar
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-8">
        <div className="space-y-5">
          <FormField label="Nome do projeto">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Ex: Vida de Pet"
            />
          </FormField>

          <FormField label="Subtítulo (tagline)">
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="form-input"
              placeholder="Ex: Sistema veterinário"
            />
          </FormField>

          <FormField label="Descrição">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="form-input resize-none"
              placeholder="Descreva o projeto..."
            />
          </FormField>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Categoria">
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
                placeholder="Ex: Sistema Web"
              />
            </FormField>

            <FormField label="Link de demonstração (opcional)">
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className="form-input"
                placeholder="https://..."
              />
            </FormField>
          </div>

          <FormField label="Tecnologias (separadas por vírgula)">
            <input
              type="text"
              value={tech}
              onChange={(e) => setTech(e.target.value)}
              className="form-input"
              placeholder="React, TypeScript, Supabase"
            />
          </FormField>

          <label className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPublished(!isPublished)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                isPublished ? 'bg-brand-500' : 'bg-ink-700'
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  isPublished ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span className="text-sm text-ink-300">
              {isPublished ? 'Publicado (visível no site)' : 'Rascunho (oculto no site)'}
            </span>
          </label>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-400 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? 'Salvando...' : 'Salvar projeto'}
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-ink-300 transition-colors hover:bg-white/10"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-300">{label}</label>
      {children}
    </div>
  );
}

// ==========================================
// PROJECT DETAIL — MEDIA MANAGER
// ==========================================

interface ProjectDetailProps {
  project: ProjectRow;
  onBack: () => void;
}

function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [media, setMedia] = useState<ProjectMediaRow[]>(project.project_media ?? []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = async (files: FileList | File[]) => {
    setUploading(true);
    setError('');
    try {
      const fileArray = Array.from(files);
      for (const file of fileArray) {
        await uploadMedia(project.id, file, '');
      }
      const updated = await fetchProjectMedia(project.id);
      setMedia(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no upload');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteMedia = async (mediaId: string, storagePath: string) => {
    try {
      await deleteMedia(mediaId, storagePath);
      setMedia((prev) => prev.filter((m) => m.id !== mediaId));
    } catch (err) {
      alert('Erro ao excluir: ' + (err instanceof Error ? err.message : 'desconhecido'));
    }
  };

  const handleUpdateCaption = async (mediaId: string, caption: string) => {
    try {
      const { error } = await supabase
        .from('project_media')
        .update({ caption, alt_text: caption })
        .eq('id', mediaId);
      if (error) throw error;
      setMedia((prev) =>
        prev.map((m) => (m.id === mediaId ? { ...m, caption, alt_text: caption } : m))
      );
    } catch (err) {
      alert('Erro: ' + (err instanceof Error ? err.message : 'desconhecido'));
    }
  };

  const mediaIcon = (type: string) => {
    if (type === 'video') return <Film className="h-4 w-4 text-brand-400" />;
    if (type === 'gif') return <FileType className="h-4 w-4 text-amber-400" />;
    return <ImageIcon className="h-4 w-4 text-accent-400" />;
  };

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm text-ink-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          <h1 className="font-display text-lg font-bold text-white">{project.name}</h1>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        {/* Project info summary */}
        <div className="mb-6 rounded-2xl border border-white/5 bg-ink-900/40 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold text-white">{project.name}</h2>
              <p className="text-sm text-accent-400">{project.tagline}</p>
              <p className="mt-2 text-sm text-ink-400">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 font-mono text-xs text-ink-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-300"
              >
                <ExternalLink className="h-4 w-4" />
                Demo
              </a>
            )}
          </div>
        </div>

        {/* Upload area */}
        <div
          className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
            dragOver
              ? 'border-brand-500/50 bg-brand-500/5'
              : 'border-white/10 bg-ink-900/40'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            if (e.dataTransfer.files.length > 0) {
              handleUpload(e.dataTransfer.files);
            }
          }}
        >
          <Upload className="mx-auto h-10 w-10 text-ink-600" />
          <p className="mt-3 text-sm text-ink-300">
            Arraste imagens, vídeos ou GIFs aqui
          </p>
          <p className="mt-1 text-xs text-ink-500">ou clique para selecionar arquivos</p>
          <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-400">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? 'Enviando...' : 'Selecionar arquivos'}
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleUpload(e.target.files);
                  e.target.value = '';
                }
              }}
            />
          </label>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Media list */}
        <div className="mt-8">
          <h3 className="mb-4 flex items-center gap-2 font-display text-base font-bold text-white">
            <ImageIcon className="h-5 w-5 text-brand-400" />
            Mídias ({media.length})
          </h3>

          {media.length === 0 ? (
            <p className="text-sm text-ink-500">Nenhuma mídia cadastrada. Faça upload acima.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {media.map((item, i) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-white/5 bg-ink-900/60"
                >
                  <div className="relative aspect-video overflow-hidden bg-ink-950">
                    {item.media_type === 'video' ? (
                      <video
                        src={item.url}
                        className="h-full w-full object-cover"
                        controls
                        muted
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.alt_text || ''}
                        className="h-full w-full object-cover object-top"
                      />
                    )}
                    <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/10 bg-ink-950/80 px-2 py-0.5 text-xs font-medium text-ink-200 backdrop-blur">
                      {mediaIcon(item.media_type)}
                      <span className="capitalize">{item.media_type}</span>
                    </div>
                    <span className="absolute right-2 top-2 rounded-full border border-white/10 bg-ink-950/80 px-2 py-0.5 text-xs text-ink-300 backdrop-blur">
                      #{i + 1}
                    </span>
                  </div>
                  <div className="p-3">
                    <input
                      type="text"
                      defaultValue={item.caption ?? ''}
                      placeholder="Legenda..."
                      onBlur={(e) => {
                        if (e.target.value !== (item.caption ?? '')) {
                          handleUpdateCaption(item.id, e.target.value);
                        }
                      }}
                      className="w-full rounded-lg border border-white/5 bg-ink-950/50 px-3 py-2 text-sm text-white placeholder-ink-600 outline-none focus:border-brand-500/30"
                    />
                    <button
                      onClick={() => handleDeleteMedia(item.id, item.storage_path)}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs text-red-400/70 transition-colors hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Excluir mídia
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
