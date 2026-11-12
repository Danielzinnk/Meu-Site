import { useState } from 'react';
import { MessageCircle, Send, Mail, Instagram, Github, CheckCircle2, Brain } from 'lucide-react';
import { whatsappLink, WHATSAPP_DISPLAY, EMAIL, INSTAGRAM, GITHUB } from '@/lib/contact';

const SERVICE_OPTIONS = [
  'Site institucional',
  'Automação',
  'Cardápio digital',
  'E-commerce',
  'Landing page',
  'Cartão NFC de avaliação',
  'Placa NFC personalizada',
  'Outro',
];

export default function Contact() {
  const [name, setName] = useState('');
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [details, setDetails] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const message = `Olá Daniel! Meu nome é ${name || '[nome]'}. Tenho interesse em: ${service}.${details ? ` Detalhes: ${details}` : ''}`;
    window.open(whatsappLink(message), '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <div className="text-center">
          <p className="font-mono text-sm text-brand-400">// contato</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
            Vamos tirar seu projeto do papel
          </h2>
          <p className="mt-4 text-ink-400">
            Me chama no WhatsApp ou preencha o formulário.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-[1fr_1.3fr]">
          {/* Contact info */}
          <div className="space-y-3">
            <a
              href={whatsappLink('Olá Daniel! Gostaria de conversar sobre um projeto.')}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-ink-900/50 p-5 transition-all hover:border-green-500/30 hover:bg-green-500/5"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-green-500/20 bg-green-500/10">
                <MessageCircle className="h-5 w-5 text-green-400" />
              </span>
              <div>
                <div className="text-xs text-ink-400">WhatsApp</div>
                <div className="text-sm font-semibold text-white">{WHATSAPP_DISPLAY}</div>
              </div>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-ink-900/50 p-5 transition-all hover:border-brand-500/30 hover:bg-brand-500/5"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-brand-500/20 bg-brand-500/10">
                <Mail className="h-5 w-5 text-brand-400" />
              </span>
              <div>
                <div className="text-xs text-ink-400">E-mail</div>
                <div className="text-sm font-semibold text-white">{EMAIL}</div>
              </div>
            </a>

            <div className="flex gap-3">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/5 bg-ink-900/50 py-4 text-sm font-medium text-ink-300 transition-all hover:text-white"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/5 bg-ink-900/50 py-4 text-sm font-medium text-ink-300 transition-all hover:text-white"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60">
            <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-2 flex items-center gap-1.5 text-xs text-ink-500">
                <Brain className="h-3 w-3" />
                novo-projeto.ts
              </span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-xs text-ink-400">
                  $ seu.nome
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Como posso te chamar?"
                  className="w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-ink-500 outline-none transition-colors focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20"
                  required
                />
              </div>

              <div>
                <label htmlFor="service" className="mb-2 block font-mono text-xs text-ink-400">
                  $ tipo.de.projeto
                </label>
                <select
                  id="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-ink-900">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="details" className="mb-2 block font-mono text-xs text-ink-400">
                  $ detalhes (opcional)
                </label>
                <textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={3}
                  placeholder="Conte um pouco sobre o que você precisa..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-ink-500 outline-none transition-colors focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              <button
                type="submit"
                className={`flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all ${
                  sent
                    ? 'bg-green-500 text-white'
                    : 'bg-brand-500 text-white shadow-lg shadow-brand-500/25 hover:bg-brand-400'
                }`}
              >
                {sent ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    Abrindo WhatsApp...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Enviar pelo WhatsApp
                  </>
                )}
              </button>
              <p className="text-center text-xs text-ink-500">
                Você será redirecionado para o WhatsApp com a mensagem pronta.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
