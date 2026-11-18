import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { whatsappLink } from '@/lib/contact';

function TypingLogo() {
  const [text, setText] = useState('');
  const fullText = 'Daniel.Dev';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-base font-semibold tracking-tight">
      {text.slice(0, 6)}<span className="text-brand-400">{text.slice(6)}</span>
      <span className="animate-pulse">|</span>
    </span>
  );
}

const NAV_LINKS = [
  { label: 'Início', href: '#home' },
  { label: 'Serviços', href: '#services' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Processo', href: '#process' },
  { label: 'Sobre', href: '#about' },
  { label: 'Contato', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    if (newCount >= 3) {
      window.location.href = '/admin';
      setClickCount(0);
      return;
    }
    setClickCount(newCount);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/5 bg-ink-950/80 py-3 backdrop-blur-xl'
          : 'border-b border-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <a href="#home" onClick={handleLogoClick} className="flex items-center cursor-pointer">
          <img
            src="/logo.png"
            alt="DanielTech Dev"
            className="h-12 w-auto object-contain"
          />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-ink-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={whatsappLink('Olá Daniel! Vi seu site e gostaria de conversar sobre um projeto.')}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-lg border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-300 transition-all hover:bg-brand-500/20 hover:text-brand-200 md:inline-flex"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          Contratar
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-navigation" className="md:hidden">
          <div className="mx-5 mt-3 rounded-2xl border border-white/5 bg-ink-900/95 p-4 backdrop-blur-xl">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-ink-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink('Olá Daniel! Vi seu site e gostaria de conversar sobre um projeto.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 block rounded-xl bg-brand-500 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Contratar agora
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
