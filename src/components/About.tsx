import { Rocket, Code2, Heart, Coffee } from 'lucide-react';
import { whatsappLink } from '@/lib/contact';

const SKILLS = [
  'React', 'TypeScript', 'Next.js', 'Tailwind CSS',
  'Node.js', 'Supabase', 'PostgreSQL', 'Python',
  'Automação', 'APIs REST', 'SEO', 'UI/UX',
  'NFC', 'Cartões NFC', 'Placas NFC', 'Instagram',
];

const VALUES = [
  { icon: Rocket, title: 'Entrega rápida', desc: 'Seu projeto no ar sem enrolação.' },
  { icon: Code2, title: 'Código limpo', desc: 'Soluções escaláveis e bem feitas.' },
  { icon: Heart, title: 'Suporte dedicado', desc: 'Acompanhamento após a entrega.' },
  { icon: Coffee, title: 'Preço justo', desc: 'Soluções que cabem no seu bolso.' },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl px-5">
        {/* Tech marquee */}
        <div className="relative mb-16 overflow-hidden border-y border-white/5 py-5">
          <div className="flex animate-marquee gap-8 whitespace-nowrap">
            {[...SKILLS, ...SKILLS].map((skill, i) => (
              <span key={i} className="font-mono text-sm font-medium text-ink-600">
                {skill}
                <span className="ml-8 text-brand-500/40">/</span>
              </span>
            ))}
          </div>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-mono text-sm text-brand-400">// sobre</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
              Prazer, sou o Daniel
            </h2>
            <p className="mt-5 text-ink-300 leading-relaxed">
              Trabalho criando sites, automações, cardápios digitais, cartões e placas
              NFC de avaliação e Instagram. Tudo para ajudar empresas a venderem mais e
              gastarem menos tempo com processos manuais. Cada projeto é feito sob
              medida, pensado para o seu objetivo e com suporte de verdade.
            </p>
            <p className="mt-4 text-ink-300 leading-relaxed">
              Se você precisa de uma presença online profissional ou quer automatizar
              algo que toma seu tempo, me chama — vamos conversar.
            </p>

            <a
              href={whatsappLink('Olá Daniel! Vi seu site e quero conversar sobre um projeto.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-400"
            >
              Vamos conversar
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className={`rounded-2xl border border-white/5 bg-ink-900/40 p-6 transition-all hover:border-brand-500/20 ${
                    i % 2 === 1 ? 'sm:translate-y-6' : ''
                  }`}
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-500/20 bg-brand-500/10">
                    <Icon className="h-5 w-5 text-brand-400" strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-base font-bold text-white">{value.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-400">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
