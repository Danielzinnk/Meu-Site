import { MessageCircle, Mail, Instagram, Github } from 'lucide-react';
import { whatsappLink, WHATSAPP_DISPLAY, WHATSAPP_LINK, EMAIL, INSTAGRAM, GITHUB } from '@/lib/contact';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink-950 py-12">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <a href="#home" className="inline-block">
              <img
                src="/banner.jpg"
                alt="DanielTech Dev"
                className="h-16 w-auto object-contain rounded-lg"
              />
            </a>
            <p className="mt-3 max-w-xs text-sm text-ink-400">
              Sites, automação e cardápios digitais feitos sob medida para o seu negócio.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 md:items-end">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 transition-all hover:bg-green-500/20"
            >
              <MessageCircle className="h-4 w-4" />
              {WHATSAPP_DISPLAY}
            </a>
            <div className="flex gap-3">
              <a href={`mailto:${EMAIL}`} className="grid h-10 w-10 place-items-center rounded-lg border border-white/5 bg-white/5 text-ink-300 transition-colors hover:text-white" aria-label="E-mail">
                <Mail className="h-4 w-4" />
              </a>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-lg border border-white/5 bg-white/5 text-ink-300 transition-colors hover:text-white" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-lg border border-white/5 bg-white/5 text-ink-300 transition-colors hover:text-white" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center">
          <p className="font-mono text-xs text-ink-500">
            © {new Date().getFullYear()} daniel.dev — feito com código e café
          </p>
        </div>
      </div>
    </footer>
  );
}
