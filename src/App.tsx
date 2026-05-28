/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Beneficios from './components/Beneficios';
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario'>('home');
  const [activeFiberTab, setActiveFiberTab] = useState<'residencial' | 'gamer' | 'casa-conectada' | 'radio' | 'empresarial'>('residencial');

  // Detect and synchronize URL path or hash parameters for assine.php emulation
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      
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

  // Sync state to URL hash to maintain proper history and sharing without server reloads
  const handlePageChange = (page: 'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario', tab?: 'residencial' | 'gamer' | 'casa-conectada' | 'radio' | 'empresarial') => {
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

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800 selection:bg-orange-500 selection:text-white">
      
      {/* 1. Header / Navbar */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={handlePageChange} 
        scrollSection={scrollSection} 
      />

      {/* 2. Main Page Content views */}
      <div className="flex-grow">
        {currentPage === 'home' && (
          <div className="animate-fade-in">
            {/* Seção 1: Hero */}
            <Hero setCurrentPage={handlePageChange} />
            
            {/* Seção 2: Benefícios Principais */}
            <Beneficios />
            
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
