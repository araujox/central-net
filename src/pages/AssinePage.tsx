/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { MapPin, Search, Phone, ShieldCheck, Check, AlertCircle, Headphones, ArrowRight, Gamepad2, Laptop, Wifi, ArrowLeft, Radio, Sparkles, Tv, Music, Award, Smile } from 'lucide-react';
import { PLANOS_CENTRALNET, CIDADES_CENTRALNET, CONTATO_CENTRALNET, Plano } from '../types';

const renderAppBadge = (appName: string) => {
  const normalizedAppName = appName.toLowerCase().trim();
  switch (normalizedAppName) {
    case 'exitlag':
      return (
        <div key="exitlag" className="flex items-center justify-center bg-[#710c0e] text-white font-extrabold rounded-md text-[6px] sm:text-[7.3px] tracking-tighter leading-none border border-[#8e1416]/50 h-5 w-11 sm:w-14 shrink-0 shadow-sm" title="ExitLag">
          <span>EXITLAG</span>
        </div>
      );
    case 'deezer':
      return (
        <div key="deezer" className="flex items-center justify-center gap-0.5 bg-[#a23efc] text-white font-black rounded-md text-[6px] sm:text-[7.3px] tracking-tighter leading-none border border-[#b666ff]/50 h-5 w-11 sm:w-14 shrink-0 shadow-sm" title="Deezer">
          <svg className="w-1.5 h-1.5 fill-white shrink-0" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span>DEEZER</span>
        </div>
      );
    case 'kaspersky':
      return (
        <div key="kaspersky" className="flex items-center justify-center gap-0.5 bg-[#00dd50] text-[#01220a] font-black rounded-md text-[5.5px] sm:text-[6.8px] tracking-tighter leading-none border border-[#2bf374]/50 h-5 w-11 sm:w-14 shrink-0 shadow-sm" title="Kaspersky">
          <span className="text-[5px] font-black border border-[#01220a]/35 rounded-full w-2 h-2 flex items-center justify-center font-mono bg-white/45 scale-[0.8]">k</span>
          <span>KASPERSKY</span>
        </div>
      );
    case 'watch':
      return (
        <div key="watch" className="flex items-center justify-center bg-[#f26522] text-white font-black rounded-md text-[6px] sm:text-[7.3px] tracking-tighter leading-none border border-[#ff8e5a]/50 h-5 w-11 sm:w-14 shrink-0 shadow-sm" title="Watch">
          <span>WATCH</span>
        </div>
      );
    case 'hbo':
    case 'hbo-max':
      return (
        <div key="hbo" className="flex items-center justify-center bg-[#4d07bc] text-white font-black rounded-md text-[6px] sm:text-[7.3px] tracking-tighter leading-none border border-[#7633e2]/50 h-5 w-11 sm:w-14 shrink-0 shadow-sm" title="HBO Max">
          <span>HBO MAX</span>
        </div>
      );
    case 'paramount-or-hbo':
    case 'hbo-or-paramount':
      return (
        <div key="hbo" className="flex items-center justify-center bg-[#4d07bc] text-white font-black rounded-md text-[5px] sm:text-[6px] tracking-tighter leading-none border border-[#7633e2]/50 h-5 w-11 sm:w-14 shrink-0 shadow-sm" title="HBO ou Paramount+">
          <span>HBO / PAR.</span>
        </div>
      );
    case 'disney':
      return (
        <div key="disney" className="flex items-center justify-center bg-[#012431] text-white font-extrabold rounded-md text-[6px] sm:text-[7.3px] tracking-tighter leading-none border border-[#053d53]/50 h-5 w-11 sm:w-14 shrink-0 shadow-sm" title="Disney+">
          <span>DISNEY+</span>
        </div>
      );
    case 'nutri':
      return (
        <div key="nutri" className="flex items-center justify-center bg-[#f16321] text-white font-black rounded-md text-[6px] sm:text-[7.3px] tracking-tighter leading-none border border-[#ff874f]/50 h-5 w-11 sm:w-14 shrink-0 shadow-sm" title="Nutri">
          <span>@NUTRI</span>
        </div>
      );
    case 'prime':
      return (
        <div key="prime" className="flex items-center justify-center bg-[#00a8e1] text-white font-extrabold rounded-md text-[6px] sm:text-[7.3px] tracking-tighter leading-none border border-[#3acff5]/50 h-5 w-11 sm:w-14 shrink-0 shadow-sm" title="Prime Video">
          <span>PRIME</span>
        </div>
      );
    case 'empty':
    default:
      return (
        <div key={Math.random()} className="bg-[#e4e3ea] rounded-md border border-[#cecddeb5] h-5 w-11 sm:w-14 shrink-0" />
      );
  }
};

