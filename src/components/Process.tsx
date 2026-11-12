import { MessageSquare, PencilRuler, Code2, Rocket } from 'lucide-react';

const STEPS = [
  {
    icon: MessageSquare,
    num: '01',
    title: 'Conversa',
    desc: 'Você me chama no WhatsApp, conta sua ideia e eu entendo o que você precisa.',
  },
  {
    icon: PencilRuler,
    num: '02',
    title: 'Planejamento',
    desc: 'Defino escopo, prazo e preço. Tudo combinado antes de começar — sem surpresa.',
  },
  {
    icon: Code2,
    num: '03',
    title: 'Desenvolvimento',
    desc: 'Construo seu projeto com código limpo. Você acompanha o progresso de perto.',
  },
  {
    icon: Rocket,
    num: '04',
    title: 'Entrega',
    desc: 'Projeto no ar, testado e funcionando. Suporte depois da entrega incluído.',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-30" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="text-center">
          <p className="font-mono text-sm text-brand-400">// processo</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
            Do primeiro "oi" ao projeto no ar
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="relative">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-full top-12 hidden h-px w-full -translate-x-3 bg-gradient-to-r from-white/10 to-transparent lg:block" />
                )}
                <div className="relative rounded-2xl border border-white/5 bg-ink-900/40 p-6 transition-all hover:border-brand-500/20">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10">
                      <Icon className="h-5 w-5 text-brand-400" strokeWidth={2} />
                    </span>
                    <span className="font-mono text-2xl font-bold text-white/10">{step.num}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
