/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Save, Loader2, Check, AlertCircle, Phone, MessageSquare, MapPin, Clock, Globe, Smartphone, Mail } from 'lucide-react';
import { useCMS, ContactSettings } from '../context/CMSContext';

export default function AdminContato() {
  const { data, saveContactSettings, isLoading } = useCMS();
  const [contato, setContato] = useState<ContactSettings>({ ...data.contato });
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    const ok = await saveContactSettings(contato);
    if (ok) {
      setFeedback({
        type: 'success',
        message: 'Informações de contato e links atualizados com sucesso! Todos os botões e rodapés já refletem essas mudanças.',
      });
      setTimeout(() => setFeedback(null), 4000);
    } else {
      setFeedback({ type: 'error', message: 'Não foi possível salvar os contatos. Tente novamente.' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
          Informações de Contato & Links do Site
        </h1>
        <p className="text-xs text-slate-500">
          Atualize telefones, WhatsApp, endereço, redes sociais e links da Central do Assinante. Essas configurações alimentam automaticamente todo o site público.
        </p>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2.5 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {feedback.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{feedback.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: TELEFONE E WHATSAPP PRINCIPAL */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageSquare size={16} />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 font-display">
                WhatsApp e Telefone Principal
              </h2>
              <p className="text-[11px] text-slate-400">
                Alimenta o botão flutuante, o banner do Hero, o rodapé e a seção de contato.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Número do WhatsApp *
              </label>
              <input
                type="text"
                value={contato.whatsappLimpo}
                onChange={(e) => setContato({ ...contato, whatsappLimpo: e.target.value })}
                placeholder="(81) 99500-9874"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Utilizado para gerar os links dinâmicos de atendimento.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Telefone Fixo / Comercial *
              </label>
              <input
                type="text"
                value={contato.telefone}
                onChange={(e) => setContato({ ...contato, telefone: e.target.value })}
                placeholder="(81) 3634-2659"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                E-mail de Contato
              </label>
              <input
                type="email"
                value={contato.email}
                onChange={(e) => setContato({ ...contato, email: e.target.value })}
                placeholder="contato@centralnetsurubim.com.br"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Link Manual do WhatsApp (Opcional)
              </label>
              <input
                type="text"
                value={contato.whatsappUrl}
                onChange={(e) => setContato({ ...contato, whatsappUrl: e.target.value })}
                placeholder="https://wa.me/..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: ENDEREÇO E HORÁRIOS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#004ecc] flex items-center justify-center">
              <MapPin size={16} />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 font-display">
                Endereço da Sede e Atendimento
              </h2>
              <p className="text-[11px] text-slate-400">
                Informações físicas exibidas no rodapé e seção Fale Conosco.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Endereço Completo
              </label>
              <input
                type="text"
                value={contato.endereco}
                onChange={(e) => setContato({ ...contato, endereco: e.target.value })}
                placeholder="Av. São Sebastião, 613 - São Sebastiao, Surubim - PE, 55750-000"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Horário Geral de Atendimento
              </label>
              <input
                type="text"
                value={contato.horario}
                onChange={(e) => setContato({ ...contato, horario: e.target.value })}
                placeholder="Segunda a Sexta: 08h às 18h | Sábado: 08h às 12h | Suporte Técnico: Todos os dias até as 22h"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: REDES SOCIAIS E SISTEMAS EXTERNOS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Globe size={16} />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 font-display">
                Redes Sociais e Central do Assinante
              </h2>
              <p className="text-[11px] text-slate-400">
                Links para perfis sociais, emissão de faturas e download de aplicativos.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Instagram URL
              </label>
              <input
                type="url"
                value={contato.instagram}
                onChange={(e) => setContato({ ...contato, instagram: e.target.value })}
                placeholder="https://www.instagram.com/centralnett.official/"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Facebook URL
              </label>
              <input
                type="url"
                value={contato.facebook}
                onChange={(e) => setContato({ ...contato, facebook: e.target.value })}
                placeholder="https://facebook.com/centralnetsurubim"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Link da Central do Assinante
              </label>
              <input
                type="url"
                value={contato.centralAssinanteUrl}
                onChange={(e) => setContato({ ...contato, centralAssinanteUrl: e.target.value })}
                placeholder="https://sgp.centralnetsurubim.com.br/..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Link do App CentralNet (Google Play / App Store)
              </label>
              <input
                type="url"
                value={contato.appGooglePlayUrl}
                onChange={(e) => setContato({ ...contato, appGooglePlayUrl: e.target.value })}
                placeholder="https://play.google.com/store/apps/..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>
          </div>
        </div>

        {/* Submit Floating Bar */}
        <div className="sticky bottom-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            As alterações nos contatos afetam o WhatsApp flutuante e os botões de contratação.
          </span>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#004ecc] hover:bg-[#003bb3] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50 ml-auto"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Salvar Informações de Contato</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
