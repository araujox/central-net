/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Beneficios from './components/Beneficios';
import PlanosSection from './components/PlanosSection';
import StreamingSection from './components/StreamingSection';
import ChipCentralNetSection from './components/ChipCentralNetSection';
import ParaVoce from './components/ParaVoce';
import ParaEmpresas from './components/ParaEmpresas';
import CentralAssinanteSection from './components/CentralAssinanteSection';
import AssineAgoraSection from './components/AssineAgoraSection';
import RastreamentoSection from './components/RastreamentoSection';
import FAQ from './components/FAQ';
import Contato from './components/Contato';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import AssinePage from './pages/AssinePage';
import GpsPage from './pages/GpsPage';
import CnMovelPage from './pages/CnMovelPage';
import DedicadoPage from './pages/DedicadoPage';
import PontoPage from './pages/PontoPage';
import TemporarioPage from './pages/TemporarioPage';
import ContratosPage from './pages/ContratosPage';

import { AuthProvider } from './context/AuthContext';
import { CMSProvider, useCMS } from './context/CMSContext';
import AdminPanel from './admin/AdminPanel';

type PageRoute =
  | 'home'
  | 'assine'
  | 'gps'
  | 'cnmovel'
  | 'dedicado'
  | 'ponto'
  | 'temporario'
  | 'contratos'
  | 'painel-central';

