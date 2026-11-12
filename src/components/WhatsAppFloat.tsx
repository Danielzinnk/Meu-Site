import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/contact';

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink('Olá Daniel! Vi seu site e gostaria de conversar.')}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-green-500 p-4 text-white shadow-2xl shadow-green-500/30 transition-all hover:bg-green-400 hover:shadow-green-500/50"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:opacity-100">
        Fale comigo
      </span>
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-300" />
      </span>
    </a>
  );
}
