/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface AssineAgoraSectionProps {
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel') => void;
}

export default function AssineAgoraSection({ setCurrentPage }: AssineAgoraSectionProps) {
  const { data } = useCMS();
  const handleVerify = () => {
    setCurrentPage('assine');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 to-slate-900 text-white relative overflow-hidden">
      
      {/* Visual map outline dots pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">
        
        {/* Texts */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-black tracking-widest text-orange-500 uppercase bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20">
            Assinatura sem burocracia
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
            {data.siteContent.coberturaTitulo}
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            {data.siteContent.coberturaSubtitulo}
          </p>
        </div>

        {/* Cities visual tags carousel style */}
        <div className="bg-slate-900/40 border border-white/10 p-5 rounded-3xl max-w-4xl mx-auto backdrop-blur-md">
          <p className="text-xs font-bold text-slate-400 mb-4 flex items-center justify-center gap-1.5 uppercase tracking-wider">
            <MapPin size={14} className="text-orange-500" />
            Cidades com Cobertura Ativa CentralNet
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {data.cidades.map((cidade) => (
              <button
                key={cidade.id}
                onClick={handleVerify}
                className="bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white px-3.5 py-2.5 rounded-xl border border-white/5 hover:border-white/15 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                {cidade.nome}
              </button>
            ))}
          </div>
        </div>

        {/* Obligatory Button with explicit action */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="ver-planos-disponiveis-btn"
            onClick={handleVerify}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black px-8 py-4 rounded-xl shadow-xl hover:shadow-orange-500/10 transition-all duration-300 transform hover:scale-105 active:scale-95 group text-sm cursor-pointer"
          >
            <span>{data.siteContent.coberturaBotaoTexto || 'Ver planos disponíveis'}</span>
            <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
          </button>
          
          <span className="text-xs text-slate-400 font-medium">Instalação agendada em até 48 horas úteis!</span>
        </div>

        {/* Dynamic Trust Points */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center pt-8 border-t border-white/10 text-slate-300">
          <div className="space-y-1">
            <span className="text-lg font-black text-white font-display">Sem Taxa</span>
            <p className="text-[11px] text-slate-400">De ativação em campanhas</p>
          </div>
          <div className="space-y-1">
            <span className="text-lg font-black text-white font-display">Wi-Fi DualBand</span>
            <p className="text-[11px] text-slate-400">Alta performance gratuito</p>
          </div>
          <div className="space-y-1">
            <span className="text-lg font-black text-white font-display">Atendimento</span>
            <p className="text-[11px] text-slate-400">Humanizado pelo WhatsApp</p>
          </div>
          <div className="space-y-1">
            <span className="text-lg font-black text-white font-display">Ativação Rápida</span>
            <p className="text-[11px] text-slate-400">Em até 2 dias úteis</p>
          </div>
        </div>

      </div>
    </section>
  );
}
