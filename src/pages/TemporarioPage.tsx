/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, Calendar, ShieldCheck, Activity, Phone, ArrowRight, Check, Wifi, Sparkles, Tv, Users } from 'lucide-react';
import { CONTATO_CENTRALNET } from '../types';

interface TemporarioPageProps {
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario') => void;
}

export default function TemporarioPage({ setCurrentPage }: TemporarioPageProps) {
  const handleCotar = (tipoEvent?: string) => {
    const textMsg = tipoEvent 
      ? `Olá! Tenho interesse no Link Temporário de Alta Performance para um evento do tipo "${tipoEvent}". Gostaria de orçar viabilidade.`
      : 'Olá! Gostaria de falar com um especialista sobre conexões temporárias de alta performance para eventos.';
    const encoded = encodeURIComponent(textMsg);
    const whatsappLink = `${CONTATO_CENTRALNET.whatsappUrl}&text=${encoded}`;
    window.open(whatsappLink, '_blank', 'noreferrer,noopener');
  };

  const VANTAGENS_EVENTOS = [
    {
      icon: Wifi,
      title: "Wi-Fi de Altíssima Densidade",
      desc: "Distribuição MESH inteligente capaz de gerenciar milhares de conexões em simultâneo com total isolamento e estabilidade."
    },
    {
      icon: Tv,
      title: "Rotas Nobres para Streaming 4K",
      desc: "Canal exclusivo de upload estável para broadcasting, live streamings no YouTube/Twitch e transmissões de rádio e TV sem falhas."
    },
    {
      icon: Users,
      title: "Técnicos de Campo Dedicados no Local",
      desc: "Engenheiros de rede de prontidão diretamente na arena ou pavilhão garantindo integridade de rede durante todo o evento."
    },
    {
      icon: Activity,
      title: "Instalação Expresso Ultra Rápida",
      desc: "Abordagem dinâmica para montar a estrutura em tempo recorde no local, com cabos e antenas de contingência preparadas."
    }
  ];

  return (
    <main className="pt-28 pb-24 bg-slate-50 min-h-screen font-sans">
      <div className="absolute top-28 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none"></div>

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

        {/* Hero portion */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1 text-xs font-black tracking-widest text-[#d97706] uppercase bg-[#fef3c7] border border-[#fde68a] px-4 py-1.5 rounded-full">
              <Calendar size={12} className="stroke-[2.5]" />
              INTERNET PARA EVENTOS E FESTIVAIS
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight font-display leading-[1.1]">
              Internet Temporária com <span className="text-blue-600">Alta Performance</span> e Estabilidade Garantida
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Organizar shows, convenções locais, casamentos, eventos corporativos ou competições de eSports exige estabilidade crítica de internet. Com o Link Temporário CentralNet, você garante Wi-Fi de alta cobertura para convidados, terminais de pagamentos, credenciamento e streaming de vídeo profissional sem engasgos.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => handleCotar()}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-6 py-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-98 transition-all flex items-center gap-2"
              >
                <span>Falar com especialista em eventos</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-tr from-slate-900 to-indigo-950 text-white rounded-3xl p-8 border border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full filter blur-2xl pointer-events-none"></div>
            <div className="space-y-6 relative z-10">
              <h3 className="font-extrabold text-sm tracking-tight text-amber-400 font-display">Checklist para Eventos CentralNet</h3>
              
              <div className="space-y-3 pt-1 text-xs text-slate-350">
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-emerald-500 shrink-0" />
                  <span>Pontos Wi-Fi Inteligentes de Altíssima Densidade.</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-emerald-500 shrink-0" />
                  <span>Sinalização separada para bilheteria e produção.</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-emerald-500 shrink-0" />
                  <span>Conexão por canais físicos redundantes.</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-emerald-500 shrink-0" />
                  <span>Suporte presencial integral e rádio backups.</span>
                </p>
              </div>

              <div className="border border-white/5 bg-slate-800/60 p-4 rounded-2xl text-center">
                <span className="text-[9px] uppercase tracking-wider block text-slate-400 font-black">Ativação Expressa</span>
                <span className="text-lg font-black text-white font-display">Abordagem sob medida</span>
                <p className="text-[10px] text-slate-400 mt-1">Garantimos que o link esteja rodando com dias de folga antes da abertura do evento.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Cards */}
        <div className="py-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">Por que conectar seu evento com a gente?</h2>
            <p className="text-xs sm:text-sm text-slate-500">Oferecemos equipamentos industriais e profissionais de ponta para cobertura extrema.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {VANTAGENS_EVENTOS.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-3xl border border-slate-150 flex gap-4 items-start shadow-xs hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
                    <IconComp size={18} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm font-display">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mt-16 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-display">Para que tipos de eventos atuamos?</h3>
            <p className="text-xs text-slate-500">Desenvolvemos conexões temporárias personalizadas para qualquer escala:</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="border border-slate-150 p-6 rounded-2xl space-y-4 hover:border-slate-350 transition-colors">
              <h4 className="font-bold text-sm text-slate-900 font-display">Shows e Festivais</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Conexão redundante dedicada para os sistemas de bilheteria eletrônica, camarotes, Wi-Fi de imprensa externa, e redes de rádio exclusivas para a produção técnica local.</p>
              <button
                onClick={() => handleCotar('Shows e Festivais')}
                className="text-xs font-black text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"
              >
                <span>Solicitar Viabilidade</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="border border-slate-150 p-6 rounded-2xl space-y-4 hover:border-slate-350 transition-colors">
              <h4 className="font-bold text-sm text-slate-900 font-display">Casamentos ou Formaturas</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Para locais de campo, sítios rurais ou chácaras sem infraestrutura física. Garantimos transmissões ao vivo em alta definição com suporte de contingência técnica local.</p>
              <button
                onClick={() => handleCotar('Casamentos ou Formaturas')}
                className="text-xs font-black text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"
              >
                <span>Solicitar Viabilidade</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="border border-slate-150 p-6 rounded-2xl space-y-4 hover:border-slate-350 transition-colors">
              <h4 className="font-bold text-sm text-slate-900 font-display">Feiras e Exposições</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Estandes corporativos comerciais integrados, terminais de cartão de crédito operando sem picos de gargalo, lives de patrocinadores, e portais de cadastros integrados.</p>
              <button
                onClick={() => handleCotar('Feiras e Exposições')}
                className="text-xs font-black text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"
              >
                <span>Solicitar Viabilidade</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
