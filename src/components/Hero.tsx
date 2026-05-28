/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, MessageCircle, User, Shield, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { CONTATO_CENTRALNET } from '../types';

interface HeroProps {
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel') => void;
}

export default function Hero({ setCurrentPage }: HeroProps) {
  return (
    <section id="principal" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-slate-900 overflow-hidden">
      {/* Abstract Grid + Glowing Orbs Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b1a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
      
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-orange-500/15 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: Headings and Actions */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-200 text-xs font-semibold tracking-wide">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <Sparkles size={14} className="text-orange-500" />
              <span>Conexão Gigabit Real & Estabilidade Total</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-display">
              Internet fibra óptica para sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">casa</span>, <span className="text-orange-500">empresa</span> e rotina digital.
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Planos de internet rápidos, estáveis e com suporte próximo para você navegar, jogar, trabalhar e assistir sem preocupação. Descubra a verdadeira velocidade em Surubim e região.
            </p>

            {/* Hero CTA Buttons Container (As specified by user - 4 Mandatory CTAs) */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3.5 pt-4">
              
              {/* Button 1: Assine agora */}
              <button
                id="hero-cta-assine"
                onClick={() => setCurrentPage('assine')}
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-4 rounded-xl shadow-lg shadow-orange-500/10 transition-all transform hover:scale-105 active:scale-95 duration-350 group cursor-pointer text-sm"
              >
                <span>Assine agora</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Button 2: Falar no WhatsApp */}
              <a
                id="hero-cta-whatsapp"
                href={CONTATO_CENTRALNET.whatsappUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-7 py-4 rounded-xl shadow-md transition-all transform hover:scale-105 active:scale-95 duration-300 text-sm"
              >
                <MessageCircle size={18} className="fill-white stroke-none" />
                <span>Falar no WhatsApp</span>
              </a>

              {/* Button 3: Acessar Central do Assinante */}
              <a
                id="hero-cta-central"
                href="https://sgp.centralnetsurubim.com.br/accounts/central/login"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold px-6 py-4 rounded-xl border border-white/10 transition-all transform hover:scale-105 active:scale-95 duration-300 text-sm"
              >
                <User size={18} className="text-blue-400" />
                <span>Acessar Central do Assinante</span>
              </a>

              {/* Button 4: Conhecer Rastreamento Veicular */}
              <button
                id="hero-cta-gps"
                onClick={() => setCurrentPage('gps')}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-850 text-sky-400 font-bold px-6 py-4 rounded-xl border border-sky-500/30 hover:border-sky-400 transition-all transform hover:scale-105 active:scale-95 duration-300 text-sm"
              >
                <Shield size={18} className="text-sky-400" />
                <span>Conhecer Rastreamento Veicular</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 pt-2 text-slate-400 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-500" /> Wi-Fi Grátis Incluso
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-500" /> Sem Custo de Telefone
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-500" /> Suporte Técnico Exclusivo
              </span>
            </div>

          </div>

          {/* RIGHT SIDE: Immersive Interactive Concept Wireframe */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <div className="relative w-full max-w-md p-6 bg-slate-800/40 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md overflow-hidden animate-pulse-[6000ms] group hover:border-sky-500/20 transition-all">
              
              {/* Outer decorative light streaks */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/10 rounded-full filter blur-xl"></div>
              
              {/* Speedometer Graphics */}
              <div className="text-center space-y-4 relative z-10">
                <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Indicador Técnico de Performance</p>
                
                <div className="w-56 h-56 mx-auto relative flex items-center justify-center">
                  {/* Circular Arc SVG */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="transparent" />
                    <circle cx="50" cy="50" r="40" stroke="#f26522" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="65" />
                    <circle cx="50" cy="50" r="40" stroke="#004ecc" strokeWidth="2" fill="transparent" strokeDasharray="251.2" strokeDashoffset="120" />
                  </svg>
                  
                  {/* Number display inside */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <Zap size={32} className="text-brand-orange animate-bounce mb-1" />
                    <span className="text-4xl font-extrabold text-white tracking-tight font-display">600<span className="text-lg">MB</span></span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full mt-1">100% FIBRA ÓPTICA</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-900/50 p-3 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">Latência</span>
                    <span className="text-base font-black text-emerald-400 font-display">2 ms</span>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">Perda de Pacotes</span>
                    <span className="text-base font-black text-emerald-400 font-display">0.0%</span>
                  </div>
                </div>

                {/* Sub-label explaining stability */}
                <p className="text-[11px] text-slate-400 leading-normal">
                  Nossa rede de ultra-capacidade garante o menor ping, ideal para canais de streaming em altíssima definição e carregamentos instantâneos.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
