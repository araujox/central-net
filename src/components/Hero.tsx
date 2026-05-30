/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { CONTATO_CENTRALNET } from '../types';

interface HeroProps {
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario' | 'contratos', tab?: 'residencial' | 'gamer' | 'casa-conectada' | 'radio' | 'empresarial') => void;
}

const HERO_SLIDES = [
  {
    image: '/Captura de tela 2026-05-30 102302.png',
    alt: 'Internet acompanha sua rotina',
    target: 'assine',
    tab: 'residencial' as const
  },
  {
    image: '/Captura de tela 2026-05-30 102321.png',
    alt: 'A internet mais rápida da região',
    target: 'assine',
    tab: 'gamer' as const
  },
  {
    image: '/Captura de tela 2026-05-30 102422.png',
    alt: 'Benefícios e Planos CentralNet',
    target: 'cnmovel',
    tab: undefined
  }
];

export default function Hero({ setCurrentPage }: HeroProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    if (!isHovered) {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isHovered]);

  const handleSlideClick = (slide: typeof HERO_SLIDES[0]) => {
    if (slide.target) {
      setCurrentPage(slide.target as any, slide.tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="principal" 
      className="relative w-full pt-[76px] lg:pt-[84px] overflow-hidden bg-[#005CDC] select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[2.42/1] min-h-[280px] sm:min-h-[440px] md:min-h-[540px] lg:min-h-[580px] overflow-hidden">
        
        {/* Slides Track */}
        <div 
          className="flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeIdx * 100}%)` }}
        >
          {HERO_SLIDES.map((slide, index) => (
            <div 
              key={index} 
              onClick={() => handleSlideClick(slide)}
              className="w-full h-full shrink-0 relative cursor-pointer active:scale-99 transition-transform duration-150"
            >
              <img 
                src={slide.image} 
                alt={slide.alt}
                className="w-full h-full object-cover md:object-fill"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Overlay Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-all duration-300 md:opacity-0 group-hover:opacity-100 z-20 backdrop-blur-xs cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Slide anterior"
        >
          <ChevronLeft size={24} className="stroke-[2.5]" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-all duration-300 md:opacity-0 group-hover:opacity-100 z-20 backdrop-blur-xs cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Próximo slide"
        >
          <ChevronRight size={24} className="stroke-[2.5]" />
        </button>

        {/* Floating WhatsApp Quick Action strictly matching Figma overlay design */}
        <div className="absolute right-6 bottom-6 z-20 hidden md:block group-hover:scale-102 transition-transform">
          <a
            href={CONTATO_CENTRALNET.whatsappUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#42C151] hover:bg-[#34a342] text-white px-5 py-3 rounded-full shadow-lg font-bold text-sm tracking-wide transition-all duration-300 transform cursor-pointer"
          >
            <span>Fale com nosso atendimento</span>
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#42C151]">
              <MessageCircle size={14} className="fill-[#42C151] stroke-none" />
            </div>
          </a>
        </div>

        {/* Bottom Pager Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20 bg-black/10 px-4 py-2 rounded-full backdrop-blur-xs">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); setActiveIdx(index); }}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIdx ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/60'
              }`}
              title={`Ir para o slide ${index + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Screen Reader and Accessibility Descriptor Banner */}
      <div className="sr-only">
        <h2>CentralNet Banners Principais</h2>
        <p>Acompanhe sua rotina com a internet mais estável, fibra óptica e atendimento especializado em Surubim e região.</p>
      </div>
    </section>
  );
}