function MainApp() {
  const { data } = useCMS();
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [activeFiberTab, setActiveFiberTab] = useState<'residencial' | 'gamer' | 'casa-conectada' | 'radio' | 'empresarial'>('residencial');

  // Detect and synchronize URL path or hash parameters
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      // Check secret admin route: /painel-central or #painel-central or #/painel-central or /gestao-central
      if (
        path.includes('painel-central') ||
        hash.includes('painel-central') ||
        path.includes('gestao-central') ||
        hash.includes('gestao-central')
      ) {
        setCurrentPage('painel-central');
        return;
      }

      if (path.includes('assine') || hash.startsWith('#assine')) {
        setCurrentPage('assine');
        const tabPart = hash.split('-')[1];
        if (tabPart && ['residencial', 'gamer', 'casa-conectada', 'radio', 'empresarial'].includes(tabPart)) {
          setActiveFiberTab(tabPart as any);
        }
      } else if (path.includes('gps') || hash === '#gps') {
        setCurrentPage('gps');
      } else if (path.includes('cnmovel') || hash === '#cnmovel') {
        setCurrentPage('cnmovel');
      } else if (path.includes('dedicado') || hash === '#dedicado') {
        setCurrentPage('dedicado');
      } else if (path.includes('ponto') || hash === '#ponto') {
        setCurrentPage('ponto');
      } else if (path.includes('temporario') || hash === '#temporario') {
        setCurrentPage('temporario');
      } else if (path.includes('contratos') || hash === '#contratos') {
        setCurrentPage('contratos');
      } else {
        setCurrentPage('home');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Sync state to URL hash
  const handlePageChange = (
    page: 'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario' | 'contratos',
    tab?: 'residencial' | 'gamer' | 'casa-conectada' | 'radio' | 'empresarial'
  ) => {
    setCurrentPage(page);
    if (tab) {
      setActiveFiberTab(tab);
    }
    if (page === 'home') {
      window.history.pushState(null, '', '/');
    } else {
      const suffix = tab ? `-${tab}` : '';
      window.history.pushState(null, '', `#${page}${suffix}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // If in secret admin panel route, isolate UI completely from public navbar/footer
  if (currentPage === 'painel-central') {
    return (
      <AdminPanel
        onGoToSite={() => {
          setCurrentPage('home');
          window.history.pushState(null, '', '/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800 selection:bg-orange-500 selection:text-white">
      
      {/* Promotional Top Notice Bar if configured in CMS */}
      {data.configuracoes.exibirAvisoPromocional && (
        <aside aria-label="Aviso promocional" className="bg-gradient-to-r from-[#f26522] to-[#ff884d] text-white py-2 px-4 text-center text-xs font-bold fixed top-0 left-0 right-0 z-50 shadow-md flex items-center justify-center gap-2">
          <span>{data.configuracoes.textoAvisoPromocional}</span>
          {data.configuracoes.linkAvisoPromocional && (
            <a
              href={data.configuracoes.linkAvisoPromocional}
              className="underline underline-offset-2 hover:text-amber-100 transition-colors"
            >
              Aproveitar agora &rarr;
            </a>
          )}
        </aside>
      )}

      {/* Maintenance Notice if active */}
      {data.configuracoes.siteEmManutencao && (
        <aside aria-label="Aviso de manutenção" className="bg-amber-500 text-slate-950 py-2 px-4 text-center text-xs font-black fixed bottom-0 left-0 right-0 z-50 shadow-2xl flex items-center justify-center gap-2">
          <span>⚠️ AVISO: {data.configuracoes.mensagemManutencao}</span>
        </aside>
      )}

      {/* 1. Header / Navbar */}
      <div className={data.configuracoes.exibirAvisoPromocional ? 'pt-8' : ''}>
        <Navbar 
          currentPage={currentPage as any} 
          setCurrentPage={handlePageChange} 
          scrollSection={scrollSection} 
        />
      </div>

      {/* 2. Main Page Content views */}
      <div className="flex-grow">
        {currentPage === 'home' && (
          <div className="animate-fade-in">
            {/* Seção 1: Hero */}
            <Hero setCurrentPage={handlePageChange} />
            
            {/* Seção 2: Benefícios Principais */}
            <Beneficios />

            {/* Seção 2A: Nossos Planos */}
            <PlanosSection setCurrentPage={handlePageChange} />

            {/* Seção 2B: Seção de Streaming */}
            <StreamingSection />

            {/* Seção 2C: Seção Chip CentralNet */}
            <ChipCentralNetSection setCurrentPage={handlePageChange} />
            
            {/* Seção 3: Seção Para Você */}
            <ParaVoce setCurrentPage={handlePageChange} scrollSection={scrollSection} />
            
            {/* Seção 4: Seção Para Empresas */}
            <ParaEmpresas />
            
            {/* Seção 5: Seção Central do Assinante */}
            <CentralAssinanteSection />
            
            {/* Seção 6: Seção Assine Agora */}
            <AssineAgoraSection setCurrentPage={handlePageChange} />
            
            {/* Seção 7: Seção Rastreamento Veicular CN GPS */}
            <RastreamentoSection setCurrentPage={handlePageChange} />
            
            {/* Seção 8: FAQ */}
            <FAQ />
            
            {/* Seção 9: Contato & Contratos */}
            <Contato />
          </div>
        )}

        {currentPage === 'assine' && (
          <div className="animate-fade-in">
            <AssinePage setCurrentPage={handlePageChange} activeFiberTab={activeFiberTab} />
          </div>
        )}

        {currentPage === 'gps' && (
          <div className="animate-fade-in">
            <GpsPage setCurrentPage={handlePageChange} />
          </div>
        )}

        {currentPage === 'cnmovel' && (
          <div className="animate-fade-in">
            <CnMovelPage setCurrentPage={handlePageChange} />
          </div>
        )}

        {currentPage === 'dedicado' && (
          <div className="animate-fade-in">
            <DedicadoPage setCurrentPage={handlePageChange} />
          </div>
        )}

        {currentPage === 'ponto' && (
          <div className="animate-fade-in">
            <PontoPage setCurrentPage={handlePageChange} />
          </div>
        )}

        {currentPage === 'temporario' && (
          <div className="animate-fade-in">
            <TemporarioPage setCurrentPage={handlePageChange} />
          </div>
        )}

        {currentPage === 'contratos' && (
          <div className="animate-fade-in">
            <ContratosPage setCurrentPage={handlePageChange} />
          </div>
        )}
      </div>

      {/* 3. Floating WhatsApp Conversions Button */}
      <WhatsAppFloat />

      {/* 4. Footer */}
      <Footer 
        setCurrentPage={handlePageChange} 
        scrollSection={scrollSection} 
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <MainApp />
      </CMSProvider>
    </AuthProvider>
  );
}
