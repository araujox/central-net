/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, MapPin, ArrowUpRight, ShieldCheck, Mail, Instagram, Facebook } from 'lucide-react';
import { CONTATO_CENTRALNET } from '../types';
import CentralNetLogo from './CentralNetLogo';

interface FooterProps {
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario' | 'contratos', tab?: 'residencial' | 'gamer' | 'casa-conectada' | 'radio' | 'empresarial') => void;
  scrollSection: (sectionId: string) => void;
}

export default function Footer({ setCurrentPage, scrollSection }: FooterProps) {
  const handleNav = (target: 'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario' | 'contratos', sectionIdOrTab?: string) => {
    const isTab = sectionIdOrTab && ['residencial', 'gamer', 'casa-conectada', 'radio', 'empresarial'].includes(sectionIdOrTab);
    
    if (isTab) {
      setCurrentPage(target, sectionIdOrTab as any);
    } else {
      setCurrentPage(target);
    }
    
    if (sectionIdOrTab && !isTab) {
      setTimeout(() => {
        const el = document.getElementById(sectionIdOrTab);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#003989] text-white font-sans select-none relative overflow-hidden border-t-2 border-orange-550/30">
      
      {/* Decorative upper grid light representing Figma vectors */}
      <div className="absolute top-0 left-0 right-0 h-[10px] bg-gradient-to-r from-[#005CDC] via-[#ffcc00] to-[#f26522]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Column 1 (lg:col-span-4): Sobre Nós & Atendimentos */}
          <div className="lg:col-span-5 space-y-8">
            <div className="cursor-pointer group inline-block" onClick={() => handleNav('home')}>
              <CentralNetLogo theme="dark" size="lg" />
            </div>

            {/* About text from Figma */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-black tracking-widest text-[#FFCC00]">Sobre Nós</h4>
              <p className="text-[14px] leading-relaxed text-zinc-100 text-justify">
                A CentralNet é uma empresa dedicada a fornecer acesso à internet com qualidade e eficiência, conectando nossos clientes às informações disponíveis em todo o mundo. Nosso compromisso é facilitar o acesso ao conhecimento, ampliar oportunidades e garantir uma comunicação rápida e segura, aproximando pessoas em qualquer lugar.
              </p>
            </div>

            {/* Presencial and Online attendance from Figma */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-white/10">
              <div className="space-y-2">
                <span className="text-xs font-black text-[#FFCC00] uppercase tracking-wider block">Atendimento Presencial:</span>
                <p className="text-[13px] leading-normal text-slate-100 font-semibold">
                  Segunda à Sexta: 8h às 18h<br />
                  Sábado: 8h às 17h
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black text-[#FFCC00] uppercase tracking-wider block">Atendimento Online:</span>
                <p className="text-[13px] leading-normal text-slate-100 font-semibold">
                  Domingo e Feriados: 8h às 16h
                </p>
              </div>
            </div>
          </div>

          {/* Column 2 (lg:col-span-3): Quick links & Redes sociais */}
          <div className="lg:col-span-3 space-y-8">
            {/* Apps download section from Figma */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-black tracking-widest text-[#FFCC00] font-display">Baixe o app CentralNet.</h4>
              
              {/* Fake download badges with modern high fidelity styling */}
              <div className="flex flex-col gap-2.5 max-w-[200px]">
                <a 
                  href="https://sgp.centralnetsurubim.com.br/accounts/central/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/40 hover:bg-black/60 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3 transition-colors text-left"
                >
                  <span className="text-[10px] text-white/70 block uppercase leading-none font-bold">Disponível no</span>
                  <span className="text-xs text-white block uppercase leading-none font-black tracking-wider mt-0.5">Google Play</span>
                </a>
                <a 
                  href="https://sgp.centralnetsurubim.com.br/accounts/central/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/40 hover:bg-black/60 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3 transition-colors text-left"
                >
                  <span className="text-[10px] text-white/70 block uppercase leading-none font-bold">Baixar na</span>
                  <span className="text-xs text-white block uppercase leading-none font-black tracking-wider mt-0.5">App Store</span>
                </a>
              </div>
            </div>

            {/* Social media connections from Figma */}
            <div className="space-y-3.5">
              <h4 className="text-xs uppercase font-black tracking-widest text-[#FFCC00] font-display">Nossas Redes Sociais:</h4>
              <div className="flex items-center gap-3">
                <a 
                  href={CONTATO_CENTRALNET.redesSociais.instagram}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#003989] flex items-center justify-center transition-colors shadow-sm"
                  title="Siga no Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href={CONTATO_CENTRALNET.redesSociais.facebook}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#003989] flex items-center justify-center transition-colors shadow-sm"
                  title="Siga no Facebook"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {/* Sub-navigation items for easier customer access */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase font-black tracking-widest text-white/60 font-display">Navegação Rápida</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                <li><button onClick={() => handleNav('cnmovel')} className="text-slate-200 hover:text-white transition-colors">CN Móvel</button></li>
                <li><button onClick={() => handleNav('gps')} className="text-slate-200 hover:text-white transition-colors">CN GPS</button></li>
                <li><button onClick={() => handleNav('assine', 'residencial')} className="text-slate-200 hover:text-white transition-colors">Fibra Óptica</button></li>
                <li><button onClick={() => handleNav('assine', 'gamer')} className="text-slate-200 hover:text-white transition-colors">Planos Gamer</button></li>
                <li><button onClick={() => handleNav('dedicado')} className="text-slate-200 hover:text-white transition-colors">Link Dedicado</button></li>
                <li><button onClick={() => handleNav('contratos')} className="text-slate-200 hover:text-white transition-colors">Contratos</button></li>
              </ul>
            </div>
          </div>

          {/* Column 3 (lg:col-span-4): Para Contato & Precisa de Ajuda */}
          <div className="lg:col-span-4 space-y-8">
            {/* Contact numbers and email strictly matching Figma Spec */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-black tracking-widest text-[#FFCC00] font-display">Para contato:</h4>
              <ul className="space-y-3.5 text-[14px]">
                <li className="flex items-center gap-3 text-slate-100 hover:text-white">
                  <Mail size={16} className="text-[#FFCC00] shrink-0" />
                  <a href="mailto:atendimento@centralnetsurubim.com.br" className="underline transition-colors">
                    atendimento@centralnetsurubim.com.br
                  </a>
                </li>
                <li className="flex items-center gap-3 text-slate-100">
                  <Phone size={16} className="text-[#FFCC00] shrink-0" />
                  <a href="https://wa.me/5581982082627" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">
                    (81) 9 8208-2627
                  </a>
                </li>
                <li className="flex items-center gap-3 text-slate-100">
                  <Phone size={16} className="text-[#FFCC00] shrink-0" />
                  <a href="https://wa.me/5581995008974" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">
                    (81) 9 9500-8974
                  </a>
                </li>
              </ul>
            </div>

            {/* SGP Subscriber center links / Help section */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-black tracking-widest text-[#FFCC00] font-display">Precisa de ajuda?</h4>
              
              <div className="flex flex-col gap-2.5">
                <a 
                  href="https://sgp.centralnetsurubim.com.br/accounts/central/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/15 text-white py-2.5 px-4 rounded-xl flex items-center justify-between text-xs font-bold transition-all border border-white/5"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#FFCC00]" />
                    <span>2ª Via do Boleto (SGP)</span>
                  </span>
                  <ArrowUpRight size={14} className="opacity-60" />
                </a>

                <a 
                  href="https://wa.me/5581995009874?text=Ol%C3%A1%2521%2520Gostaria%2520de%2520solicitar%2520suporte%2520da%2520CentralNet."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#f26522] hover:bg-[#d85517] text-white py-2.5 px-4 rounded-xl flex items-center justify-between text-xs font-black uppercase tracking-wider transition-all"
                >
                  <span>Suporte Técnico</span>
                  <ArrowUpRight size={14} />
                </a>

                <a 
                  href="https://wa.me/5581995009874?text=Ol%C3%A1%2521%2520Gostaria%2520de%2520registrar%2520uma%2520sugest%25C3%25A3o%2520ou%2520reclama%25C3%25A7%25C3%25A3o%2520na%2520Ouvidoria."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 text-white py-2 px-4 rounded-xl text-center text-[11px] font-semibold block transition-colors border border-white/5"
                >
                  Ouvidoria Geral
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Copy of address and privacy terms bottom panel */}
      <div className="border-t border-white/10 bg-black/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[13px] text-slate-100">
          
          <div className="space-y-1.5 text-center md:text-left">
            <span className="font-extrabold text-[15px] block text-white">© {currentYear} CentralNet</span>
            <p className="text-[12px] opacity-80 leading-normal max-w-md">
              Avenida São Sebastião, 613 São Sebastião – Surubim/PE
            </p>
          </div>

          <div className="flex flex-col md:flex-end items-center md:items-end gap-1 font-semibold text-right">
            <div className="flex items-center gap-2.5">
              <button onClick={() => handleNav('contratos')} className="hover:underline hover:text-white transition-all text-[#FFCC00]">
                Política de Privacidade
              </button>
              <span className="opacity-40">|</span>
              <button onClick={() => handleNav('contratos')} className="hover:underline hover:text-white transition-all text-[#FFCC00]">
                Termos e Condições
              </button>
            </div>
            
            <span className="text-[11px] opacity-60 font-mono mt-1">
              SCM REGULADA ANATEL • Desenvolvido por Matheus Araújo
            </span>
          </div>

        </div>
      </div>
      
    </footer>
  );
}
