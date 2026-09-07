/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Save, Loader2, Check, AlertCircle, Shield, AlertTriangle, KeyRound, Sparkles, Building2, Database } from 'lucide-react';
import { useCMS, GeneralSettings } from '../context/CMSContext';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';

export default function AdminConfiguracoes() {
  const { data, saveGeneralSettings, isLoading } = useCMS();
  const { updatePassword } = useAuth();

  const [config, setConfig] = useState<GeneralSettings>({ ...data.configuracoes });
  const [configFeedback, setConfigFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setConfigFeedback(null);
    const ok = await saveGeneralSettings(config);
    if (ok) {
      setConfigFeedback({ type: 'success', message: 'Configurações gerais salvas com sucesso!' });
      setTimeout(() => setConfigFeedback(null), 4000);
    } else {
      setConfigFeedback({ type: 'error', message: 'Não foi possível salvar as configurações. Tente novamente.' });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordFeedback(null);

    if (newPassword !== confirmPassword) {
      setPasswordFeedback({ type: 'error', message: 'A confirmação da nova senha não confere.' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordFeedback({ type: 'error', message: 'A nova senha deve possuir pelo menos 6 caracteres.' });
      return;
    }

    setPasswordLoading(true);
    const res = await updatePassword(oldPassword, newPassword);
    setPasswordLoading(false);

    if (res.success) {
      setPasswordFeedback({ type: 'success', message: 'Senha administrativa alterada com sucesso!' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordFeedback(null), 4000);
    } else {
      setPasswordFeedback({ type: 'error', message: res.error || 'Não foi possível alterar a senha.' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
          Configurações Gerais & Segurança
        </h1>
        <p className="text-xs text-slate-500">
          Controle flags do site (manutenção, avisos promocionais), banco de dados e alteração de senha de acesso.
        </p>
      </div>

      {/* DATABASE STATUS CARD */}
      <div className={`rounded-3xl p-6 border transition-all ${
        isSupabaseConfigured 
          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
          : 'bg-blue-50/70 border-blue-200 text-blue-900'
      }`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
              isSupabaseConfigured ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
            }`}>
              <Database size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm uppercase tracking-wider font-display">
                  Banco de Dados: {isSupabaseConfigured ? 'Supabase Conectado' : 'Modo Offline / LocalStorage'}
                </h3>
                <span className={`w-2 h-2 rounded-full ${
                  isSupabaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'
                }`} />
              </div>
              <p className="text-xs mt-1 text-slate-600 leading-relaxed">
                {isSupabaseConfigured 
                  ? 'Todas as alterações feitas no painel são salvas e sincronizadas instantaneamente no PostgreSQL do Supabase na nuvem.' 
                  : 'Para sincronizar na nuvem, adicione as chaves VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env ou no painel da Vercel.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: FLAGS DE OPERAÇÃO DO SITE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#f26522] flex items-center justify-center">
            <AlertTriangle size={16} />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 font-display">
              Operação e Banners de Alerta
            </h2>
            <p className="text-[11px] text-slate-400">
              Ative ou desative avisos no topo do site público.
            </p>
          </div>
        </div>

        {configFeedback && (
          <div
            className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2.5 ${
              configFeedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {configFeedback.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
            <span>{configFeedback.message}</span>
          </div>
        )}

        <form onSubmit={handleSaveConfig} className="space-y-6">
          
          {/* Maintenance Mode Toggle */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-900 block">
                  Modo Manutenção
                </span>
                <p className="text-[11px] text-amber-700">
                  Exibe um banner discreto informando aos clientes que a equipe está em melhorias.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.siteEmManutencao}
                  onChange={(e) => setConfig({ ...config, siteEmManutencao: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>

            {config.siteEmManutencao && (
              <div>
                <label className="block text-[11px] font-bold text-amber-900 uppercase mb-1">
                  Mensagem aos Usuários
                </label>
                <input
                  type="text"
                  value={config.mensagemManutencao}
                  onChange={(e) => setConfig({ ...config, mensagemManutencao: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-amber-200 rounded-xl text-xs text-slate-900 font-semibold"
                />
              </div>
            )}
          </div>

          {/* Top Promotional Bar Toggle */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-blue-900 block">
                  Faixa Promocional no Topo
                </span>
                <p className="text-[11px] text-blue-700">
                  Exibe uma faixa colorida no topo da página anunciando campanhas especiais.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.exibirAvisoPromocional}
                  onChange={(e) => setConfig({ ...config, exibirAvisoPromocional: e.target.value })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004ecc]"></div>
              </label>
            </div>

            {config.exibirAvisoPromocional && (
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-blue-900 uppercase mb-1">
                    Texto do Anúncio
                  </label>
                  <input
                    type="text"
                    value={config.textoAvisoPromocional}
                    onChange={(e) => setConfig({ ...config, textoAvisoPromocional: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-blue-200 rounded-xl text-xs text-slate-900 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-blue-900 uppercase mb-1">
                    Link de Destino
                  </label>
                  <input
                    type="text"
                    value={config.linkAvisoPromocional}
                    onChange={(e) => setConfig({ ...config, linkAvisoPromocional: e.target.value })}
                    placeholder="#planos-residencias"
                    className="w-full px-3.5 py-2 bg-white border border-blue-200 rounded-xl text-xs text-slate-900 font-semibold"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Dados Empresariais */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nome da Empresa
              </label>
              <input
                type="text"
                value={config.empresaNome}
                onChange={(e) => setConfig({ ...config, empresaNome: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                CNPJ
              </label>
              <input
                type="text"
                value={config.cnpj}
                onChange={(e) => setConfig({ ...config, cnpj: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Texto de Copyright (Rodapé)
              </label>
              <input
                type="text"
                value={config.copyright}
                onChange={(e) => setConfig({ ...config, copyright: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#004ecc] hover:bg-[#003bb3] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Salvar Configurações</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: ALTERAÇÃO DE SENHA DO ADMINISTRADOR */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <KeyRound size={16} />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 font-display">
              Segurança & Troca de Senha
            </h2>
            <p className="text-[11px] text-slate-400">
              Altere a senha de acesso ao Painel Administrativo.
            </p>
          </div>
        </div>

        {passwordFeedback && (
          <div
            className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2.5 ${
              passwordFeedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {passwordFeedback.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
            <span>{passwordFeedback.message}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Senha Atual *
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Digite a senha atual"
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nova Senha *
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Confirmar Nova Senha *
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita a nova senha"
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={passwordLoading}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {passwordLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Atualizando senha...</span>
                </>
              ) : (
                <>
                  <Shield size={16} />
                  <span>Atualizar Senha de Acesso</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
