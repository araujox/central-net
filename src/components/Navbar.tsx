/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Check, Phone, ArrowUpRight, ShieldCheck, Gamepad2, Laptop, Wifi, Shield, Radio, Sparkles } from 'lucide-react';
import { CONTATO_CENTRALNET } from '../types';
import CentralNetLogo from './CentralNetLogo';

interface NavbarProps {
  currentPage: 'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario' | 'contratos';
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario' | 'contratos', tab?: 'residencial' | 'gamer' | 'casa-conectada' | 'radio' | 'empresarial') => void;
  scrollSection: (sectionId: string) => void;
}

export default function Navbar({ currentPage, setCurrentPage, scrollSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'paraVoce' | 'paraEmpresas' | 'atendimento' | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (target: 'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario' | 'contratos', sectionIdOrTab?: string) => {
    const isTab = sectionIdOrTab && ['residencial', 'gamer', 'casa-conectada', 'radio', 'empresarial'].includes(sectionIdOrTab);
    
    if (isTab) {
      setCurrentPage(target, sectionIdOrTab as any);
    } else {
      setCurrentPage(target);
    }
    
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    
    if (sectionIdOrTab && !isTab) {
      setTimeout(() => {
        scrollSection(sectionIdOrTab);
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#005CDC] shadow-lg border-b border-[#005CDC]/80 py-3 text-white' 
          : 'bg-[#005CDC] border-b border-white/5 py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO AREA */}
          <div 
            onClick={() => handleNav('home')} 
            className="cursor-pointer group"
          >
            <CentralNetLogo size="md" theme="dark" />
          </div>
 
          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-5 font-bold text-[13px] uppercase tracking-wider text-white">
            {/* Principal */}
            <button
              id="nav-principal"
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg transition-colors hover:text-[#FFCC00] cursor-pointer ${
                currentPage === 'home' ? 'text-[#FFCC00] font-black' : 'text-white'
              }`}
            >
              Principal
            </button>
 
            {/* Para Você Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('paraVoce')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-para-voce"
                className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-colors hover:text-[#FFCC00] cursor-pointer ${
                  activeDropdown === 'paraVoce' ? 'text-[#FFCC00]' : 'text-white'
                }`}
              >
                Para Você <ChevronDown size={14} className={`transition-transform duration-205 ${activeDropdown === 'paraVoce' ? 'rotate-180' : ''}`} />
              </button>
 
              {activeDropdown === 'paraVoce' && (
                <div className="absolute left-0 mt-2.5 w-64 bg-[#0051C2] border border-white/10 rounded-2xl shadow-2xl p-2 animate-fadeIn z-50 text-left">
                  <button onClick={() => handleNav('assine', 'residencial')} className="w-full text-left px-4 py-2.5 hover:bg-white/10 rounded-xl flex items-center gap-3 text-white cursor-pointer">
                    <Wifi size={15} className="text-[#FFCC00]" />
                    <span className="font-bold text-xs">Fibra Óptica</span>
                  </button>
                  <button onClick={() => handleNav('assine', 'gamer')} className="w-full text-left px-4 py-2.5 hover:bg-white/10 rounded-xl flex items-center gap-3 text-white cursor-pointer">
                    <Gamepad2 size={15} className="text-[#FFCC00]" />
                    <span className="font-bold text-xs">Planos Gamer</span>
                  </button>
                  <button onClick={() => handleNav('assine', 'casa-conectada')} className="w-full text-left px-4 py-2.5 hover:bg-white/10 rounded-xl flex items-center gap-3 text-white cursor-pointer">
                    <Laptop size={15} className="text-[#FFCC00]" />
                    <span className="font-bold text-xs">Casa Conectada</span>
                  </button>
                  <button onClick={() => handleNav('assine', 'radio')} className="w-full text-left px-4 py-2.5 hover:bg-white/10 rounded-xl flex items-center gap-3 text-white cursor-pointer">
                    <Radio size={15} className="text-[#FFCC00]" />
                    <span className="font-bold text-xs">Rádio</span>
                  </button>
                  <button onClick={() => handleNav('cnmovel')} className="w-full text-left px-4 py-2.5 hover:bg-white/10 rounded-xl flex items-center gap-3 text-white cursor-pointer">
                    <Sparkles size={15} className="text-[#FFCC00]" />
                    <span className="font-bold text-xs">CN Móvel</span>
                  </button>
                  <button onClick={() => handleNav('home', 'para-voce')} className="w-full text-left px-4 py-2.5 hover:bg-white/10 rounded-xl flex items-center gap-3 text-white cursor-pointer">
                    <Check size={15} className="text-[#FFCC00]" />
                    <span className="font-bold text-xs">CN Vantagens</span>
                  </button>
                  <button onClick={() => handleNav('gps')} className="w-full text-left px-4 py-2.5 hover:bg-white/10 rounded-xl flex items-center gap-3 text-white cursor-pointer">
                    <Shield size={15} className="text-[#FFCC00]" />
                    <span className="font-bold text-xs">Rastreamento Veicular</span>
                  </button>
                </div>
              )}
            </div>
 
            {/* Para Empresas Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('paraEmpresas')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-para-empresas"
                className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-colors hover:text-[#FFCC00] cursor-pointer ${
                  activeDropdown === 'paraEmpresas' ? 'text-[#FFCC00]' : 'text-white'
                }`}
              >
                Para Empresas <ChevronDown size={14} className={`transition-transform duration-205 ${activeDropdown === 'paraEmpresas' ? 'rotate-180' : ''}`} />
              </button>
 
              {activeDropdown === 'paraEmpresas' && (
                <div className="absolute left-0 mt-2.5 w-60 bg-[#0051C2] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 text-left">
                  <button onClick={() => handleNav('dedicado')} className="w-full text-left px-4 py-2.5 hover:bg-white/10 rounded-xl text-white cursor-pointer">
                    <span className="font-bold text-xs">Link Dedicado</span>
                  </button>
                  <button onClick={() => handleNav('assine', 'empresarial')} className="w-full text-left px-4 py-2.5 hover:bg-white/10 rounded-xl text-white cursor-pointer">
                    <span className="font-bold text-xs">Planos SOHO</span>
                  </button>
                  <button onClick={() => handleNav('ponto')} className="w-full text-left px-4 py-2.5 hover:bg-white/10 rounded-xl text-white cursor-pointer">
                    <span className="font-bold text-xs">Ponto-a-Ponto</span>
                  </button>
                  <button onClick={() => handleNav('temporario')} className="w-full text-left px-4 py-2.5 hover:bg-white/10 rounded-xl text-white cursor-pointer">
                    <span className="font-bold text-xs">Link Temporário</span>
                  </button>
                </div>
              )}
            </div>
 
            {/* Atendimento Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('atendimento')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-atendimento"
                className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-colors hover:text-[#FFCC00] cursor-pointer ${
                  activeDropdown === 'atendimento' ? 'text-[#FFCC00]' : 'text-white'
                }`}
              >
                Atendimento <ChevronDown size={14} className={`transition-transform duration-205 ${activeDropdown === 'atendimento' ? 'rotate-180' : ''}`} />
              </button>
 
              {activeDropdown === 'atendimento' && (
                <div className="absolute left-0 mt-2.5 w-60 bg-[#0051C2] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 text-left">
                  <button onClick={() => handleNav('home', 'sobre')} className="w-full text-left px-4 py-2.5 hover:bg-white/10 rounded-xl text-white cursor-pointer">
                    <span className="font-bold text-xs">Sobre a CentralNet</span>
                  </button>
                  <button onClick={() => handleNav('home', 'contato')} className="w-full text-left px-4 py-2.5 hover:bg-white/10 rounded-xl text-white cursor-pointer">
                    <span className="font-bold text-xs">Fale Conosco</span>
                  </button>
                  <button onClick={() => handleNav('contratos')} className="w-full text-left px-4 py-2.5 hover:bg-white/10 rounded-xl text-white cursor-pointer">
                    <span className="font-bold text-xs">Contratos e Regulamentos</span>
                  </button>
                  <a href="https://fast.com/pt/" target="_blank" rel="noopener noreferrer" className="w-full text-left px-4 py-2.5 hover:bg-white/10 rounded-xl flex items-center justify-between text-white cursor-pointer">
                    <span className="font-bold text-xs">Teste de Velocidade</span>
                    <ArrowUpRight size={12} className="text-[#FFCC00]" />
                  </a>
                </div>
              )}
            </div>
          </nav>
 
          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden lg:flex items-center gap-8 font-bold text-[13px] uppercase tracking-wider text-white">
            
            {/* Central do Assinante Link */}
            <a 
              href="https://sgp.centralnetsurubim.com.br/accounts/central/login"
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#FFCC00] transition-colors"
            >
              <span>Central do Assinante</span>
              {/* Gold/Yellow User icon with standard visual highlight */}
              <div className="w-4.5 h-4.5 rounded-full bg-[#FFCC00] flex items-center justify-center text-[10px] text-blue-900 font-extrabold shadow-sm shrink-0">
                👤
              </div>
            </a>
 
            {/* Assine Já CTA Link */}
            <button 
              onClick={() => handleNav('assine')}
              className="flex items-center gap-2 hover:text-[#FFCC00] transition-colors cursor-pointer"
            >
              <span>Assine Já</span>
              {/* Gold/Yellow pen check button */}
              <div className="w-4.5 h-4.5 rounded-full bg-[#FFCC00] flex items-center justify-center text-[10px] text-blue-900 font-extrabold shadow-sm shrink-0">
                ✍️
              </div>
            </button>
          </div>
 
          {/* MOBILE MENU TOGGLER */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handleNav('assine')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Assine Já
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:bg-white/10 p-2 rounded-lg bg-white/5 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
 
        </div>
      </div>
 
      {/* MOBILE FULL-SCREEN / SLIDE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-250 animate-fade-in absolute w-full left-0 max-h-[calc(100vh-64px)] overflow-y-auto shadow-2xl">
          <div className="px-4 py-5 space-y-4 text-slate-700">
            {/* Navigation links list */}
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => handleNav('home')}
                className="w-full text-left px-3 py-2 text-slate-800 hover:text-blue-600 hover:bg-slate-50 rounded-lg text-sm font-semibold"
              >
                Principal
              </button>

              {/* Standalone highly visible GPS block on mobile */}
              <button 
                onClick={() => handleNav('gps')}
                className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between gap-2 border transition-all ${
                  currentPage === 'gps'
                    ? 'bg-orange-500 text-white border-orange-550 shadow-md'
                    : 'bg-orange-50/70 hover:bg-orange-50 text-orange-600 border-orange-100 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentPage === 'gps' ? 'bg-white' : 'bg-orange-450'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${currentPage === 'gps' ? 'bg-white' : 'bg-orange-500'}`}></span>
                  </span>
                  <Shield size={16} className={currentPage === 'gps' ? 'text-white' : 'text-orange-500'} />
                  <span>CN GPS Rastreamento Veicular 🛰️</span>
                </div>
                <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider shadow-xs ${
                  currentPage === 'gps' ? 'bg-white text-orange-600' : 'bg-orange-500 text-white'
                }`}>
                  Acessar
                </span>
              </button>
 
              {/* Para Você mobile section */}
              <div className="border border-slate-100 rounded-xl p-2 bg-slate-50">
                <p className="px-3 py-1 text-slate-500 text-xs font-bold tracking-wider uppercase">Para Você</p>
                <div className="grid grid-cols-2 gap-1 mt-1">
                  <button onClick={() => handleNav('assine', 'residencial')} className="text-left px-3 py-1.5 text-xs text-slate-755 hover:text-blue-600 rounded hover:bg-white">Fibra Óptica</button>
                  <button onClick={() => handleNav('assine', 'gamer')} className="text-left px-3 py-1.5 text-xs text-slate-755 hover:text-blue-600 rounded hover:bg-white">Planos Gamer</button>
                  <button onClick={() => handleNav('assine', 'casa-conectada')} className="text-left px-3 py-1.5 text-xs text-slate-755 hover:text-blue-600 rounded hover:bg-white">Casa Conectada</button>
                  <button onClick={() => handleNav('assine', 'radio')} className="text-left px-3 py-1.5 text-xs text-slate-755 hover:text-blue-600 rounded hover:bg-white">Rádio</button>
                  <button onClick={() => handleNav('cnmovel')} className="text-left px-3 py-1.5 text-xs text-orange-500 font-bold hover:text-blue-600 rounded hover:bg-white">CN Móvel</button>
                  <button onClick={() => handleNav('home', 'para-voce')} className="text-left px-3 py-1.5 text-xs text-slate-755 hover:text-blue-600 rounded hover:bg-white">CN Vantagens</button>
                  <button onClick={() => handleNav('gps')} className="text-left px-3 py-1.5 text-xs text-orange-500 font-bold hover:text-orange-650 rounded hover:bg-white col-span-2">Rastreamento Veicular</button>
                </div>
              </div>
 
              {/* Para Empresas mobile section */}
              <div className="border border-slate-100 rounded-xl p-2 bg-slate-50">
                <p className="px-3 py-1 text-slate-500 text-xs font-bold tracking-wider uppercase">Para Empresas</p>
                <div className="grid grid-cols-2 gap-1 mt-1">
                  <button onClick={() => handleNav('dedicado')} className="text-left px-3 py-1.5 text-xs text-slate-755 hover:text-blue-600 rounded hover:bg-white">Link Dedicado</button>
                  <button onClick={() => handleNav('assine', 'empresarial')} className="text-left px-3 py-1.5 text-xs text-slate-755 hover:text-blue-600 rounded hover:bg-white">Planos SOHO</button>
                  <button onClick={() => handleNav('ponto')} className="text-left px-3 py-1.5 text-xs text-slate-755 hover:text-blue-600 rounded hover:bg-white">Ponto-a-Ponto</button>
                  <button onClick={() => handleNav('temporario')} className="text-left px-3 py-1.5 text-xs text-slate-755 hover:text-blue-600 rounded hover:bg-white">Link Temporário</button>
                </div>
              </div>
 
              {/* Atendimento mobile section */}
              <div className="border border-slate-100 rounded-xl p-2 bg-slate-50">
                <p className="px-3 py-1 text-slate-500 text-xs font-bold tracking-wider uppercase">Atendimento</p>
                <div className="grid grid-cols-2 gap-1 mt-1">
                  <button onClick={() => handleNav('home', 'sobre')} className="text-left px-3 py-1.5 text-xs text-slate-755 hover:text-blue-600 rounded hover:bg-white">Sobre</button>
                  <button onClick={() => handleNav('home', 'contato')} className="text-left px-3 py-1.5 text-xs text-slate-755 hover:text-blue-600 rounded hover:bg-white">Fale Conosco</button>
                  <button onClick={() => handleNav('contratos')} className="text-left px-3 py-1.5 text-xs text-slate-755 hover:text-blue-600 rounded hover:bg-white">Contratos</button>
                  <a href="https://fast.com/pt/" target="_blank" rel="noopener noreferrer" className="text-left px-3 py-1.5 text-xs text-slate-755 hover:text-blue-600 rounded hover:bg-white flex items-center gap-1">Velocímetro</a>
                </div>
              </div>
            </div>
 
            {/* Quick CTAs for mobile */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <a 
                href={CONTATO_CENTRALNET.whatsappUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <Phone size={16} />
                <span>Atendimento WhatsApp</span>
              </a>
 
              <a 
                href="https://sgp.centralnetsurubim.com.br/accounts/central/login"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-xl text-center text-sm font-bold border border-slate-700 flex items-center justify-center gap-2"
              >
                <ShieldCheck size={16} className="text-blue-400" />
                <span>Central do Assinante</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
