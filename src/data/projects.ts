import type { Project } from '@/lib/types';

export const PROJECTS: Project[] = [
  {
    id: 'vida-de-pet',
    name: 'Vida de Pet',
    tagline: 'Sistema veterinário',
    description:
      'Sistema completo para clínicas veterinárias com gestão de pacientes, agendamento de consultas, prontuário digital, controle de vacinas e histórico de cada animal. Feito para facilitar o dia a dia da equipe e melhorar o atendimento aos tutores.',
    category: 'Sistema Web',
    tech: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    demoUrl: undefined,
    images: [
      { src: '/projetos/vida-de-pet/01-dashboard.png', alt: 'Vida de Pet — Painel principal', caption: 'Painel principal com visão geral', mediaType: 'image' },
      { src: '/projetos/vida-de-pet/02-pacientes.png', alt: 'Vida de Pet — Gestão de pacientes', caption: 'Cadastro e gestão de pacientes', mediaType: 'image' },
      { src: '/projetos/vida-de-pet/03-prontuario.png', alt: 'Vida de Pet — Prontuário digital', caption: 'Prontuário digital do animal', mediaType: 'image' },
    ],
  },
  {
    id: 'cardapio-restaurante',
    name: 'Sabor & Arte',
    tagline: 'Cardápio digital',
    description:
      'Cardápio digital moderno para restaurante com QR code, fotos de pratos, filtros por categoria e integração com WhatsApp para pedidos. Eliminou os cardápios impressos e aumentou o ticket médio em 25%.',
    category: 'Cardápio Digital',
    tech: ['React', 'Tailwind CSS', 'QR Code', 'WhatsApp API'],
    demoUrl: undefined,
    images: [
      { src: '/projetos/cardapio-restaurante/01-home.png', alt: 'Sabor & Arte — Tela inicial', caption: 'Tela inicial do cardápio', mediaType: 'image' },
      { src: '/projetos/cardapio-restaurante/02-prato.png', alt: 'Sabor & Arte — Detalhe do prato', caption: 'Detalhes do prato com foto', mediaType: 'image' },
      { src: '/projetos/cardapio-restaurante/03-pedido.png', alt: 'Sabor & Arte — Pedido por WhatsApp', caption: 'Pedido enviado pelo WhatsApp', mediaType: 'image' },
    ],
  },
  {
    id: 'placas-nfc',
    name: 'Royal Havaianas',
    tagline: 'Sistema NFC de avaliação',
    description:
      'Sistema de cartões e placas NFC para avaliação de atendimento. Cliente toca o cartão/placa e envia avaliação automática pelo WhatsApp. Dashboard completo com métricas e feedback em tempo real.',
    category: 'NFC & Automação',
    tech: ['NFC', 'WhatsApp API', 'React', 'Supabase'],
    demoUrl: undefined,
    images: [
      { src: '/projetos/placas-nfc/01-placa.png', alt: 'Royal Havaianas — Placa NFC', caption: 'Placa NFC de avaliação', mediaType: 'image' },
      { src: '/projetos/placas-nfc/02-cartao.png', alt: 'Royal Havaianas — Cartão NFC', caption: 'Cartão NFC personalizado', mediaType: 'image' },
      { src: '/projetos/placas-nfc/03-dashboard.png', alt: 'Royal Havaianas — Dashboard', caption: 'Dashboard de avaliações', mediaType: 'image' },
    ],
  },
];
