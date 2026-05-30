/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { TrendingUp, LifeBuoy, Sparkles, Wallet, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const BENEFICIOS_FIGMA = [
  {
    icon: TrendingUp,
    titulo: '100% Fibra Óptica',
    descricao: 'Internet de verdade, com fibra óptica do início ao fim, garantindo mais velocidade, estabilidade e qualidade no seu dia a dia.',
  },
  {
    icon: LifeBuoy,
    titulo: 'Conexão Ilimitada',
    descricao: 'Use à vontade, sem limite de dados e sem surpresas. Navegue, jogue, assista e trabalhe sem se preocupar.',
  },
  {
    icon: Sparkles,
    titulo: 'Planos Acessíveis',
    descricao: 'Planos que cabem no seu bolso, com ótimo custo-benefício e a velocidade que você realmente precisa.',
  },
  {
    icon: Wallet,
    titulo: 'Indique e Ganhe',
    descricao: 'Indique um amigo, ele contrata nossa internet e você ganha um Pix. Simples assim: indicou, ganhou.',
  },
  {
    icon: Settings,
    titulo: 'Suporte Especializado',
    descricao: 'Atendimento rápido e humano, com uma equipe pronta para resolver e cuidar da sua conexão sempre que precisar.',
  }
];

export default function Beneficios() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % BENEFICIOS_FIGMA.length);
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + BENEFICIOS_FIGMA.length) % BENEFICIOS_FIGMA.length);
  };

  // Autoplay cycle
  useEffect(() => {
    if (!isHovered) {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isHovered]);

  const ActiveIcon = BENEFICIOS_FIGMA[activeIdx].icon;

  return (
    <section id="vem-ser-centralnet" className="py-24 bg-[#ED4E07] text-white relative overflow-hidden select-none font-sans">
      {/* Background radial soft light overlay representing Figma elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header Block exactly matching the Frame 61 from Figma */}
        <div className="text-left space-y-4 max-w-4xl">
          <h2 className="text-5xl sm:text-7xl font-sans font-light tracking-tight text-[#EEEEEE] leading-[1.05]">
            Vem ser CentralNet!
          </h2>
          <p className="text-2xl sm:text-3xl font-sans font-medium text-[#EEEEEE] opacity-90 leading-tight">
            Tudo que a CentralNet oferece para você:
          </p>
        </div>

        {/* Carousel layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          
          {/* Left Column: Interactive tabs on desktop for instant navigation */}
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-3.5 justify-center">
            {BENEFICIOS_FIGMA.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeIdx;
              return (
                <button
                  key={index}
                  onClick={() => setActiveIdx(index)}
                  className={`w-full text-left flex items-center gap-4 px-6 py-5 rounded-[24px] transition-all duration-300 outline-none cursor-pointer ${
                    isActive 
                      ? 'bg-[#FFF1E6] text-[#ED4E07] font-bold shadow-lg scale-[1.02] border-l-4 border-[#ffcc00]' 
                      : 'bg-white/5 hover:bg-white/10 text-white opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-[#ED4E07]/10 text-[#ED4E07]' : 'bg-white/10 text-white'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <span className={`text-[10px] uppercase font-black tracking-widest block leading-none mb-1 ${
                      isActive ? 'text-[#ED4E07]/60' : 'text-orange-200/50'
                    }`}>
                      Tópico {index + 1}
                    </span>
                    <span className="text-base font-black font-display tracking-tight truncate block leading-tight">{item.titulo}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Carousel viewport display card */}
          <div 
            className="col-span-1 lg:col-span-7 flex flex-col justify-between"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Active Display Card - key attribute forces animated re-render */}
            <div 
              key={activeIdx}
              className="relative overflow-hidden bg-[#FFF1E6] border border-[#D9D9D9] rounded-[32px] p-8 sm:p-12 min-h-[380px] sm:min-h-[420px] flex flex-col justify-between text-left group shadow-2xl transition-all duration-500 animate-fadeIn"
            >
              {/* Radial glow shape decoration */}
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-[#ED4E07]/5 rounded-full pointer-events-none filter blur-xl"></div>
              
              <div className="space-y-6 relative z-10 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-[20px] bg-[#ED4E07]/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
                    <ActiveIcon size={32} className="text-[#ED4E07]" />
                  </div>
                  <span className="text-xs font-black text-[#ED4E07] uppercase bg-[#ED4E07]/10 px-3.5 py-1.5 rounded-full tracking-widest font-mono">
                    {activeIdx + 1} de {BENEFICIOS_FIGMA.length}
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium text-[#ED4E07] leading-tight tracking-tight">
                    {BENEFICIOS_FIGMA[activeIdx].titulo}
                  </h3>
                  <p className="text-base sm:text-[18px] text-[#525252] leading-relaxed font-sans font-normal opacity-90">
                    {BENEFICIOS_FIGMA[activeIdx].descricao}
                  </p>
                </div>
              </div>

              {/* Action buttons and pagers block */}
              <div className="pt-8 border-t border-[#ED4E07]/10 flex items-center justify-between relative z-10 mt-6">
                
                {/* Interactive Dot indicators for click-to-nav */}
                <div className="flex items-center gap-2">
                  {BENEFICIOS_FIGMA.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === activeIdx ? 'w-8 bg-[#ED4E07]' : 'w-2.5 bg-[#ED4E07]/20 hover:bg-[#ED4E07]/40'
                      }`}
                      title={`Ver benefício ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Left/Right controls */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={prevSlide}
                    className="w-11 h-11 rounded-full border border-[#ED4E07]/20 text-[#ED4E07] hover:bg-[#ED4E07] hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer"
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={18} className="stroke-[2.5]" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-11 h-11 rounded-full bg-[#ED4E07] hover:bg-[#d44300] text-white flex items-center justify-center transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
                    aria-label="Próximo"
                  >
                    <ChevronRight size={18} className="stroke-[2.5]" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

