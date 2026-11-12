import { Star, Quote } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const TESTIMONIALS = [
  {
    name: 'Thyerry Manoel',
    role: 'Clínica Veterinária',
    text: 'O site que o Daniel fez para minha clínica veterinária mudou completamente a forma como meus clientes agendam consultas. Profissional e entregou antes do prazo!',
    rating: 5,
  },
  {
    name: 'Adalberto Lima',
    role: 'Restaurante',
    text: 'Cardápio digital moderno e fácil de usar. Meus clientes elogiam muito e as pedidas aumentaram. Excelente trabalho! Eliminou os cardápios impressos.',
    rating: 5,
  },
  {
    name: 'Eduarda Royal Havaianas',
    role: 'Loja de Calçados',
    text: 'O sistema de cartões NFC de avaliação foi um sucesso. Nossos clientes adoraram e o feedback melhorou muito. Recomendo demais!',
    rating: 5,
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-600/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <p className="font-mono text-sm text-brand-400">// depoimentos</p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            O que meus clientes dizem
          </h2>
          <p className="mt-3 max-w-xl text-base text-ink-400">
            Histórias reais de quem já trabalhou comigo e transformou seu negócio.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: typeof TESTIMONIALS[0];
  delay: number;
}

function TestimonialCard({ testimonial, delay }: TestimonialCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-ink-900/40 p-6 transition-all duration-700 hover:border-brand-500/20 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Quote className="absolute right-4 top-4 h-8 w-8 text-brand-500/20" />

      <div className="mb-4 flex gap-0.5">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="text-sm leading-relaxed text-ink-300">{testimonial.text}</p>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/20 text-brand-300 font-semibold">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{testimonial.name}</p>
          <p className="text-xs text-ink-400">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
