import { useState } from 'react';
import { Brain, Mail, Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminLogin() {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setSuccess('Conta criada com sucesso! Faça login.');
        setMode('login');
      } else if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        setSuccess('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao autenticar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-5">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-600/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <a
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-ink-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao site
        </a>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-2.5 border-b border-white/5 px-5 py-4">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-brand-500/30 bg-brand-500/10">
              <Brain className="h-5 w-5 text-brand-400" strokeWidth={2.5} />
            </span>
            <div>
              <p className="font-mono text-sm font-semibold text-white">
                Daniel<span className="text-brand-400">.Dev</span> / admin
              </p>
              <p className="text-xs text-ink-500">Painel de gestão de projetos</p>
            </div>
          </div>

          <div className="p-6">
            <h1 className="font-display text-xl font-bold text-white">
              {mode === 'login' ? 'Entrar' : mode === 'signup' ? 'Criar conta' : 'Recuperar senha'}
            </h1>
            <p className="mt-1 text-sm text-ink-400">
              {mode === 'login'
                ? 'Acesse para gerenciar seus projetos.'
                : mode === 'signup'
                ? 'Crie sua conta de administrador (apenas na primeira vez).'
                : 'Digite seu e-mail para receber link de recuperação.'}
            </p>

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-400">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-ink-950/50 py-3 pl-10 pr-4 text-sm text-white placeholder-ink-600 outline-none transition-colors focus:border-brand-500/50 focus:bg-ink-950/80"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              {mode !== 'reset' && (
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-ink-400">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
                    <input
                      type="password"
                      required={mode !== 'reset'}
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-ink-950/50 py-3 pl-10 pr-4 text-sm text-white placeholder-ink-600 outline-none transition-colors focus:border-brand-500/50 focus:bg-ink-950/80"
                      placeholder="Mínimo 6 caracteres"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-400 disabled:opacity-50"
              >
                {loading ? 'Aguarde...' : mode === 'login' ? 'Entrar' : mode === 'signup' ? 'Criar conta' : 'Enviar e-mail'}
              </button>
            </form>

            <div className="mt-4 space-y-2">
              {mode === 'login' && (
                <>
                  <button
                    onClick={() => {
                      setMode('reset');
                      setError('');
                      setSuccess('');
                    }}
                    className="w-full text-center text-xs text-ink-400 transition-colors hover:text-white"
                  >
                    Esqueceu a senha? Recuperar
                  </button>
                  <button
                    onClick={() => {
                      setMode('signup');
                      setError('');
                      setSuccess('');
                    }}
                    className="w-full text-center text-xs text-ink-400 transition-colors hover:text-white"
                  >
                    Primeira vez? Criar conta de administrador
                  </button>
                </>
              )}

              {mode === 'signup' && (
                <button
                  onClick={() => {
                    setMode('login');
                    setError('');
                    setSuccess('');
                  }}
                  className="w-full text-center text-xs text-ink-400 transition-colors hover:text-white"
                >
                  Já tem conta? Fazer login
                </button>
              )}

              {mode === 'reset' && (
                <button
                  onClick={() => {
                    setMode('login');
                    setError('');
                    setSuccess('');
                  }}
                  className="w-full text-center text-xs text-ink-400 transition-colors hover:text-white"
                >
                  Voltar para login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
