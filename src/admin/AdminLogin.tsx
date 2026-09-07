/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import CentralNetLogo from '../components/CentralNetLogo';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function AdminLogin({ onSuccess, onCancel }: AdminLoginProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setErrorMsg('Por favor, informe o usuário e a senha.');
      return;
    }

    setErrorMsg(null);
    setLoading(true);

    const res = await login(username, password);
    setLoading(false);

    if (res.success) {
      onSuccess();
    } else {
      setErrorMsg(res.error || 'Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07111e] via-[#002d80] to-[#005CDC] flex flex-col justify-center items-center p-4 selection:bg-[#f26522] selection:text-white relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/15 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Card Container */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20">
          
          {/* Logo & Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="flex justify-center mb-2">
              <CentralNetLogo size="lg" theme="light" />
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#004ecc] rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
              <ShieldCheck size={14} className="text-[#004ecc]" />
              <span>Acesso Restrito</span>
            </div>
            
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-display">
              Painel Administrativo
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Entre com suas credenciais de gestão para gerenciar o conteúdo do site.
            </p>
          </div>

          {/* Feedback error message */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-shake">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Usuário ou E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ex: admin"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#004ecc] focus:border-transparent transition-all"
                  autoComplete="username"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha administrativa"
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#004ecc] focus:border-transparent transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-[#004ecc] to-[#005CDC] hover:from-[#003bb3] hover:to-[#004ecc] text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <>
                  <span>Entrar no Painel</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Quick info footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Sparkles size={13} className="text-[#f26522]" />
              <span>Sessão segura de 8h</span>
            </span>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer underline underline-offset-2"
              >
                Voltar ao site
              </button>
            )}
          </div>
        </div>

        {/* Security badge below card */}
        <p className="text-center text-[11px] text-white/60 mt-6 flex items-center justify-center gap-1.5 font-medium">
          <Lock size={12} />
          <span>Área segura restrita à equipe de suporte e gestão CentralNet.</span>
        </p>
      </div>
    </div>
  );
}
