import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const FAQ_ITEMS = [
  {
    question: 'Quanto custa um site?',
    answer: 'O valor varia conforme o projeto. Site institucional a partir de R$1.500, cardápio digital a partir de R$800, e-commerce a partir de R$3.000. Cada orçamento é personalizado de acordo com suas necessidades.',
  },
  {
    question: 'Quanto tempo demora para ficar pronto?',
    answer: 'Depende da complexidade. Sites simples ficam prontos em 3-7 dias, projetos médios em 1-2 semanas, e sistemas mais complexos em 2-4 semanas. Sempre com prazo combinado antes de começar.',
  },
  {
    question: 'Você faz manutenção depois de pronto?',
    answer: 'Sim! Ofereço pacotes de manutenção mensal para atualizações, correções e melhorias. Também posso te ensinar a fazer alterações básicas você mesmo.',
  },
  {
    question: 'O site fica otimizado para celular?',
    answer: 'Sim, todos os meus projetos são 100% responsivos e funcionam perfeitamente em celulares, tablets e computadores. Isso é essencial hoje em dia.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer: 'Geralmente 50% de entrada para começar e 50% na entrega. Aceito PIX, transferência bancária e cartão de crédito. Flexível para ajustar conforme sua preferência.',
  },
  {
    question: 'Você fornece domínio e hospedagem?',
    answer: 'Posso ajudar a configurar domínio (.com.br ou outro) e hospedagem (Vercel é gratuito e excelente). Você paga apenas o domínio anualmente (~R$40).',
  },
  {
    question: 'Posso fazer alterações depois de pronto?',
    answer: 'Claro! Você pode alterar textos, imagens e informações. Se precisar de mudanças estruturais, posso ajudar com manutenção ou te dar treinamento.',
  },
  {
    question: 'Você integra com outros sistemas?',
    answer: 'Sim, integro com WhatsApp, Instagram, sistemas de pagamento (Pix, cartão), CRMs, e-mail marketing e muito mais. Tudo de acordo com sua necessidade.',
  },
];

export default function FAQ() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-accent-500/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5">
        <div
          ref={ref}
          className={`mb-12 text-center transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <p className="font-mono text-sm text-brand-400">// dúvidas</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-base text-ink-400">
            Tudo que você precisa saber antes de começar seu projeto.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={i} item={item} delay={i * 50} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FAQItemProps {
  item: typeof FAQ_ITEMS[0];
  delay: number;
}

function FAQItem({ item, delay }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-2xl border border-white/5 bg-ink-900/40 transition-all duration-700 hover:border-white/10 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-brand-400 shrink-0" />
          <span className="text-sm font-semibold text-white">{item.question}</span>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-ink-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm leading-relaxed text-ink-300 pl-8">{item.answer}</p>
        </div>
      )}
    </div>
  );
}
