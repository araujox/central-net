/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Wifi, Image as ImageIcon, HelpCircle, PhoneCall, ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { AdminTab } from './AdminLayout';

interface AdminDashboardProps {
  onNavigate: (tab: AdminTab) => void;
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { data } = useCMS();

  // Metrics
  const totalPlanos = data.planos.length;
  const planosAtivos = data.planos.filter((p) => !(p as any).inativo).length;
  const totalPlanosMoveis = data.planosMoveis.length;
  const bannersAtivos = data.banners.filter((b) => b.ativo).length;
  const totalFaqs = data.faqs.length;
  const faqsAtivos = data.faqs.filter((f) => f.ativo).length;

  const categoriasContagem = {
    residencial: data.planos.filter((p) => p.categoria === 'residencial').length,
    gamer: data.planos.filter((p) => p.categoria === 'gamer').length,
    'casa-conectada': data.planos.filter((p) => p.categoria === 'casa-conectada').length,
    radio: data.planos.filter((p) => p.categoria === 'radio').length,
    empresarial: data.planos.filter((p) => p.categoria === 'empresarial').length,
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#002d80] via-[#004ecc] to-[#005CDC] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-orange-500/20 rounded-full filter blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <Sparkles size={13} className="text-[#f26522]" />
            <span>Bem-vindo à Gestão CentralNet</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight font-display">
            Controle do Conteúdo do Site
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
            Altere com rapidez e facilidade valores dos planos, velocidades, benefícios, banners, textos institucionais, FAQ e canais de contato. Todas as modificações refletem imediatamente na página pública.
          </p>
        </div>
      </div>

      {/* Warning if Maintenance or Promotional Alert */}
      {(data.configuracoes.siteEmManutencao || data.configuracoes.exibirAvisoPromocional) && (
        <div className="grid sm:grid-cols-2 gap-4">
          {data.configuracoes.siteEmManutencao && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-amber-900">
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} className="text-amber-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider">Aviso de Manutenção Ativo</h4>
                  <p className="text-xs text-amber-700">O site público está exibindo banner de manutenção.</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('configuracoes')}
                className="text-xs font-bold text-amber-800 underline shrink-0 cursor-pointer"
              >
                Gerenciar
              </button>
            </div>
          )}

          {data.configuracoes.exibirAvisoPromocional && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-blue-900">
              <div className="flex items-center gap-3">
                <Sparkles size={20} className="text-blue-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider">Aviso Promocional no Topo</h4>
                  <p className="text-xs text-blue-700 truncate max-w-xs">{data.configuracoes.textoAvisoPromocional}</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('configuracoes')}
                className="text-xs font-bold text-blue-800 underline shrink-0 cursor-pointer"
              >
                Configurar
              </button>
            </div>
          )}
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Planos */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Planos Fibra</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#004ecc] flex items-center justify-center">
              <Wifi size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-display">{totalPlanos}</span>
            <span className="text-xs text-emerald-600 font-bold">{planosAtivos} ativos</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Residencial, Gamer, Casa, Rádio, Empresa</p>
        </div>

        {/* Card 2: Combos & Móvel */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">CN Móvel</span>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#f26522] flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-display">{totalPlanosMoveis}</span>
            <span className="text-xs text-slate-500 font-semibold">planos móveis</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Gold, Rubi, Platinum, Sapphire...</p>
        </div>

        {/* Card 3: Banners */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Banners Ativos</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ImageIcon size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-display">{bannersAtivos}</span>
            <span className="text-xs text-purple-600 font-bold">em exibição</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Carrossel principal da página inicial</p>
        </div>

        {/* Card 4: FAQs */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Perguntas FAQ</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HelpCircle size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-display">{totalFaqs}</span>
            <span className="text-xs text-emerald-600 font-bold">{faqsAtivos} ativas</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Tire Dúvidas no site público</p>
        </div>

      </div>

      {/* Quick Actions Shortcuts */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-black text-slate-900 font-display tracking-tight">
            Atalhos Rápidos
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Acesso direto às ações de edição mais frequentes da CentralNet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <button
            onClick={() => onNavigate('planos')}
            className="p-5 rounded-2xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-100 text-left transition-all duration-200 group cursor-pointer hover:shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-[#004ecc] text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Wifi size={18} />
            </div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>Editar Planos</span>
              <ArrowUpRight size={16} className="text-slate-400 group-hover:text-[#004ecc] group-hover:translate-x-0.5 transition-all" />
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Alterar preços, velocidades, benefícios e destaques.
            </p>
          </button>

          <button
            onClick={() => onNavigate('banners')}
            className="p-5 rounded-2xl bg-orange-50/70 hover:bg-orange-100/80 border border-orange-100 text-left transition-all duration-200 group cursor-pointer hover:shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-[#f26522] text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <ImageIcon size={18} />
            </div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>Editar Banners</span>
              <ArrowUpRight size={16} className="text-slate-400 group-hover:text-[#f26522] group-hover:translate-x-0.5 transition-all" />
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Trocar imagens, títulos e destinos dos slides do Hero.
            </p>
          </button>

          <button
            onClick={() => onNavigate('contato')}
            className="p-5 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-100 text-left transition-all duration-200 group cursor-pointer hover:shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <PhoneCall size={18} />
            </div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>WhatsApp & Contatos</span>
              <ArrowUpRight size={16} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Atualizar WhatsApp em botões, telefone, sede e horários.
            </p>
          </button>

          <button
            onClick={() => onNavigate('faq')}
            className="p-5 rounded-2xl bg-purple-50/70 hover:bg-purple-100/80 border border-purple-100 text-left transition-all duration-200 group cursor-pointer hover:shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <HelpCircle size={18} />
            </div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>Editar FAQ</span>
              <ArrowUpRight size={16} className="text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Adicionar ou atualizar respostas das dúvidas frequentes.
            </p>
          </button>

        </div>
      </div>

      {/* Category breakdown table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-black text-slate-900 font-display">
              Distribuição dos Planos por Categoria
            </h2>
            <p className="text-xs text-slate-500">
              Visão geral de quantos planos existem em cada aba do site público.
            </p>
          </div>
          <button
            onClick={() => onNavigate('planos')}
            className="px-4 py-2 bg-[#004ecc] text-white text-xs font-bold rounded-xl hover:bg-[#003bb3] transition-colors cursor-pointer self-start sm:self-auto"
          >
            Gerenciar Todos os Planos
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: 'Residencial Plus', key: 'residencial', count: categoriasContagem.residencial, color: 'text-blue-600 bg-blue-50' },
            { label: 'Planos Gamer', key: 'gamer', count: categoriasContagem.gamer, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Casa Conectada', key: 'casa-conectada', count: categoriasContagem['casa-conectada'], color: 'text-orange-600 bg-orange-50' },
            { label: 'Internet Rádio', key: 'radio', count: categoriasContagem.radio, color: 'text-purple-600 bg-purple-50' },
            { label: 'Empresarial SOHO', key: 'empresarial', count: categoriasContagem.empresarial, color: 'text-indigo-600 bg-indigo-50' },
          ].map((cat) => (
            <div key={cat.key} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${cat.color}`}>
                {cat.label}
              </span>
              <p className="text-2xl font-black text-slate-900 mt-2 font-display">{cat.count}</p>
              <p className="text-[11px] text-slate-400">planos cadastrados</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
