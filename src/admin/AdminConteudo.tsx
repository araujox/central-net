/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Save, Loader2, Check, AlertCircle, Sparkles, FileText, Clock } from 'lucide-react';
import { useCMS, SiteContent } from '../context/CMSContext';

export default function AdminConteudo() {
  const { data, saveSiteContent, isLoading } = useCMS();
  const [content, setContent] = useState<SiteContent>({ ...data.siteContent });
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    const ok = await saveSiteContent(content);
    if (ok) {
      setFeedback({ type: 'success', message: 'Conteúdos do site salvos com sucesso!' });
      setTimeout(() => setFeedback(null), 4000);
    } else {
      setFeedback({ type: 'error', message: 'Não foi possível salvar o conteúdo. Tente novamente.' });
    }
  };

  const updateDiferencial = (index: number, field: 'titulo' | 'descricao', value: string) => {
    const updated = [...content.diferenciais];
    updated[index] = { ...updated[index], [field]: value };
    setContent({ ...content, diferenciais: updated });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
          Conteúdo Institucional do Site
        </h1>
        <p className="text-xs text-slate-500">
          Altere títulos, subtítulos, textos sobre a empresa e diferenciais exibidos no site público.
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
        
        {/* SECTION 1: SEÇÃO HERO / VITRINE DE PLANOS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#004ecc] flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 font-display">
                Seção Vitrine de Planos (Home)
              </h2>
              <p className="text-[11px] text-slate-400">
                Textos do cabeçalho da lista de planos na página inicial.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tag Superior
              </label>
              <input
                type="text"
                value={content.heroTag}
                onChange={(e) => setContent({ ...content, heroTag: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Título Principal
              </label>
              <input
                type="text"
                value={content.heroTitulo}
                onChange={(e) => setContent({ ...content, heroTitulo: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Subtítulo Explicativo
              </label>
              <input
                type="text"
                value={content.heroSubtitulo}
                onChange={(e) => setContent({ ...content, heroSubtitulo: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: SOBRE A CENTRAL NET */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#f26522] flex items-center justify-center">
              <FileText size={16} />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 font-display">
                Sobre a CentralNet (Rodapé & Institucional)
              </h2>
              <p className="text-[11px] text-slate-400">
                Texto de apresentação da história e missão da empresa exibido no rodapé.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Título da Seção
              </label>
              <input
                type="text"
                value={content.sobreTitulo}
                onChange={(e) => setContent({ ...content, sobreTitulo: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Texto Institucional
              </label>
              <textarea
                rows={4}
                value={content.sobreTexto}
                onChange={(e) => setContent({ ...content, sobreTexto: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 leading-relaxed font-sans focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              ></textarea>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Atendimento Semana
                </label>
                <input
                  type="text"
                  value={content.horarioPresencialSemana}
                  onChange={(e) => setContent({ ...content, horarioPresencialSemana: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Atendimento Sábado
                </label>
                <input
                  type="text"
                  value={content.horarioPresencialSabado}
                  onChange={(e) => setContent({ ...content, horarioPresencialSabado: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Atendimento Online
                </label>
                <input
                  type="text"
                  value={content.horarioOnline}
                  onChange={(e) => setContent({ ...content, horarioOnline: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: DIFERENCIAIS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock size={16} />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 font-display">
                Diferenciais da Conexão (Carrossel de Benefícios)
              </h2>
              <p className="text-[11px] text-slate-400">
                Os 5 diferenciais principais exibidos logo após os banners.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {content.diferenciais.map((dif, idx) => (
              <div key={dif.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Diferencial #{idx + 1}
                  </span>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                      Título do Diferencial
                    </label>
                    <input
                      type="text"
                      value={dif.titulo}
                      onChange={(e) => updateDiferencial(idx, 'titulo', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                      Descrição
                    </label>
                    <input
                      type="text"
                      value={dif.descricao}
                      onChange={(e) => updateDiferencial(idx, 'descricao', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: ÁREA DE COBERTURA / CTA */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 font-display">
                Chamada para Assinar & Cobertura
              </h2>
              <p className="text-[11px] text-slate-400">
                Textos do banner azul com o mapa de cidades atendidas.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Título da Seção de Cobertura
              </label>
              <input
                type="text"
                value={content.coberturaTitulo}
                onChange={(e) => setContent({ ...content, coberturaTitulo: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Subtítulo Explicativo
              </label>
              <textarea
                rows={2}
                value={content.coberturaSubtitulo}
                onChange={(e) => setContent({ ...content, coberturaSubtitulo: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Texto do Botão
              </label>
              <input
                type="text"
                value={content.coberturaBotaoTexto}
                onChange={(e) => setContent({ ...content, coberturaBotaoTexto: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>
          </div>
        </div>

        {/* Submit Floating Bottom Bar */}
        <div className="sticky bottom-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Clique em salvar para aplicar no site público.
          </span>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#004ecc] hover:bg-[#003bb3] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50 ml-auto"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Salvando alterações...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Salvar Conteúdo do Site</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
