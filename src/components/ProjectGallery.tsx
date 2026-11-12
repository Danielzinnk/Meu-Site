import { useCallback, useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import type { ProjectMedia } from '@/lib/types';

interface ProjectGalleryProps {
  images: ProjectMedia[];
  startIndex: number;
  projectName: string;
  onClose: () => void;
}

export default function ProjectGallery({ images, startIndex, projectName, onClose }: ProjectGalleryProps) {
  const [index, setIndex] = useState(startIndex);
  const [zoomed, setZoomed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  const total = images.length;
  const current = images[index];
  const isVideo = current?.mediaType === 'video';

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
    setZoomed(false);
    setOffset({ x: 0, y: 0 });
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
    setZoomed(false);
    setOffset({ x: 0, y: 0 });
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [goPrev, goNext, onClose]);

  const toggleZoom = () => {
    if (isVideo) return;
    setZoomed((z) => !z);
    if (zoomed) setOffset({ x: 0, y: 0 });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!zoomed) return;
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!zoomed || !dragStart) return;
    setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const onMouseUp = () => setDragStart(null);

  const thumbnailContent = (media: ProjectMedia) => {
    if (media.mediaType === 'video') {
      return <video src={media.src} className="h-full w-full object-cover" muted />;
    }
    return <img src={media.src} alt={media.alt} className="h-full w-full object-cover" />;
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-ink-950/95 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={`Galeria de imagens — ${projectName}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div>
          <p className="font-mono text-sm text-brand-400">{projectName}</p>
          <p className="text-xs text-ink-500">
            {index + 1} / {total}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isVideo && (
            <button
              onClick={toggleZoom}
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={zoomed ? 'Diminuir zoom' : 'Aumentar zoom'}
            >
              {zoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
            </button>
          )}
          <a
            href={current.src}
            download
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Abrir em tela cheia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Maximize2 className="h-5 w-5" />
          </a>
          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-ink-300 transition-colors hover:bg-red-500/20 hover:text-red-400"
            aria-label="Fechar galeria"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Media area */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ cursor: zoomed && !isVideo ? (dragStart ? 'grabbing' : 'grab') : 'default' }}
      >
        {total > 1 && (
          <button
            onClick={goPrev}
            className="absolute left-4 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-ink-900/80 text-white transition-all hover:bg-brand-500/20 hover:border-brand-500/40"
            aria-label="Mídia anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div
          className="flex max-h-full max-w-full items-center justify-center px-16"
          style={{
            transform: isVideo ? 'none' : `scale(${zoomed ? 2 : 1}) translate(${offset.x / (zoomed ? 2 : 1)}px, ${offset.y / (zoomed ? 2 : 1)}px)`,
            transition: dragStart ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {isVideo ? (
            <video
              src={current.src}
              className="max-h-[72vh] max-w-full rounded-lg object-contain shadow-2xl"
              controls
              autoPlay
              playsInline
            />
          ) : (
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[72vh] max-w-full rounded-lg object-contain shadow-2xl"
              draggable={false}
            />
          )}
        </div>

        {total > 1 && (
          <button
            onClick={goNext}
            className="absolute right-4 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-ink-900/80 text-white transition-all hover:bg-brand-500/20 hover:border-brand-500/40"
            aria-label="Próxima mídia"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Caption */}
      {current.caption && (
        <div className="border-t border-white/5 px-5 py-3 text-center">
          <p className="text-sm text-ink-300">{current.caption}</p>
        </div>
      )}

      {/* Thumbnails */}
      {total > 1 && (
        <div className="border-t border-white/5 px-5 py-4">
          <div className="flex justify-center gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => {
                  setIndex(i);
                  setZoomed(false);
                  setOffset({ x: 0, y: 0 });
                }}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  i === index
                    ? 'border-brand-400 opacity-100'
                    : 'border-white/5 opacity-50 hover:opacity-80'
                }`}
                aria-label={`Ver mídia ${i + 1}`}
              >
                {thumbnailContent(img)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