import { useCMS } from '../context/CMSContext';

interface AssinePageProps {
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel', tab?: 'residencial' | 'gamer' | 'casa-conectada' | 'radio' | 'empresarial') => void;
  activeFiberTab?: 'residencial' | 'gamer' | 'casa-conectada' | 'radio' | 'empresarial';
}

export default function AssinePage({ setCurrentPage, activeFiberTab }: AssinePageProps) {
  const { data, formatWhatsappLink } = useCMS();
  const [selectedCidade, setSelectedCidade] = useState<string>('surubim');
  const [activeTab, setActiveTab] = useState<'residencial' | 'gamer' | 'casa-conectada' | 'radio' | 'empresarial'>('residencial');

  // Synchronize state when activeFiberTab prop changes from external sources
  useEffect(() => {
    if (activeFiberTab) {
      setActiveTab(activeFiberTab);
    }
  }, [activeFiberTab]);

  // Filter plans based on active categories and not inactive
  const planosFiltrados = data.planos
    .filter(p => p.categoria === activeTab && !(p as any).inativo);

  const handleContratar = (plano: Plano) => {
    const cidadeNome = data.cidades.find(c => c.id === selectedCidade)?.nome || 'Surubim - PE';
    const textMsg = `Olá! Gostaria de assinar o plano "${plano.nome}" de velocidade "${plano.velocidade}" por "${plano.preco}/mês" para a cidade de "${cidadeNome}". Poderia verificar minha cobertura?`;
    const whatsappLink = formatWhatsappLink(textMsg);
    window.open(whatsappLink, '_blank', 'noreferrer,noopener');
  };

  return (
    <main className="pt-28 pb-24 bg-slate-50 min-h-screen font-sans">
      
      {/* Background glowing particles structure */}
      <div className="absolute top-28 left-0 right-0 h-96 bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back navigation */}
        <button
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-bold px-3 py-2 bg-white hover:bg-slate-100 rounded-xl border border-slate-100 shadow-sm cursor-pointer mb-8 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Voltar ao Início</span>
        </button>

        {/* Hero Title Portion */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-black tracking-widest text-orange-500 uppercase bg-orange-50 border border-orange-100/60 px-4 py-1.5 rounded-full">
            Contratação 100% Online
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
            Escolha sua cidade e assine seu plano
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Encontre conexões velozes e sob medida. Wi-Fi premium dual-band incluso, ativação limpa expressa de fibra óptica e suporte especializado próximo de você.
          </p>
        </div>

        {/* STEP 1: City Selection */}
        <div id="selecao-cidade-container" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6 max-w-4xl mx-auto mb-10">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <MapPin className="text-orange-500" size={18} />
              <span>1. Selecione Sua Localidade</span>
            </h2>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Disponibilidade Ativa
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Atendemos com infraestrutura e equipe locais próprias no agreste de Pernambuco. Por favor, marque abaixo a sua cidade para personalizar as condições técnicas.
          </p>

          {/* Grid list of cities buttons selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {data.cidades.map((cidade) => {
              const isSelected = selectedCidade === cidade.id;
              return (
                <button
                  key={cidade.id}
                  onClick={() => setSelectedCidade(cidade.id)}
                  className={`p-3.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer text-center ${
                    isSelected 
                      ? 'bg-blue-600 border-transparent text-white shadow-md glow-blue' 
                      : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100 hover:border-slate-200'
                  }`}
                >
                  {cidade.nome}
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: Categories Tab Selection */}
        <div className="flex gap-2 max-w-4xl mx-auto mb-12 bg-white/60 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/60 shadow-sm overflow-x-auto scrollbar-none scroll-smooth">
          <button
            onClick={() => setActiveTab('residencial')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap min-w-[140px] ${
              activeTab === 'residencial' 
                ? 'bg-blue-600 text-white shadow-sm font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Wifi size={14} />
            <span>Residencial Plus</span>
          </button>
          
          <button
            id="categoria-gamer"
            onClick={() => setActiveTab('gamer')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap min-w-[140px] ${
              activeTab === 'gamer' 
                ? 'bg-blue-600 text-white shadow-sm font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Gamepad2 size={14} />
            <span>Planos Gamer</span>
          </button>

          <button
            onClick={() => setActiveTab('casa-conectada')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap min-w-[140px] ${
              activeTab === 'casa-conectada' 
                ? 'bg-blue-600 text-white shadow-sm font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Sparkles size={14} />
            <span>Casa Conectada</span>
          </button>

          <button
            onClick={() => setActiveTab('radio')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap min-w-[140px] ${
              activeTab === 'radio' 
                ? 'bg-blue-600 text-white shadow-sm font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Radio size={14} />
            <span>Radiofrequência</span>
          </button>

          <button
            onClick={() => setActiveTab('empresarial')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap min-w-[140px] ${
              activeTab === 'empresarial' 
                ? 'bg-blue-600 text-white shadow-sm font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Laptop size={14} />
            <span>Para Empresas</span>
          </button>
        </div>

        {/* STEP 3: Plans display grid card list */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {planosFiltrados.map((plano) => {
            return (
              <div 
                key={plano.id}
                className={`bg-white rounded-3xl p-8 border transition-all duration-300 relative flex flex-col justify-between hover:shadow-2xl ${
                  plano.bannerPopular 
                    ? 'border-orange-500 ring-1 ring-orange-500/40 shadow-xl scale-[1.03] sm:scale-100 lg:scale-[1.03]' 
                    : 'border-slate-100 shadow-md'
                }`}
              >
                {/* Popular label badge */}
                {plano.bannerPopular && (
                  <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-md">
                    RECOMENDADO
                  </span>
                )}

                <div className="space-y-6">
                  {/* Title & Speed representation */}
                  <div className="space-y-1">
                    <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">{plano.nome}</p>
                    <h3 className="text-3xl font-black text-slate-900 font-display leading-none pt-1">
                      {plano.velocidade}
                    </h3>
                  </div>

                  {/* Pricing block */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-baseline gap-1.5">
                    <span className="text-slate-900 text-3xl font-black font-display tracking-tight">{plano.preco}</span>
                    {plano.preco !== 'Sob Consulta' && <span className="text-xs text-slate-400 font-bold">/ mês</span>}
                  </div>

                  {/* Apps Inclusos Badge Row */}
                  {plano.appHeading ? (
                    <div className="space-y-3 bg-[#f5f4fa] p-4 rounded-2xl border border-slate-200/50 text-center sm:text-left overflow-hidden">
                      {plano.appHeadingPremium ? (
                        <div className="space-y-3">
                          {/* Standard selection */}
                          <div className="space-y-1">
                            <span className="text-[8.5px] text-[#005cdc] font-black block leading-none tracking-tight">
                              {plano.appHeading}
                            </span>
                            <div className="flex flex-wrap items-center gap-1 mt-1 justify-center sm:justify-start w-full">
                              {plano.appRows?.[0]?.filter(badge => badge !== 'empty').map((badge) => renderAppBadge(badge))}
                            </div>
                          </div>
                          {/* Premium selection */}
                          <div className="space-y-1">
                            <span className="text-[8.5px] text-[#005cdc] font-black block leading-none tracking-tight">
                              {plano.appHeadingPremium}
                            </span>
                            <div className="flex flex-wrap items-center gap-1 mt-1 justify-center sm:justify-start w-full">
                              {plano.appRowsPremium?.[0]?.filter(badge => badge !== 'empty').map((badge) => renderAppBadge(badge))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Standard selection for 300, 500, 600, 800
                        <div className="space-y-1">
                          <span className="text-[8.5px] text-[#005cdc] font-black block leading-none tracking-tight">
                            {plano.appHeading}
                          </span>
                          <div className="space-y-1.5 mt-1.5">
                            {plano.appRows?.map((row, idx) => {
                              const activeBadges = row.filter(badge => badge !== 'empty');
                              if (activeBadges.length === 0) return null;
                              return (
                                <div key={idx} className="flex flex-wrap items-center gap-1 justify-center sm:justify-start w-full">
                                  {activeBadges.map((badge) => renderAppBadge(badge))}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    plano.apps && plano.apps.length > 0 && (
                      <div className="space-y-2 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/80">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <span>Apps de Entretenimento Inclusos</span>
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {plano.apps.map((appKey) => {
                            if (appKey === 'paramount-or-deezer') {
                              return (
                                <div key={appKey} className="inline-flex items-center gap-1.5 bg-white border border-slate-100 rounded-lg p-1.5 text-[9px] font-bold text-slate-700 shadow-sm w-full justification-start">
                                  <span className="px-1.5 py-0.5 rounded-md bg-blue-900 text-white font-extrabold text-[8px] uppercase tracking-tight">Paramount+</span>
                                  <span className="text-slate-400 text-[8px] font-extrabold uppercase">ou</span>
                                  <span className="px-1.5 py-0.5 rounded-md bg-black text-white font-extrabold text-[8px] uppercase tracking-tight">Deezer</span>
                                </div>
                              );
                            }
                            if (appKey === 'paramount-and-deezer') {
                              return (
                                <div key={appKey} className="inline-flex items-center gap-1.5 bg-white border border-slate-100 rounded-lg p-1.5 text-[9px] font-bold text-slate-700 shadow-sm w-full justification-start">
                                  <span className="px-1.5 py-0.5 rounded-md bg-blue-900 text-white font-extrabold text-[8px] uppercase tracking-tight">Paramount+</span>
                                  <span className="text-emerald-500 text-[9px] font-extrabold">&</span>
                                  <span className="px-1.5 py-0.5 rounded-md bg-black text-white font-extrabold text-[8px] uppercase tracking-tight">Deezer</span>
                                </div>
                              );
                            }
                            if (appKey === 'hbo-or-paramount') {
                              return (
                                <div key={appKey} className="inline-flex items-center gap-1.5 bg-white border border-slate-100 rounded-lg p-1.5 text-[9px] font-bold text-slate-700 shadow-sm w-full justification-start">
                                  <span className="px-1.5 py-0.5 rounded-md bg-violet-600 text-white font-extrabold text-[8px] uppercase tracking-tight">Max (HBO)</span>
                                  <span className="text-slate-400 text-[8px] font-extrabold uppercase">ou</span>
                                  <span className="px-1.5 py-0.5 rounded-md bg-blue-900 text-white font-extrabold text-[8px] uppercase tracking-tight">Paramount+</span>
                                </div>
                              );
                            }
                            if (appKey === 'paramount-or-hbo') {
                              return (
                                <div key={appKey} className="inline-flex items-center gap-1.5 bg-white border border-slate-100 rounded-lg p-1.5 text-[9px] font-bold text-slate-700 shadow-sm w-full justification-start">
                                  <span className="px-1.5 py-0.5 rounded-md bg-blue-900 text-white font-extrabold text-[8px] uppercase tracking-tight">Paramount+</span>
                                  <span className="text-slate-400 text-[8px] font-extrabold uppercase">ou</span>
                                  <span className="px-1.5 py-0.5 rounded-md bg-violet-600 text-white font-extrabold text-[8px] uppercase tracking-tight">Max (HBO)</span>
                                </div>
                              );
                            }
                            if (appKey === 'hbo-max') {
                              return (
                                <span key={appKey} className="inline-flex items-center gap-1 bg-violet-50 hover:bg-violet-100/60 border border-violet-100 px-2 py-1 rounded-full text-[9px] font-black text-violet-700 shadow-xs transition-all">
                                  <Tv size={9} className="stroke-[2.5]" />
                                  <span>Max (HBO)</span>
                                </span>
                              );
                            }
                            if (appKey === 'deezer') {
                              return (
                                <span key={appKey} className="inline-flex items-center gap-1 bg-zinc-900 hover:bg-black border border-zinc-850 px-2 py-1 rounded-full text-[9px] font-black text-white shadow-xs transition-all">
                                  <Music size={9} className="text-purple-400 stroke-[2.5]" />
                                  <span>Deezer</span>
                                </span>
                              );
                            }
                            if (appKey === 'paramount') {
                              return (
                                <span key={appKey} className="inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100/60 border border-blue-100 px-2 py-1 rounded-full text-[9px] font-black text-blue-800 shadow-xs transition-all">
                                  <Tv size={9} className="stroke-[2.5]" />
                                  <span>Paramount+</span>
                                </span>
                              );
                            }
                            if (appKey === 'noggin') {
                              return (
                                <span key={appKey} className="inline-flex items-center gap-1 bg-orange-50 hover:bg-orange-100/60 border border-orange-100 px-2 py-1 rounded-full text-[9px] font-black text-orange-700 shadow-xs transition-all">
                                  <Smile size={9} className="stroke-[2.5]" />
                                  <span>Noggin by Nick Jr.</span>
                                </span>
                              );
                            }
                            if (appKey === 'clube-vantagens') {
                              return (
                                <span key={appKey} className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100/60 border border-amber-200/50 px-2 py-1 rounded-full text-[9px] font-black text-amber-700 shadow-xs transition-all w-full md:w-auto">
                                  <Award size={10} className="stroke-[2.5] text-amber-600 shrink-0" />
                                  <span>Clube de Vantagens Central</span>
                                </span>
                              );
                            }
                            if (appKey === 'plus-1-app') {
                              return (
                                <span key={appKey} className="inline-flex items-center gap-1 bg-sky-50 hover:bg-sky-100/60 border border-sky-100 px-2 py-1 rounded-full text-[9px] font-black text-sky-700 shadow-xs transition-all">
                                  <Sparkles size={9} className="stroke-[2.5]" />
                                  <span>+1 App à escolha</span>
                                </span>
                              );
                            }
                            if (appKey === 'plus-2-apps') {
                              return (
                                <span key={appKey} className="inline-flex items-center gap-1 bg-teal-50 hover:bg-teal-100/60 border border-teal-105 px-2 py-1 rounded-full text-[9px] font-black text-teal-700 shadow-xs transition-all">
                                  <Sparkles size={9} className="stroke-[2.5]" />
                                  <span>+2 Apps à escolha</span>
                                </span>
                              );
                            }
                            if (appKey === 'plus-5-apps') {
                              return (
                                <span key={appKey} className="inline-flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100/60 border border-indigo-100 px-2 py-1 rounded-full text-[9px] font-black text-indigo-700 shadow-xs transition-all">
                                  <Sparkles size={9} className="stroke-[2.5]" />
                                  <span>+5 Apps à escolha</span>
                                </span>
                              );
                            }
                            if (appKey === 'plus-6-apps') {
                              return (
                                <span key={appKey} className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100/60 border border-emerald-100 px-2 py-1 rounded-full text-[9px] font-black text-emerald-700 shadow-xs transition-all">
                                  <Sparkles size={9} className="stroke-[2.5]" />
                                  <span>+6 Apps à escolha (MESH)</span>
                                </span>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    )
                  )}

                  {/* Divider */}
                  <div className="h-px bg-slate-100"></div>

                  {/* Benefits points list */}
                  <ul className="space-y-3.5 text-slate-600 text-xs">
                    {plano.beneficios.map((ben, i) => (
                      <li key={i} className="flex gap-2.5 items-start">
                        <Check size={14} className="text-emerald-500 shrink-0 mt-0.5 stroke-[3px]" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contrate CTA Button (Highlighted) */}
                <div className="pt-8">
                  <button
                    onClick={() => handleContratar(plano)}
                    className={`w-full py-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider ${
                      plano.bannerPopular 
                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-orange-500/10 hover:scale-102 active:scale-98' 
                        : 'bg-slate-900 hover:bg-slate-800 text-white hover:scale-102 active:scale-98'
                    }`}
                  >
                    <span>Contratar Plano</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Doubts WhatsApp Call Banner as requested */}
        <div className="mt-20 bg-emerald-50 rounded-3xl p-8 sm:p-10 border border-emerald-100 shadow-sm max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-md shrink-0">
              <Phone size={24} className="fill-white stroke-emerald-500" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full uppercase tracking-wider">Fale Com Vendedores</span>
              <h3 className="text-xl font-bold text-slate-900 font-display">Ficou com alguma dúvida pelo caminho?</h3>
              <p className="text-xs text-slate-500">Chame nossos consultores no WhatsApp e receba suporte para entender o plano perfeito para você!</p>
            </div>
          </div>
          <a
            href={CONTATO_CENTRALNET.whatsappUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-4 rounded-xl text-xs font-bold transition-all w-full md:w-auto inline-flex items-center justify-center gap-2 shadow-md hover:scale-103 active:scale-97"
          >
            <span>Conversar Via WhatsApp</span>
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Trust Indicators footer grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-slate-200/60 max-w-5xl mx-auto text-center md:text-left text-slate-500">
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck size={16} className="text-blue-600" /> Confiabilidade Garantizada
            </h4>
            <p className="text-xs leading-relaxed">Infraestrutura redundante e fibras de transporte blindadas para assegurar a menor taxa de oscilação do mercado regional.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 flex items-center justify-center md:justify-start gap-1.5">
              <Headphones size={16} className="text-blue-600" /> Atendimento Sede Física
            </h4>
            <p className="text-xs leading-relaxed">Você nunca fica desamparado. Suporte operacional de campo rápido e atendimento presencial na nossa central de Surubim.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 flex items-center justify-center md:justify-start gap-1.5">
              <AlertCircle size={16} className="text-blue-600" /> Instalação e Equipamentos
            </h4>
            <p className="text-xs leading-relaxed">Disposição imediata do roteador Super Wi-Fi DualBand emprestado gratuitamente em comodato para você usufruir de canais Gigabit.</p>
          </div>
        </div>

      </div>
    </main>
  );
}
