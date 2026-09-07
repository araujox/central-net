/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Sparkles } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { Plano } from '../types';

interface PlanosSectionProps {
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario' | 'contratos', tab?: 'residencial' | 'gamer' | 'casa-conectada' | 'radio' | 'empresarial') => void;
}

export default function PlanosSection({ setCurrentPage }: PlanosSectionProps) {
  const { data, formatWhatsappLink } = useCMS();

  // Filter only active residential plans from CMS
  const activeHomePlans = data.planos
    .filter((p) => p.categoria === 'residencial' && !(p as any).inativo);

  const plansToDisplay = activeHomePlans.length > 0 ? activeHomePlans : data.planos.filter(p => p.categoria === 'residencial');

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

  const handleContratar = (plano: Plano) => {
    const textMsg = `Olá! Gostaria de consultar a disponibilidade do plano "${plano.nome}" de "${plano.velocidade}" por "${plano.preco}/mês" para minha residência.`;
    const whatsappLink = formatWhatsappLink(textMsg);
    window.open(whatsappLink, '_blank', 'noreferrer,noopener');
  };

  // Helper to extract clean numeral from speed string (e.g. "500 Mega" -> "500")
  const getSpeedNumber = (speedStr: string) => {
    const match = speedStr.match(/\d+/);
    return match ? match[0] : speedStr;
  };

  // Helper to clean price (removes R$ if already present)
  const formatPriceDisplay = (priceStr: string) => {
    return priceStr.replace(/^R\$\s*/i, '').trim();
  };

  return (
    <section id="planos-residencias" className="py-24 bg-[#f8f7fc] relative overflow-hidden font-sans select-none">
      {/* Ambient gradient reflections */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100/20 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#004ecc]/5 border border-[#004ecc]/15 rounded-full text-xs font-black tracking-widest uppercase text-[#004ecc]">
            <Sparkles size={12} className="text-[#f26522] animate-pulse" />
            <span>{data.siteContent.heroTag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#004ecc] tracking-tight font-display">
            {data.siteContent.heroTitulo}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-extrabold uppercase tracking-widest text-[#004ecc]/80">
            {data.siteContent.heroSubtitulo}
          </p>
        </div>

        {/* Plans Rows stacked vertically matching the screenshots */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {plansToDisplay.map((plano) => {
            const speedNumber = getSpeedNumber(plano.velocidade);
            const priceNumber = formatPriceDisplay(plano.preco);
            const isPop = !!plano.bannerPopular;

            return (
              <div 
                key={plano.id}
                className={`flex flex-col lg:flex-row items-stretch justify-between bg-white rounded-[40px] p-2 pr-0 lg:pr-2 transition-all duration-300 relative group border ${
                  isPop 
                    ? 'border-[#004ecc] ring-3 ring-[#004ecc]/20 shadow-xl' 
                    : 'border-slate-100 shadow-md hover:shadow-xl hover:border-slate-300'
                }`}
              >
                {/* 1. Left capsule block: PLANO TIER NAME */}
                <div className="w-full lg:w-44 bg-[#004ecc] text-white rounded-t-[36px] lg:rounded-l-[36px] lg:rounded-tr-none flex flex-col justify-center items-center py-8 px-4 shrink-0 transition-colors group-hover:bg-[#003bb3]">
                  <span className="text-[10px] font-black tracking-widest uppercase text-sky-200">PLANO</span>
                  <span className="text-3xl font-black tracking-tighter uppercase font-display leading-none mt-1">
                    {plano.nome}
                  </span>
                  {isPop && (
                    <span className="mt-2 bg-[#f26522] text-white text-[8px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm animate-bounce">
                      MAIS PEDIDO
                    </span>
                  )}
                  {/* Small visual elegant arrow indicator */}
                  <div className="mt-4 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <ArrowRight size={10} className="text-white font-bold" />
                  </div>
                </div>

                {/* 2. Center visual content: Speed + Apps selection matrix */}
                <div className="flex-grow bg-white flex flex-col sm:flex-row items-center justify-between px-6 py-6 lg:py-4 gap-6">
                  {/* Left part of white center: Speed numeral + choice matrix */}
                  <div className="flex flex-col items-center sm:items-start shrink-0">
                    <div className="flex items-baseline gap-1 text-[#005cdc]">
                      <span className="text-6.5xl sm:text-7xl font-extrabold tracking-tighter font-display leading-none">
                        {speedNumber}
                      </span>
                    </div>

                    {/* App Selection Block exactly like the screenshots */}
                    <div className="mt-4 w-full text-center sm:text-left">
                      {plano.appHeadingPremium ? (
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <p className="text-[11px] font-black tracking-wider uppercase text-[#005cdc]">
                              {plano.appHeading || '1 App Standard:'}
                            </p>
                            <div className="flex items-center justify-center sm:justify-start gap-1">
                              {plano.appRows?.[0] ? (
                                plano.appRows[0].map((app) => renderAppBadge(app))
                              ) : (
                                ['exitlag', 'deezer', 'kaspersky', 'watch'].map((app) => renderAppBadge(app))
                              )}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[11px] font-black tracking-wider uppercase text-[#005cdc]">
                              {plano.appHeadingPremium}
                            </p>
                            <div className="flex items-center justify-center sm:justify-start gap-1">
                              {plano.appRowsPremium?.[0] ? (
                                plano.appRowsPremium[0].map((app) => renderAppBadge(app))
                              ) : (
                                ['prime', 'hbo', 'disney', 'watch'].map((app) => renderAppBadge(app))
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-[11px] font-black tracking-wider uppercase text-[#005cdc] mb-1.5">
                            {plano.appHeading || '1 App à sua escolha:'}
                          </p>
                          <div className="flex flex-col gap-1 items-center sm:items-start">
                            <div className="flex items-center gap-1">
                              {plano.appRows?.[0] ? (
                                plano.appRows[0].map((app) => renderAppBadge(app))
                              ) : (
                                ['exitlag', 'deezer', 'kaspersky', 'watch'].map((app) => renderAppBadge(app))
                              )}
                            </div>
                            {plano.appRows?.[1] && (
                              <div className="flex items-center gap-1">
                                {plano.appRows[1].map((app) => renderAppBadge(app))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right part of white center: Feature Pills list */}
                  <div className="flex flex-col justify-center space-y-2 w-full sm:w-auto">
                    {plano.pills && plano.pills.length > 0 ? (
                      plano.pills.map((pill, idx) => (
                        <div 
                          key={idx} 
                          className="bg-[#005cdc] text-white text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center justify-center sm:justify-start gap-1.5 shadow-xs uppercase tracking-tight text-center sm:text-left"
                        >
                          <span>{pill}</span>
                        </div>
                      ))
                    ) : (
                      plano.beneficios.slice(0, 3).map((ben, idx) => (
                        <div 
                          key={idx} 
                          className="bg-[#005cdc] text-white text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center justify-center sm:justify-start gap-1.5 shadow-xs uppercase tracking-tight text-center sm:text-left"
                        >
                          <span>{ben}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 3. Right capsule block: Price + Contratar Call-to-action */}
                <div className="w-full lg:w-56 bg-[#f26522] text-white rounded-b-[36px] lg:rounded-r-[36px] lg:rounded-bl-none flex flex-col justify-between items-center py-6 px-4 shrink-0 transition-colors group-hover:bg-[#e05615]">
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1 font-display">
                      <span className="text-xs font-bold uppercase tracking-wider">R$</span>
                      <span className="text-4xl sm:text-4.5xl font-black tracking-tight leading-none">
                        {priceNumber}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-100 block mt-0.5">
                      /MÊS
                    </span>
                    {plano.valorDepois && (
                      <span className="text-[9px] font-semibold text-white/90 block mt-1">
                        (depois R$ {plano.valorDepois}/mês)
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleContratar(plano)}
                    className="mt-6 w-full py-3 bg-white hover:bg-orange-50 text-[#f26522] rounded-full font-black text-xs uppercase tracking-wider shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>CONTRATAR</span>
                    <ArrowRight size={14} className="stroke-[3]" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom link to view full catalog */}
        <div className="mt-14 text-center">
          <button
            onClick={() => {
              setCurrentPage('assine', 'residencial');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-[#004ecc] text-[#004ecc] hover:text-white border-2 border-[#004ecc] font-black text-xs uppercase tracking-widest shadow-md transition-all duration-300 cursor-pointer transform hover:scale-105"
          >
            <span>Ver Todos os Planos e Categorias</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
