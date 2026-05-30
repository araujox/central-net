/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Wifi, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface ChipSectionProps {
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario' | 'contratos', tab?: 'residencial' | 'gamer' | 'casa-conectada' | 'radio' | 'empresarial') => void;
}

export default function ChipCentralNetSection({ setCurrentPage }: ChipSectionProps) {
  return (
    <section id="chip-centralnet" className="bg-[#004ecc] relative overflow-hidden select-none font-sans py-16 md:py-24 my-12 md:my-16 rounded-[40px] mx-4 sm:mx-6 lg:mx-8 shadow-2xl border border-white/10">
      
      {/* Immersive background decoration mimicking the visual language */}
      <div className="absolute -top-12 -left-12 w-80 h-80 bg-orange-500/10 rounded-full pointer-events-none blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#00dd50]/5 rounded-full pointer-events-none blur-3xl" />
      <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-white/5 rounded-full pointer-events-none blur-3xl animate-pulse" />

      {/* Decorative Animated Seagulls drifting slowly in the section container */}
      <motion.div 
        className="absolute top-8 left-[10%] opacity-35 hidden md:block"
        animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="32" height="12" viewBox="0 0 32 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 11C6 6 11 9 16 3C21 9 26 6 31 11" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </motion.div>

      <motion.div 
        className="absolute top-24 left-[45%] opacity-25 hidden lg:block"
        animate={{ y: [0, -12, 0], x: [0, -4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <svg width="24" height="9" viewBox="0 0 24 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 8C5 4 9 6.5 12 2C15 6.5 19 4 23 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          
          {/* Left Block: Perfect Portuguese copy pairing & custom detailed benefits */}
          <div className="md:col-span-7 lg:col-span-6 text-center md:text-left space-y-6 md:space-y-8">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white tracking-wider uppercase border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00dd50] animate-ping" />
              Internet Móvel 4G / 5G
            </span>

            <h2 className="text-white text-3xl sm:text-4xl lg:text-[44px] font-sans font-medium leading-[1.2] tracking-tight">
              Com o <strong className="font-extrabold text-white">Chip CentralNet</strong>,<br /> sua conexão não fica limitada ao <strong className="font-extrabold text-white">Wi-Fi de Casa</strong>
            </h2>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-lg mx-auto md:mx-0">
              Leve a internet de ultravelocidade da CentralNet para as ruas. Conexão estável em ligações, redes sociais, mapas e streaming onde quer que você vá.
            </p>

            {/* Unique features widgets to represent value and give life */}
            <div className="grid grid-cols-2 gap-4 max-w-sm sm:max-w-md mx-auto md:mx-0 pt-2 text-left">
              <div className="flex items-start gap-3 bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/5">
                <div className="p-2 rounded-xl bg-white/10 text-white shrink-0">
                  <Wifi size={16} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Rede 5G Max</h4>
                  <p className="text-[10px] text-blue-200">Velocidade e menor latência</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/5">
                <div className="p-2 rounded-xl bg-white/10 text-white shrink-0">
                  <ShieldCheck size={16} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Zero Bloqueios</h4>
                  <p className="text-[10px] text-blue-200">Navegue sem preocupações</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
              <button
                onClick={() => {
                  setCurrentPage('cnmovel');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 active:scale-97 text-[#004ecc] font-bold text-sm sm:text-base px-8 py-4.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
              >
                <span>Conheça o nosso Chip</span>
                <ArrowRight size={16} className="stroke-[2.5] text-[#004ecc]" />
              </button>
            </div>
          </div>

          {/* Right Block: Dynamic SIM Card card with Rounded Borders exactly requested by user */}
          <div className="md:col-span-5 lg:col-span-6 flex justify-center items-center relative group">
            
            {/* Animated background glow behind the card */}
            <div className="absolute top-12 left-12 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl group-hover:scale-125 transition-all duration-700 pointer-events-none" />
            <div className="absolute bottom-12 right-12 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl group-hover:scale-125 transition-all duration-700 pointer-events-none" />

            {/* Custom rounded border card presentation */}
            <div className="relative max-w-sm sm:max-w-md w-full flex justify-center z-10">
              
              {/* Main rounded frame container containing the chip.png */}
              <motion.div 
                className="relative overflow-hidden rounded-[40px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-white/10 bg-[#004ecc] scale-100 group-hover:scale-[1.03] transition-all duration-500"
                whileHover={{ rotate: 1.5 }}
              >
                <img 
                  src="/chip.png" 
                  alt="Chip CentralNet" 
                  className="w-full h-auto object-cover select-none" 
                  referrerPolicy="no-referrer"
                />

                {/* Subtle soft gradient highlight sweep to simulate physical card gleam */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              </motion.div>

              {/* Decorative Flying White Bird Badge overlay (3D effect hovering out of the frame) */}
              <motion.div 
                className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 z-20 bg-gradient-to-br from-[#f26522] to-orange-600 p-3 sm:p-4 rounded-3xl shadow-lg border border-orange-400/30 flex items-center gap-2 text-white"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap size={16} className="text-yellow-300 fill-yellow-300" />
                <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase">INTERNET 5G</span>
              </motion.div>

              {/* Decorative Signal Wave Icon overlay */}
              <motion.div 
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 z-20 bg-[#00dd50] p-3 rounded-2xl shadow-lg border border-[#2bf374]/30 flex items-center justify-center text-white"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <Wifi size={18} className="stroke-[3] text-emerald-950" />
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
