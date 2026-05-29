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
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3' 
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO AREA */}
          <div 
            onClick={() => handleNav('home')} 
            className="cursor-pointer group"
          >
            <CentralNetLogo size="md" />
          </div>
 
          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1.5 font-medium text-sm text-slate-600">
            {/* Principal */}
            <button
              id="nav-principal"
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg transition-colors hover:text-blue-600 ${
                currentPage === 'home' ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-600'
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
                className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-colors hover:text-blue-600 ${
                  activeDropdown === 'paraVoce' ? 'text-blue-600 bg-slate-50' : 'text-slate-600'
                }`}
              >
                Para Você <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'paraVoce' ? 'rotate-180' : ''}`} />
              </button>
 
              {activeDropdown === 'paraVoce' && (
                <div className="absolute left-0 mt-0.5 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 animate-fade-in z-50">
                  <button onClick={() => handleNav('assine', 'residencial')} className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-xl flex items-center gap-2">
                    <Wifi size={16} className="text-blue-600" />
                    <div>
                      <p className="font-semibold text-xs text-slate-800">Fibra Óptica</p>
                      <p className="text-[10px] text-slate-500">Residencial estável de alta velocidade</p>
                    </div>
                  </button>
                  <button onClick={() => handleNav('assine', 'gamer')} className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-xl flex items-center gap-2">
                    <Gamepad2 size={16} className="text-emerald-600" />
                    <div>
                      <p className="font-semibold text-xs text-slate-800">Planos Gamer</p>
                      <p className="text-[10px] text-slate-500">Latência mínima e rotas dedicadas</p>
                    </div>
                  </button>
                  <button onClick={() => handleNav('assine', 'casa-conectada')} className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-xl flex items-center gap-2">
                    <Laptop size={16} className="text-amber-500" />
                    <div>
                      <p className="font-semibold text-xs text-slate-800">Casa Conectada</p>
                      <p className="text-[10px] text-slate-500">Suporte a múltiplos Smart devices</p>
                    </div>
                  </button>
                  <button onClick={() => handleNav('assine', 'radio')} className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-xl flex items-center gap-2">
                    <Radio size={16} className="text-pink-500" />
                    <div>
                      <p className="font-semibold text-xs text-slate-800">Radiofrequência</p>
                      <p className="text-[10px] text-slate-500">Conexão rural com estabilidade</p>
                    </div>
                  </button>
                  <button onClick={() => handleNav('cnmovel')} className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-xl flex items-center gap-2">
                    <Sparkles size={16} className="text-purple-600" />
                    <div>
                      <p className="font-semibold text-xs text-slate-800">CN Móvel</p>
                      <p className="text-[10px] text-slate-500 font-bold text-orange-500">Chips móveis com rede de alto padrão</p>
                    </div>
                  </button>
                  <button onClick={() => handleNav('home', 'para-voce')} className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-xl flex items-center gap-2">
                    <Check size={16} className="text-teal-600" />
                    <div>
                      <p className="font-semibold text-xs text-slate-800">CN Vantagens</p>
                      <p className="text-[10px] text-slate-500">Clube de descontos exclusivos</p>
                    </div>
                  </button>
                  <button onClick={() => handleNav('gps')} className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-xl flex items-center gap-2">
                    <Shield size={16} className="text-rose-600" />
                    <div>
                      <p className="font-semibold text-xs text-slate-800">Rastreamento Veicular</p>
                      <p className="text-[10px] text-slate-500">CN GPS integrado para frotas e carros</p>
                    </div>
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
                className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-colors hover:text-blue-600 ${
                  activeDropdown === 'paraEmpresas' ? 'text-blue-600 bg-slate-50' : 'text-slate-600'
                }`}
              >
                Para Empresas <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'paraEmpresas' ? 'rotate-180' : ''}`} />
              </button>
 
              {activeDropdown === 'paraEmpresas' && (
                <div className="absolute left-0 mt-0.5 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
                  <button onClick={() => handleNav('dedicado')} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 rounded-xl">
                    <p className="font-bold text-xs text-slate-800">Link Dedicado</p>
                    <p className="text-[10px] text-slate-500">Banda simétrica e 100% Garantido</p>
                  </button>
                  <button onClick={() => handleNav('assine', 'empresarial')} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 rounded-xl">
                    <p className="font-bold text-xs text-slate-800">Planos SOHO</p>
                    <p className="text-[10px] font-bold text-orange-500">SOHO Gold, Platinum, Rubi e Diamond</p>
                  </button>
                  <button onClick={() => handleNav('ponto')} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 rounded-xl">
                    <p className="font-bold text-xs text-slate-800">Ponto-a-Ponto</p>
                    <p className="text-[10px] text-slate-500">Interligação blindada de filiais</p>
                  </button>
                  <button onClick={() => handleNav('temporario')} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 rounded-xl">
                    <p className="font-bold text-xs text-slate-800">Link Temporário</p>
                    <p className="text-[10px] text-slate-500">Conexão dedicada para shows e eventos</p>
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
                className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-colors hover:text-blue-600 ${
                  activeDropdown === 'atendimento' ? 'text-blue-600 bg-slate-50' : 'text-slate-600'
                }`}
              >
                Atendimento <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'atendimento' ? 'rotate-180' : ''}`} />
              </button>
 
              {activeDropdown === 'atendimento' && (
                <div className="absolute left-0 mt-0.5 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
                  <button onClick={() => handleNav('home', 'sobre')} className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-xl">
                    <p className="font-semibold text-xs text-slate-800">Sobre a CentralNet</p>
                  </button>
                  <button onClick={() => handleNav('home', 'contato')} className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-xl">
                    <p className="font-semibold text-xs text-slate-800">Fale Conosco</p>
                  </button>
                  <button onClick={() => handleNav('contratos')} className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-xl">
                    <p className="font-semibold text-xs text-slate-800">Contratos e Regulamentos</p>
                  </button>
                  <a href="https://fast.com/pt/" target="_blank" rel="noopener noreferrer" className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-xl flex items-center justify-between">
                    <p className="font-semibold text-xs text-slate-800">Teste de Velocidade</p>
                    <ArrowUpRight size={12} className="text-slate-400" />
                  </a>
                </div>
              )}
            </div>
          </nav>
 
          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden lg:flex items-center gap-2">
            {/* WhatsApp Link Icon */}
            <a 
              href={CONTATO_CENTRALNET.whatsappUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="h-9 px-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100 rounded-full flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-[1.02] active:scale-98 text-xs font-bold font-display shrink-0"
            >
              <Phone size={13} className="fill-emerald-600 stroke-none" />
              <span>WhatsApp</span>
            </a>
 
            {/* Central do Assinante Link */}
            <a 
              href="https://sgp.centralnetsurubim.com.br/accounts/central/login"
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="h-9 px-3.5 text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-110 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-98 shrink-0"
            >
              <ShieldCheck size={13} className="text-blue-600" />
              <span>Central do Assinante</span>
            </a>
 
            {/* Assine Já CTA */}
            <button 
              onClick={() => handleNav('assine')}
              className="h-9 px-4.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs font-bold shadow-md shadow-orange-100 transition-all duration-300 hover:scale-[1.02] active:scale-98 shrink-0"
            >
              Assine Já
            </button>
 
            {/* CN GPS Premium Action Button */}
            <button
              id="nav-rastreamento-direto"
              onClick={() => handleNav('gps')}
              className={`h-9 px-4 rounded-full transition-all duration-300 text-xs font-extrabold flex items-center justify-center gap-1.5 relative group/gps border shadow-md hover:scale-[1.02] active:scale-98 shrink-0 ${
                currentPage === 'gps'
                  ? 'bg-orange-600 text-white border-orange-650 shadow-orange-200/50'
                  : 'bg-slate-900 text-white border-slate-950 hover:bg-slate-800'
              }`}
            >
              <div className="relative flex h-1.5 w-1.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentPage === 'gps' ? 'bg-white' : 'bg-sky-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${currentPage === 'gps' ? 'bg-white' : 'bg-sky-500'}`}></span>
              </div>
              <Shield size={13} className="shrink-0 transition-transform duration-300 group-hover/gps:rotate-12 text-sky-400" />
              <span className="font-display tracking-tight">Rastreamento GPS</span>
            </button>
          </div>
 
          {/* MOBILE MENU TOGGLER */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handleNav('assine')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md"
            >
              Assine Já
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-2 rounded-lg bg-slate-50 transition-colors"
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
