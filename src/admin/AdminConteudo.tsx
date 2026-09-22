/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Save, Loader2, Check, AlertCircle, Sparkles, FileText, Clock, Smartphone, Radio, Upload, Image as ImageIcon } from 'lucide-react';
import { useCMS, SiteContent } from '../context/CMSContext';

export default function AdminConteudo() {
  const { data, saveSiteContent, isLoading } = useCMS();
  const [content, setContent] = useState<SiteContent>({ ...data.siteContent });
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleImageFileChange = (field: 'appImagemUrl' | 'chipImagemUrl', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setContent((prev) => ({ ...prev, [field]: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

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

        {/* SECTION 5: CENTRAL DO ASSINANTE (APLICATIVO) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#f85c1c] flex items-center justify-center">
              <Smartphone size={16} />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 font-display">
                Central do Assinante (Aplicativo & Celular)
              </h2>
              <p className="text-[11px] text-slate-400">
                Personalize os textos, links de download e opte entre os celulares vetorizados em 2.5D ou uma imagem própria.
              </p>
            </div>
          </div>

          {/* Modo de Exibição da Imagem / Mockup */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Substituir Celulares por Imagem Personalizada</span>
                <span className="text-[11px] text-slate-500">
                  {content.appUsaImagemCustomizada
                    ? 'Uma foto ou banner customizado será exibido no lugar dos dois celulares vetorizados.'
                    : 'Os celulares vetorizados padrão 2.5D estão sendo exibidos.'}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={content.appUsaImagemCustomizada}
                  onChange={(e) => setContent({ ...content, appUsaImagemCustomizada: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004ecc]"></div>
              </label>
            </div>

            {content.appUsaImagemCustomizada && (
              <div className="pt-3 border-t border-slate-200/80 space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Imagem do Aplicativo
                </label>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs">
                    <Upload size={14} />
                    <span>Fazer Upload do Computador</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileChange('appImagemUrl', e)}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs text-slate-400">ou insira a URL da imagem abaixo:</span>
                </div>

                <input
                  type="text"
                  placeholder="https://exemplo.com/imagem-app.png"
                  value={content.appImagemUrl}
                  onChange={(e) => setContent({ ...content, appImagemUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
                />

                {content.appImagemUrl && (
                  <div className="mt-2 p-2 bg-white rounded-xl border border-slate-200 max-w-xs flex items-center gap-3">
                    <img
                      src={content.appImagemUrl}
                      alt="Prévia App"
                      className="w-16 h-16 object-contain rounded-lg bg-slate-50 border border-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-700 truncate">Imagem selecionada</p>
                      <button
                        type="button"
                        onClick={() => setContent({ ...content, appImagemUrl: '' })}
                        className="text-[10px] text-red-500 hover:underline font-bold mt-0.5 cursor-pointer"
                      >
                        Remover imagem
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Textos do Aplicativo */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tag / Prefixo do Título
              </label>
              <input
                type="text"
                value={content.appTituloDestaque}
                onChange={(e) => setContent({ ...content, appTituloDestaque: e.target.value })}
                placeholder="Ex: CENTRAL DO"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Título Principal
              </label>
              <input
                type="text"
                value={content.appTituloResto}
                onChange={(e) => setContent({ ...content, appTituloResto: e.target.value })}
                placeholder="Ex: Assinante"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Descrição Introdutória
              </label>
              <textarea
                rows={2}
                value={content.appDescricao}
                onChange={(e) => setContent({ ...content, appDescricao: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              ></textarea>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Lista de Recursos / Benefícios (1 por linha)
              </label>
              <textarea
                rows={5}
                value={content.appBeneficios ? content.appBeneficios.join('\n') : ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    appBeneficios: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                  })
                }
                placeholder="Visualização e 2ª via de boletos;&#10;Visualização de faturas;&#10;Abrir suporte e verificação de consumo;&#10;Solicitação de desbloqueio por confiança;&#10;Teste de velocidade."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              ></textarea>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Cada quebra de linha criará um item com traço laranja na lista.
              </span>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Frase de Destaque Final
              </label>
              <input
                type="text"
                value={content.appSubTexto}
                onChange={(e) => setContent({ ...content, appSubTexto: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Link Google Play
              </label>
              <input
                type="text"
                value={content.appGooglePlayUrl}
                onChange={(e) => setContent({ ...content, appGooglePlayUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Link App Store (Apple)
              </label>
              <input
                type="text"
                value={content.appAppleStoreUrl}
                onChange={(e) => setContent({ ...content, appAppleStoreUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 6: SEÇÃO CHIP CENTRALNET */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#004ecc] flex items-center justify-center">
              <Radio size={16} />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 font-display">
                Seção Chip CentralNet (Móvel)
              </h2>
              <p className="text-[11px] text-slate-400">
                Edite os títulos, diferenciais, botão e a imagem do chip exibidos no bloco azul de destaque.
              </p>
            </div>
          </div>

          {/* Imagem do Chip */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Imagem do Chip CentralNet
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs">
                <Upload size={14} />
                <span>Subir Imagem do Chip</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageFileChange('chipImagemUrl', e)}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-slate-400">ou informe o caminho/URL (padrão: /chip.png):</span>
            </div>

            <input
              type="text"
              value={content.chipImagemUrl}
              onChange={(e) => setContent({ ...content, chipImagemUrl: e.target.value })}
              placeholder="/chip.png"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
            />

            {content.chipImagemUrl && (
              <div className="mt-2 p-2 bg-white rounded-xl border border-slate-200 max-w-xs flex items-center gap-3">
                <img
                  src={content.chipImagemUrl}
                  alt="Prévia Chip"
                  className="w-16 h-16 object-cover rounded-lg bg-[#004ecc]"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-slate-700 truncate">Imagem do Chip</p>
                  <button
                    type="button"
                    onClick={() => setContent({ ...content, chipImagemUrl: '/chip.png' })}
                    className="text-[10px] text-slate-500 hover:underline font-bold mt-0.5 cursor-pointer"
                  >
                    Restaurar padrão (/chip.png)
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Badge / Etiqueta Superior
              </label>
              <input
                type="text"
                value={content.chipBadge}
                onChange={(e) => setContent({ ...content, chipBadge: e.target.value })}
                placeholder="Ex: Internet Móvel 4G / 5G"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Título Linha 1 (Texto)
              </label>
              <input
                type="text"
                value={content.chipTituloLinha1}
                onChange={(e) => setContent({ ...content, chipTituloLinha1: e.target.value })}
                placeholder="Com o"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Título Linha 1 (Destaque Negrito)
              </label>
              <input
                type="text"
                value={content.chipTituloDestaque1}
                onChange={(e) => setContent({ ...content, chipTituloDestaque1: e.target.value })}
                placeholder="Chip CentralNet"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-[#004ecc] focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Título Linha 2 (Texto)
              </label>
              <input
                type="text"
                value={content.chipTituloLinha2}
                onChange={(e) => setContent({ ...content, chipTituloLinha2: e.target.value })}
                placeholder="sua conexão não fica limitada ao"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Título Linha 2 (Destaque Negrito)
              </label>
              <input
                type="text"
                value={content.chipTituloDestaque2}
                onChange={(e) => setContent({ ...content, chipTituloDestaque2: e.target.value })}
                placeholder="Wi-Fi de Casa"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-[#004ecc] focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Descrição
              </label>
              <textarea
                rows={2}
                value={content.chipDescricao}
                onChange={(e) => setContent({ ...content, chipDescricao: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Card 1 - Título
              </label>
              <input
                type="text"
                value={content.chipCard1Titulo}
                onChange={(e) => setContent({ ...content, chipCard1Titulo: e.target.value })}
                placeholder="Rede 5G Max"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Card 1 - Descrição
              </label>
              <input
                type="text"
                value={content.chipCard1Descricao}
                onChange={(e) => setContent({ ...content, chipCard1Descricao: e.target.value })}
                placeholder="Velocidade e menor latência"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Card 2 - Título
              </label>
              <input
                type="text"
                value={content.chipCard2Titulo}
                onChange={(e) => setContent({ ...content, chipCard2Titulo: e.target.value })}
                placeholder="Zero Bloqueios"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Card 2 - Descrição
              </label>
              <input
                type="text"
                value={content.chipCard2Descricao}
                onChange={(e) => setContent({ ...content, chipCard2Descricao: e.target.value })}
                placeholder="Navegue sem preocupações"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Texto do Botão
              </label>
              <input
                type="text"
                value={content.chipBotaoTexto}
                onChange={(e) => setContent({ ...content, chipBotaoTexto: e.target.value })}
                placeholder="Conheça o nosso Chip"
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
