import { Globe, Bot, UtensilsCrossed, ShoppingCart, Smartphone, Zap, Nfc, Instagram, ArrowRight } from 'lucide-react';
import { whatsappLink } from '@/lib/contact';

const SERVICES = [
  {
    icon: Globe,
    title: 'Sites Institucionais',
    desc: 'Sites profissionais, rápidos e responsivos para apresentar seu negócio com a melhor impressão.',
    features: ['Design moderno', 'Otimizado para Google', 'Mobile-first'],
    message: 'Olá Daniel! Quero um site institucional para meu negócio.',
    span: 'lg:col-span-2',
  },
  {
    icon: Bot,
    title: 'Automação',
    desc: 'Automatize tarefas repetitivas e integre suas ferramentas para economizar tempo e dinheiro.',
    features: ['Bots e fluxos', 'APIs e webhooks', 'Integração de sistemas'],
    message: 'Olá Daniel! Tenho interesse em automação para meu negócio.',
    span: '',
  },
  {
    icon: UtensilsCrossed,
    title: 'Cardápios Digitais',
    desc: 'Cardápio digital interativo com QR Code. Seus clientes pedem direto pelo celular.',
    features: ['QR Code na mesa', 'Pedidos pelo WhatsApp', 'Atualização fácil'],
    message: 'Olá Daniel! Quero um cardápio digital para meu restaurante.',
    span: '',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    desc: 'Loja virtual completa com carrinho, pagamentos e gestão de produtos.',
    features: ['Carrinho de compras', 'Pagamento online', 'Gestão de pedidos'],
    message: 'Olá Daniel! Quero criar uma loja virtual.',
    span: 'lg:col-span-2',
  },
  {
    icon: Smartphone,
    title: 'Landing Pages',
    desc: 'Páginas de conversão focadas em vender seu produto.',
    features: ['Alta conversão', 'Carregamento rápido'],
    message: 'Olá Daniel! Preciso de uma landing page de alta conversão.',
    span: '',
  },
  {
    icon: Nfc,
    title: 'Cartão NFC de Avaliação',
    desc: 'Cartão inteligente com chip NFC que direciona seu cliente direto para a tela de avaliação no Google.',
    features: ['Toque para avaliar', 'Mais avaliações no Google', 'Reutilizável'],
    message: 'Olá Daniel! Quero um cartão NFC de avaliação para meu negócio.',
    span: 'lg:col-span-2',
  },
  {
    icon: Instagram,
    title: 'Placa NFC Personalizada',
    desc: 'Placas físicas com NFC para Instagram e avaliações. Cliente encosta o celular e já te segue ou avalia.',
    features: ['NFC para Instagram', 'NFC para avaliação', 'Design personalizado'],
    message: 'Olá Daniel! Quero uma placa NFC personalizada para meu negócio.',
    span: '',
  },
  {
    icon: Zap,
    title: 'Otimização & SEO',
    desc: 'Melhore o desempenho e o posicionamento do seu site no Google.',
    features: ['Core Web Vitals', 'SEO técnico', 'Relatórios'],
    message: 'Olá Daniel! Quero otimizar meu site e melhorar no Google.',
    span: '',
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-sm text-brand-400">// serviços</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
              O que eu construo pra você
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-400">
            Cada projeto é feito do zero, sem template reusado. Escolha o que precisa e chama no WhatsApp.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-ink-900/40 p-6 transition-all duration-300 hover:border-brand-500/30 hover:bg-ink-900/70 ${service.span}`}
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-600/8 blur-2xl transition-opacity duration-300 group-hover:bg-brand-600/20" />
                <div className="relative flex h-full flex-col">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-brand-400" strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">{service.desc}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-1.5 text-xs text-ink-300">
                        <span className="h-1 w-1 rounded-full bg-accent-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappLink(service.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300"
                  >
                    Quero este
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
