/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Wifi,
  Image as ImageIcon,
  FileText,
  HelpCircle,
  PhoneCall,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  User,
  Clock,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCMS } from '../context/CMSContext';
import CentralNetLogo from '../components/CentralNetLogo';

export type AdminTab =
  | 'dashboard'
  | 'planos'
  | 'banners'
  | 'conteudo'
  | 'faq'
  | 'contato'
  | 'configuracoes';

interface AdminLayoutProps {
  currentTab: AdminTab;
  setCurrentTab: (tab: AdminTab) => void;
  children: React.ReactNode;
  onGoToSite: () => void;
}

export default function AdminLayout({
  currentTab,
  setCurrentTab,
  children,
  onGoToSite,
}: AdminLayoutProps) {
  const { user, logout, sessionRemainingMinutes } = useAuth();
  const { data, resetToDefault } = useCMS();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const menuItems: { id: AdminTab; label: string; icon: any; count?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'planos', label: 'Planos & Combos', icon: Wifi, count: data.planos.length },
    { id: 'banners', label: 'Banners do Hero', icon: ImageIcon, count: data.banners.filter(b => b.ativo).length },
    { id: 'conteudo', label: 'Conteúdo do Site', icon: FileText },
    { id: 'faq', label: 'Perguntas FAQ', icon: HelpCircle, count: data.faqs.filter(f => f.ativo).length },
    { id: 'contato', label: 'Contatos & Links', icon: PhoneCall },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  const handleTabClick = (tab: AdminTab) => {
    setCurrentTab(tab);
    setMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = async () => {
    if (confirmReset) {
      await resetToDefault();
      setConfirmReset(false);
      alert('Dados originais restaurados com sucesso!');
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans">
      
      {/* 1. SIDEBAR DESKTOP */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#002d80] text-white shrink-0 border-r border-[#001f5c] relative z-30 select-none">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex flex-col gap-3">
          <div className="cursor-pointer" onClick={() => handleTabClick('dashboard')}>
            <CentralNetLogo size="md" theme="dark" />
          </div>
          <div className="flex items-center justify-between text-xs text-blue-200">
            <span className="font-bold uppercase tracking-wider text-[10px] bg-white/10 px-2 py-0.5 rounded">
              Painel de Gestão
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Online
            </span>
          </div>
        </div>

        {/* Navigation Menu Links */}
        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#f26522] text-white shadow-lg shadow-orange-600/30'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-white' : 'text-blue-300'} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-black/20 text-white' : 'bg-white/10 text-blue-200'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer with Session and Quick Actions */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-[#002266]">
          {/* Session Expiry Indicator */}
          <div className="flex items-center justify-between text-[11px] text-blue-200 px-2 py-1 bg-white/5 rounded-lg">
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-orange-400" />
              <span>Sessão:</span>
            </span>
            <span className="font-bold text-white">~{sessionRemainingMinutes} min</span>
          </div>

          {/* Reset button in emergencies */}
          <button
            onClick={handleReset}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer ${
              confirmReset
                ? 'bg-red-500/20 border-red-400 text-red-200 animate-pulse'
                : 'bg-white/5 border-white/10 text-blue-200 hover:bg-white/10 hover:text-white'
            }`}
            title="Restaura os valores originais de demonstração"
          >
            <RotateCcw size={12} />
            <span>{confirmReset ? 'Confirmar Restauração?' : 'Restaurar Padrão'}</span>
          </button>

          {/* User info & Logout */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                <User size={15} />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate capitalize">{user || 'Admin'}</p>
                <p className="text-[10px] text-blue-300">Administrador</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-red-500/30 transition-colors cursor-pointer"
              title="Sair do painel"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MOBILE DRAWER OVERLAY */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer Menu */}
          <div className="relative w-72 max-w-[80vw] bg-[#002d80] text-white flex flex-col h-full z-10 shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <CentralNetLogo size="sm" theme="dark" />
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#f26522] text-white shadow-lg'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={isActive ? 'text-white' : 'text-blue-300'} />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                          isActive ? 'bg-black/20 text-white' : 'bg-white/10 text-blue-200'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10 bg-[#002266] space-y-2">
              <button
                onClick={onGoToSite}
                className="w-full py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <ExternalLink size={14} />
                <span>Ver Site Público</span>
              </button>
              <button
                onClick={logout}
                className="w-full py-2.5 px-3 bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <LogOut size={14} />
                <span>Encerrar Sessão</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENT WRAPPER */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
          
          <div className="flex items-center gap-3">
            {/* Mobile hamburger trigger */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden cursor-pointer"
            >
              <Menu size={20} />
            </button>

            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 capitalize tracking-tight font-display">
                {menuItems.find((m) => m.id === currentTab)?.label || 'Painel'}
              </h2>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                CentralNet Gerenciamento de Conteúdo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Maintenance Mode Alert Pill if active */}
            {data.configuracoes.siteEmManutencao && (
              <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold flex items-center gap-1.5 border border-amber-200 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Modo Manutenção Ativo</span>
              </div>
            )}

            {/* Link to public site */}
            <button
              onClick={onGoToSite}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#004ecc] bg-slate-100 hover:bg-blue-50 border border-slate-200/80 transition-all cursor-pointer"
              title="Acessar o site público para verificar as alterações"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Ver Site Público</span>
            </button>

            {/* Logout button (Desktop) */}
            <button
              onClick={logout}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 transition-all cursor-pointer"
              title="Encerrar sessão com segurança"
            >
              <LogOut size={14} />
              <span>Sair</span>
            </button>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <main className="flex-grow p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
