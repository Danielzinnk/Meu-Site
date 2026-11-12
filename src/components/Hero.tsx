import { ArrowRight, MessageCircle, Sparkles, Brain } from 'lucide-react';
import { whatsappLink } from '@/lib/contact';

const TERMINAL_LINES = [
  { text: 'const daniel = {', color: 'text-ink-500' },
  { text: '  nome: "Daniel Dev",', color: 'text-ink-300' },
  { text: '  cargo: "Desenvolvedor",', color: 'text-ink-300' },
  { text: '  skills: ["sites", "automação",', color: 'text-ink-300' },
  { text: '    "cardápios", "NFC", "placas"],', color: 'text-ink-300' },
  { text: '  whatsapp: "(61) 98119-9161",', color: 'text-green-400' },
  { text: '  disponivel: true,', color: 'text-accent-400' },
  { text: '}', color: 'text-ink-500' },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="animate-float-slow absolute -left-20 top-20 h-72 w-72 rounded-full bg-brand-600/15 blur-[100px]" />
        <div className="animate-float-slower absolute right-0 top-60 h-96 w-96 rounded-full bg-accent-500/10 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Left: Text */}
          <div>
            <div className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-200">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Disponível para novos projetos · 2026
            </div>

            <h1 className="animate-fade-up font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl md:text-6xl" style={{ animationDelay: '0.1s' }}>
              Código que{' '}
              <span className="gradient-text">funciona</span>,
              <br className="hidden sm:block" /> design que{' '}
              <span className="text-amber-400">vende</span>.
            </h1>

            <p className="animate-fade-up mt-5 max-w-lg text-base leading-relaxed text-ink-400 sm:text-lg" style={{ animationDelay: '0.2s' }}>
              Sites, automações, cardápios digitais, cartões e placas NFC de
              avaliação e Instagram. Tudo sob medida — sem enrolação, só resultado.
            </p>

            <div className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '0.3s' }}>
              <a
                href={whatsappLink('Olá Daniel! Vi seu site e gostaria de pedir um projeto. Pode me ajudar?')}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-brand-500 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-brand-500/20 transition-all hover:bg-brand-400 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                Pedir meu projeto
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10 sm:w-auto"
              >
                O que eu faço
              </a>
            </div>

            <div className="animate-fade-up mt-10 flex items-center gap-6" style={{ animationDelay: '0.4s' }}>
              <div className="flex -space-x-2">
                {['bg-brand-500', 'bg-accent-500', 'bg-amber-500'].map((c, i) => (
                  <span key={i} className={`h-8 w-8 rounded-full border-2 border-ink-950 ${c}`} />
                ))}
              </div>
              <p className="text-sm text-ink-400">
                <span className="font-semibold text-white">+3 projetos</span> entregues
              </p>
            </div>
          </div>

          {/* Right: Terminal */}
          <div className="animate-fade-up relative" style={{ animationDelay: '0.35s' }}>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80 shadow-2xl shadow-black/40 backdrop-blur">
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 flex items-center gap-1.5 text-xs text-ink-500">
                  <Brain className="h-3 w-3" />
                  daniel-dev.ts
                </span>
              </div>
              {/* Code */}
              <div className="p-5 font-mono text-sm leading-relaxed">
                <div className="mb-3 text-xs text-ink-600">~ 2026</div>
                {TERMINAL_LINES.map((line, i) => (
                  <div key={i} className={line.color}>
                    {line.text}
                  </div>
                ))}
                <div className="mt-3 flex items-center gap-1 text-ink-600">
                  <span className="text-brand-400">$</span>
                  <span className="text-ink-300">iniciar projeto</span>
                  <span className="animate-blink ml-0.5 inline-block h-4 w-2 bg-brand-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
