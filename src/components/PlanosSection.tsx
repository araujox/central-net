/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, ArrowRight, Sparkles, Wifi, Shield, Tv, Gamepad2, Award } from 'lucide-react';

interface PlanosSectionProps {
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario' | 'contratos', tab?: 'residencial' | 'gamer' | 'casa-conectada' | 'radio' | 'empresarial') => void;
}

export default function PlanosSection({ setCurrentPage }: PlanosSectionProps) {
  // 5 Main plans exactly matching the screenshots and specifications
  const HOME_PLANOS = [
    {
      id: 'res-300m-gold',
      nome: 'BASIC',
      velocidade: '300 Mega',
      preco: '64,99',
      pop: false,
      velocidadeNum: '300',
      pills: [
        'Roteador em comodato 5GHz/2,4GHz',
        'TV Central no Celular',
        'Instalação Grátis'
      ],
      appHeading: '1 App à sua escolha:',
      appRows: [
        ['exitlag', 'deezer', 'kaspersky', 'watch'],
        ['empty', 'empty', 'empty', 'empty']
      ]
    },
    {
      id: 'res-500m-platinum',
      nome: 'PLUS',
      velocidade: '500 Mega',
      preco: '69,99',
      pop: true,
      velocidadeNum: '500',
      valorDepois: '74,99',
      pills: [
        'Roteador em comodato 5GHz/2,4GHz',
        'TV Central no Celular',
        'Instalação Grátis'
      ],
      appHeading: '1 App à sua escolha:',
      appRows: [
        ['exitlag', 'deezer', 'kaspersky', 'watch'],
        ['empty', 'empty', 'empty', 'empty']
      ]
    },
    {
      id: 'casa-total-basic',
      nome: 'PRO',
      velocidade: '600 Mega',
      preco: '89,99',
      pop: false,
      velocidadeNum: '600',
      pills: [
        'Roteador em comodato 5GHz/2,4GHz',
        'TV Central no Celular',
        'Instalação Grátis'
      ],
      appHeading: '1 App à sua escolha:',
      appRows: [
        ['exitlag', 'deezer', 'kaspersky', 'watch'],
        ['hbo', 'disney', 'empty', 'empty']
      ]
    },
    {
      id: 'gamer-premium-800',
      nome: 'PRO',
      velocidade: '800 Mega',
      preco: '104,99',
      pop: false,
      velocidadeNum: '800',
      pills: [
        'até 2 Roteadores em comodato 5GHz/2,4GHz',
        'Cabeamento Completo',
        'Instalação Grátis',
        'Wi-fi 6'
      ],
      appHeading: '1 App à sua escolha:',
      appRows: [
        ['exitlag', 'deezer', 'kaspersky', 'watch'],
        ['empty', 'hbo', 'disney', 'empty']
      ]
    },
    {
      id: 'gigabit-premium-1000',
      nome: 'ULTRA',
      velocidade: '1000 Mega',
      preco: '99,99',
      pop: false,
      velocidadeNum: '1000',
      pills: [
        'Roteador em comodato 5GHz/2,4GHz',
        'Instalação Grátis'
      ],
      appHeading: '1 App Standard à sua escolha:',
      appHeadingPremium: '1 App Premium à sua escolha:',
      appRows: [
        ['exitlag', 'deezer', 'kaspersky', 'nutri']
      ],
      appRowsPremium: [
        ['prime', 'hbo', 'disney', 'watch']
      ]
    }
  ];

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

  const handleContratar = (plano: typeof HOME_PLANOS[0]) => {
    const textMsg = `Olá! Gostaria de consultar a disponibilidade do plano "${plano.nome}" de "${plano.velocidade}" por "R$ ${plano.preco}/mês" para minha residência.`;
    const encoded = encodeURIComponent(textMsg);
    const whatsappLink = `https://wa.me/5581995009874?text=${encoded}`;
    window.open(whatsappLink, '_blank', 'noreferrer,noopener');
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
            <span>Fibra Óptica</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#004ecc] tracking-tight font-display">
            Internet Rápida 100% Fibra Óptica
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-extrabold uppercase tracking-widest text-[#004ecc]/80">
            Encontre a velocidade perfeita para a sua necessidade
          </p>
        </div>

        {/* 5 Plans Rows stacked vertically matching the screenshots */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {HOME_PLANOS.map((plano) => {
            return (
              <div 
                key={plano.id}
                className={`flex flex-col lg:flex-row items-stretch justify-between bg-white rounded-[40px] p-2 pr-0 lg:pr-2 transition-all duration-300 relative group border ${
                  plano.pop 
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
                  {plano.pop && (
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
                        {plano.velocidadeNum}
                      </span>
                      {/* Space right of number */}
                    </div>

                    {/* App Selection Block exactly like the screenshots */}
                    <div className="mt-4 w-full text-center sm:text-left">
                      {/* 1000 Mega with multiple custom headers */}
                      {plano.appHeadingPremium ? (
                        <div className="space-y-4">
                          {/* Standard selection */}
                          <div className="space-y-1">
                            <span className="text-[8px] sm:text-[9.5px] text-[#005cdc] font-black block leading-none tracking-tight">
                              {plano.appHeading}
                            </span>
                            <div className="flex items-center gap-1 mt-1 justify-center sm:justify-start">
                              {plano.appRows[0].map((badge) => renderAppBadge(badge))}
                            </div>
                          </div>
                          {/* Premium selection */}
                          <div className="space-y-1">
                            <span className="text-[8px] sm:text-[9.5px] text-[#005cdc] font-black block leading-none tracking-tight">
                              {plano.appHeadingPremium}
                            </span>
                            <div className="flex items-center gap-1 mt-1 justify-center sm:justify-start">
                              {plano.appRowsPremium?.[0].map((badge) => renderAppBadge(badge))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Standard selection for 300, 500, 600, 800
                        <div className="space-y-1">
                          <span className="text-[8px] sm:text-[9.5px] text-[#005cdc] font-black block leading-none tracking-tight">
                            {plano.appHeading}
                          </span>
                          <div className="space-y-1.5 mt-1.5">
                            {plano.appRows.map((row, idx) => (
                              <div key={idx} className="flex items-center gap-1 justify-center sm:justify-start">
                                {row.map((badge) => renderAppBadge(badge))}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right part of white center: Benefit pills list (rounded, light gray, blue text) */}
                  <div className="flex flex-col gap-2 w-full sm:w-auto sm:max-w-[240px] items-stretch">
                    {plano.pills.map((pillTxt, pIdx) => (
                      <div 
                        key={pIdx} 
                        className="bg-[#efeef4] text-[#053d79] text-[9.5px] font-black uppercase tracking-tight py-2 px-3.5 rounded-full text-center sm:text-left leading-none shadow-xs border border-slate-200/50"
                      >
                        {pillTxt}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Right block: Pricing + Orange arrow CTA */}
                <div className="w-full lg:w-56 bg-[#004ecc] text-white rounded-b-[36px] lg:rounded-r-[36px] lg:rounded-bl-none flex items-center justify-between lg:justify-center px-8 lg:px-4 py-8 relative shrink-0">
                  
                  {/* Floating price notice over desktop right block header */}
                  {plano.valorDepois && (
                    <div className="absolute -top-3 right-6 sm:right-10 lg:right-4 text-[#004ecc] bg-[#FFE066] text-[8.5px] font-black uppercase tracking-wider px-2 py-1 rounded-full shadow-sm z-30 select-none pointer-events-none transform rotate-[-1deg]">
                      depois de 3 meses fica por R$ {plano.valorDepois}
                    </div>
                  )}

                  {/* Circular Orange CVC badge overlapping bottom right */}
                  <div className="absolute right-4 -bottom-6 w-14 h-14 rounded-full bg-[#f26522] border-2 border-white flex flex-col items-center justify-center text-center shadow-lg transform rotate-[-8deg] z-20 hover:scale-110 hover:rotate-0 transition-all duration-300 pointer-events-none select-none">
                    <span className="text-[6px] text-orange-100 font-extrabold uppercase tracking-widest leading-none">CLUBE DE</span>
                    <span className="text-xs font-black tracking-tighter leading-none my-0.5">CVC</span>
                    <span className="text-[6px] text-orange-100 font-extrabold uppercase tracking-widest leading-none">VANTAGENS</span>
                  </div>

                  {/* Price display tags */}
                  <div className="flex flex-col text-left lg:text-center shrink-0 w-full">
                    <span className="text-[9px] text-sky-200 font-extrabold uppercase tracking-widest block leading-none">
                      POR APENAS
                    </span>
                    <div className="flex items-baseline gap-0.5 mt-1 justify-start lg:justify-center">
                      <span className="text-sm font-black text-sky-200">R$</span>
                      <span className="text-3.5xl sm:text-4.5xl font-black tracking-tight leading-none text-[#ffffff]">
                        {plano.preco}
                      </span>
                      <span className="text-[10px] text-sky-200 font-extrabold">/MÊS</span>
                    </div>
                  </div>

                  {/* Absolute circle action pointer arrow button */}
                  <button
                    onClick={() => handleContratar(plano)}
                    className="lg:absolute lg:right-[-20px] lg:top-1/2 lg:-translate-y-1/2 w-11 h-11 rounded-full bg-[#f26522] text-white flex items-center justify-center shadow-lg border border-orange-400 hover:scale-110 hover:bg-orange-600 hover:rotate-90 transition-all duration-300 pointer-events-auto cursor-pointer"
                    title="Conversar Agora"
                  >
                    <ArrowRight size={18} className="stroke-[3]" />
                  </button>

                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Call to Actions */}
        <div className="text-center pt-16">
          <button 
            onClick={() => {
              setCurrentPage('assine');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-black uppercase text-[#004ecc] bg-white border border-slate-200 px-6 py-3 rounded-2xl hover:bg-[#004ecc] hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <span>Conhecer outras opções e contratos</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
