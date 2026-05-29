/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
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

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-white/5 font-sans">
      
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Logo Brand & Information Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="cursor-pointer group" onClick={() => handleNav('home')}>
              <CentralNetLogo theme="dark" size="md" />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              A CentralNet (Central Telecomunicações) é o provedor líder regional de internet estável 100% fibra óptica em Surubim e adjacências em Pernambuco. Oferecemos soluções eficientes em conectividade residencial ultra veloz e rastreamento de alta segurança CN GPS.
            </p>

            <div className="space-y-3 pt-2 text-xs font-semibold">
              <span className="flex items-center gap-2 text-slate-300 font-medium">
                <MapPin size={14} className="text-orange-500 shrink-0" />
                <span>{CONTATO_CENTRALNET.endereco}</span>
              </span>
              <span className="flex items-center gap-2 text-slate-300 font-medium">
                <Phone size={14} className="text-orange-500 shrink-0" />
                <span>{CONTATO_CENTRALNET.telefone}</span>
              </span>
            </div>
          </div>

          {/* Quick links: Para Você */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest font-display">Para Você</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('cnmovel')} className="hover:text-white transition-colors font-bold text-orange-500">
                  CN Móvel (Novos Planos) 📱
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('assine', 'residencial')} className="hover:text-white transition-colors">
                  Fibra Óptica
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('assine', 'gamer')} className="hover:text-white transition-colors">
                  Planos Gamer
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('assine', 'casa-conectada')} className="hover:text-white transition-colors">
                  Casa Conectada
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('assine', 'radio')} className="hover:text-white transition-colors">
                  Internet via Rádio
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('home', 'para-voce')} className="hover:text-white transition-colors">
                  CN Vantagens
                </button>
              </li>
            </ul>
          </div>

          {/* Quick links: Para Empresas */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest font-display">Para Empresas</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('dedicado')} className="hover:text-white transition-colors">
                  Link Dedicado
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('assine', 'empresarial')} className="hover:text-white transition-colors">
                  Planos SOHO
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('ponto')} className="hover:text-white transition-colors">
                  Ponto-a-Ponto
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('temporario')} className="hover:text-white transition-colors">
                  Link Temporário
                </button>
              </li>
            </ul>
          </div>

          {/* Quick links: Atendimento */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest font-display">Atendimento</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('home', 'sobre')} className="hover:text-white transition-colors">
                  Sobre a Empresa
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('home', 'contato')} className="hover:text-white transition-colors">
                  Fale Conosco
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contratos')} className="hover:text-white transition-colors">
                  Contratos
                </button>
              </li>
              <li>
                <a href="https://fast.com/pt/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 inline-flex">
                  <span>Teste de Velocidade</span>
                  <ArrowUpRight size={10} />
                </a>
              </li>
            </ul>
          </div>

          {/* Special Solutions Portal integration */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest font-display">Serviços Rápidos</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://sgp.centralnetsurubim.com.br/accounts/central/login"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-xl border border-white/5 flex items-center justify-between text-[11px] transition-colors"
                >
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={12} className="text-blue-400" />
                    <span>Central SGP</span>
                  </span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('assine')} 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold w-full py-2 rounded-xl text-[11px] transition-colors shadow-sm block text-center uppercase tracking-wider"
                >
                  Assine Já
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('cnmovel')} 
                  className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold w-full py-2 rounded-xl text-[11px] transition-colors block text-center cursor-pointer uppercase tracking-wider"
                >
                  Planos CN Móvel
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('gps')} 
                  className="bg-blue-600 hover:bg-blue-700 text-slate-100 font-extrabold w-full py-2 rounded-xl text-[11px] transition-colors block text-center cursor-pointer"
                >
                  Rastreamento GPS
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Lower Copyright section */}
      <div className="border-t border-white/5 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} CentralNet Central Telecomunicações. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1 font-medium text-slate-500">
            <span>
              Desenvolvido por{' '}
              <a 
                href="https://wa.me/5581998520781?text=Ol%C3%A1%21+Gostei+do+seu+site+e+gostaria+de+desenvolver+um."
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-400 font-bold hover:underline transition-all duration-300"
              >
                Matheus Araújo
              </a>
            </span>
          </div>
          <p className="font-mono text-[10px]">SCM ANATEL REGULADO</p>
        </div>
      </div>
      
    </footer>
  );
}
