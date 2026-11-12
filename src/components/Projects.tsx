import { useState, useEffect, type ReactNode } from 'react';
import {
  ExternalLink,
  Info,
  ImageIcon,
  X,
  Layers,
  Code2,
  ArrowUpRight,
  Loader2,
  Film,
} from 'lucide-react';
import { type Project, mapProjectRow } from '@/lib/types';
import type { ProjectMedia } from '@/lib/types';
import { useInView } from '@/hooks/useInView';
import ProjectGallery from '@/components/ProjectGallery';
import { fetchPublishedProjects } from '@/lib/projectApi';
import { PROJECTS as STATIC_PROJECTS } from '@/data/projects';

function useProjects() {
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    fetchPublishedProjects()
      .then((rows) => {
        const mapped = rows.map(mapProjectRow).filter((p) => p.images.length > 0);
        setProjects(mapped.length > 0 ? mapped : STATIC_PROJECTS);
      })
      .catch(() => {
        setProjects(STATIC_PROJECTS);
      });
  }, []);

  return projects;
}

interface ProjectCardProps {
  project: Project;
  onOpenGallery: (project: Project, index: number) => void;
  onOpenDetails: (project: Project) => void;
  delay: number;
}

function ProjectCard({ project, onOpenGallery, onOpenDetails, delay }: ProjectCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const hasVideo = project.images.some((m) => m.mediaType === 'video');
  const hasGif = project.images.some((m) => m.mediaType === 'gif');

  return (
    <article
      ref={ref}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-ink-900/40 transition-all duration-700 hover:border-brand-500/30 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image */}
      <button
        onClick={() => onOpenGallery(project, 0)}
        className="relative aspect-video w-full overflow-hidden"
        aria-label={`Abrir galeria de ${project.name}`}
      >
        {project.images[0].mediaType === 'video' ? (
          <video
            src={project.images[0].src}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            muted
            loop
            autoPlay
            playsInline
          />
        ) : (
          <img
            src={project.images[0].src}
            alt={project.images[0].alt}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
        <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-950/70 px-3 py-1 text-xs font-medium text-ink-200 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
          <ImageIcon className="h-3.5 w-3.5 text-brand-400" />
          {project.images.length} {hasVideo ? 'mídias' : 'capturas'}
        </div>
        <div className="absolute left-3 top-3 inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/15 px-2.5 py-1 text-xs font-semibold text-brand-300 backdrop-blur">
          {project.category}
        </div>
        {(hasVideo || hasGif) && (
          <div className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-300 backdrop-blur">
            {hasVideo && <Film className="h-3 w-3" />}
            {hasVideo ? 'Vídeo' : 'GIF'}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink-950/80 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
            <ImageIcon className="h-4 w-4 text-brand-400" />
            Ver galeria
          </span>
        </div>
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold text-white">{project.name}</h3>
            <p className="text-sm text-accent-400">{project.tagline}</p>
          </div>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-400">{project.description}</p>

        {/* Tech */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded-md border border-white/5 bg-white/5 px-2 py-0.5 font-mono text-xs text-ink-300"
            >
              <Code2 className="h-3 w-3 text-brand-400" />
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-2.5">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-400"
            >
              <ExternalLink className="h-4 w-4" />
              Ver projeto
            </a>
          )}
          <button
            onClick={() => onOpenDetails(project)}
            className={`${project.demoUrl ? 'flex-1' : 'w-full'} inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10`}
          >
            <Info className="h-4 w-4 text-accent-400" />
            Ver detalhes
          </button>
        </div>
      </div>
    </article>
  );
}

interface DetailModalProps {
  project: Project;
  onClose: () => void;
  onOpenGallery: (index: number) => void;
}

function DetailModal({ project, onClose, onOpenGallery }: DetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-xl sm:p-6"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-ink-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-ink-950/80 text-ink-300 transition-colors hover:bg-red-500/20 hover:text-red-400"
          aria-label="Fechar detalhes"
        >
          <X className="h-5 w-5" />
        </button>

        <button
          onClick={() => onOpenGallery(0)}
          className="relative block aspect-video w-full overflow-hidden rounded-t-2xl"
        >
          {project.images[0].mediaType === 'video' ? (
            <video
              src={project.images[0].src}
              className="h-full w-full object-cover object-top"
              muted
              loop
              autoPlay
              playsInline
            />
          ) : (
            <img
              src={project.images[0].src}
              alt={project.images[0].alt}
              className="h-full w-full object-cover object-top transition-transform hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <span className="inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/15 px-2.5 py-1 text-xs font-semibold text-brand-300">
                {project.category}
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">{project.name}</h3>
              <p className="text-sm text-accent-400">{project.tagline}</p>
            </div>
          </div>
        </button>

        <div className="p-6">
          <p className="text-sm leading-relaxed text-ink-300">{project.description}</p>

          <div className="mt-5">
            <p className="flex items-center gap-2 text-xs font-semibold text-ink-500">
              <Layers className="h-4 w-4 text-brand-400" />
              Tecnologias utilizadas
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-md border border-white/5 bg-white/5 px-2.5 py-1 font-mono text-xs text-ink-300"
                >
                  <Code2 className="h-3 w-3 text-brand-400" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="flex items-center gap-2 text-xs font-semibold text-ink-500">
              <ImageIcon className="h-4 w-4 text-brand-400" />
              Capturas de tela
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => onOpenGallery(i)}
                  className="group/img relative aspect-video overflow-hidden rounded-lg border border-white/5 transition-all hover:border-brand-500/30"
                >
                  {img.mediaType === 'video' ? (
                    <video src={img.src} className="h-full w-full object-cover object-top" muted />
                  ) : (
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover object-top transition-transform group-hover/img:scale-110"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-ink-950/60 opacity-0 transition-opacity group-hover/img:opacity-100">
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-400"
            >
              <ExternalLink className="h-4 w-4" />
              Visitar projeto
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const projects = useProjects();
  const [galleryState, setGalleryState] = useState<{ project: Project; index: number } | null>(null);
  const [detailProject, setDetailProject] = useState<Project | null>(null);

  const openGallery = (project: Project, index: number) => {
    setDetailProject(null);
    setGalleryState({ project, index });
  };

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-600/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeader>
          <p className="font-mono text-sm text-brand-400">// projetos</p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            Projetos que saíram do código e ganharam vida.
          </h2>
          <p className="mt-3 max-w-xl text-base text-ink-400">
            Conheça alguns dos sistemas, sites e soluções que desenvolvi.
          </p>
        </SectionHeader>

        {projects === null ? (
          <div className="mt-12 flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-brand-400" />
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenGallery={openGallery}
                onOpenDetails={setDetailProject}
                delay={i * 120}
              />
            ))}
          </div>
        )}
      </div>

      {detailProject && (
        <DetailModal
          project={detailProject}
          onClose={() => setDetailProject(null)}
          onOpenGallery={(index) => openGallery(detailProject, index)}
        />
      )}

      {galleryState && (
        <ProjectGallery
          images={galleryState.project.images}
          startIndex={galleryState.index}
          projectName={galleryState.project.name}
          onClose={() => setGalleryState(null)}
        />
      )}
    </section>
  );
}
