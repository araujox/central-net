/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, Network, ShieldCheck, Activity, Phone, ArrowRight, Check, Compass, Cpu, HelpCircle } from 'lucide-react';
import { CONTATO_CENTRALNET } from '../types';
import CentralNetLogo from '../components/CentralNetLogo';

interface PontoPageProps {
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario') => void;
}

export default function PontoPage({ setCurrentPage }: PontoPageProps) {
  const handleCotar = () => {
    const textMsg = 'Olá! Gostaria de falar com um especialista sobre viabilidade para interligar filiais com Fibra Ponto-a-Ponto (Lan-to-Lan).';
    const encoded = encodeURIComponent(textMsg);
    const whatsappLink = `${CONTATO_CENTRALNET.whatsappUrl}&text=${encoded}`;
    window.open(whatsappLink, '_blank', 'noreferrer,noopener');
  };

  const VANTAGENS_PONTO = [
    {
      title: "Grande capacidade de interconexão",
      desc: "Ligue matriz, filiais, galpões de distribuição e escritórios remotos à velocidade da luz, como se estivessem no mesmo prédio."
    },
    {
      title: "Foco na Segurança Absoluta",
      desc: "Tráfego corporativo puramente interno que não trafega pela internet pública, mitigando ataques cibernéticos DDoS e invasões."
    },
    {
      title: "Dupla abordagem integrada",
      desc: "Projetos em fibra com redundância ativa via anel de fibra óptica ou por links de rádio profissional de alta frequência garantidos."
    },
    {
      title: "SLA contratual de até 99.9%",
      desc: "Elevada rigidez de sinal operado no nosso backbone com garantia de entrega e compensação contratual por perdas."
    },
    {
      title: "Flexibilidade total de IP",
      desc: "Liberdade para definir e estender seu próprio endereçamento IP local privativo ou blocos públicos conforme planejar."
    },
    {
      title: "NOC Monitoramento 24x7x365",
      desc: "Monitoramento constante de integridade de cabulação física e transmissores laser por equipe sênior dedicada."
    }
  ];

  return (
    <main className="pt-28 pb-24 bg-slate-50 min-h-screen font-sans">
      <div className="absolute top-28 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back navigation */}
        <button
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-bold px-3 py-2 bg-white hover:bg-slate-100 rounded-xl border border-slate-100 shadow-sm cursor-pointer mb-8 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Voltar ao Início</span>
        </button>

        {/* Hero Portion */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-[#0ea5e9] uppercase bg-[#e0f2fe] border border-[#bae6fd] px-4 py-1.5 rounded-full">
              <Network size={12} className="stroke-[2.5]" />
              FIBRA LAN-TO-LAN / LAYER 2 VPN
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight font-display leading-[1.1]">
              Interligação Blindada de Unidades com <span className="text-blue-600">Ponto-a-Ponto</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              O circuito Ponto-a-Ponto foi desenhado para endereçar conexões seguras e velozes acima de 1 Mbps com conexão puramente ethernet. Com ele, sua empresa usufrui de uma rede local exclusiva (L2VPN) ligando matriz, filiais e almoxarifados sem que os dados precisem tocar a rede pública de internet.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={handleCotar}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-6 py-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-98 transition-all flex items-center gap-2"
              >
                <span>Falar com especialista de suporte</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6 relative">
            <h3 className="font-extrabold text-sm text-slate-900 font-display">Como funciona a topologia em anel?</h3>
            
            {/* Visual architectural representation */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 bg-blue-50/50 p-3 rounded-2xl border border-blue-105/10">
                <div className="w-8 h-8 rounded-lg bg-blue-600 font-bold text-xs text-white flex items-center justify-center font-display shadow-xs">
                  A
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">Matriz Central</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Servidores ERP locais integrados</p>
                </div>
              </div>

              {/* Dotted Link */}
              <div className="h-6 border-l-2 border-dotted border-blue-300 ml-4"></div>

              <div className="flex items-center gap-3 bg-orange-50/50 p-3 rounded-2xl border border-orange-105/10">
                <CentralNetLogo showText={false} size="sm" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">CentralNet Backbone Óptico</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Transporte físico isolado sem internet pública</p>
                </div>
              </div>

              {/* Dotted Link */}
              <div className="h-6 border-l-2 border-dotted border-blue-300 ml-4"></div>

              <div className="flex items-center gap-3 bg-blue-50/50 p-3 rounded-2xl border border-blue-105/10">
                <div className="w-8 h-8 rounded-lg bg-blue-600 font-bold text-xs text-white flex items-center justify-center font-display shadow-xs">
                  B
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">Filiais de Vendas</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Estação cliente conectada como mesma rede interna</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="py-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-[10px] uppercase font-black text-orange-500 tracking-wider">Qualidade Garantida</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">Vantagens Operacionais para Empresas</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Menos latência, custos otimizados e facilidade de implantação sob demanda em todo o território de Surubim.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {VANTAGENS_PONTO.map((item, index) => {
              return (
                <div key={index} className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs hover:shadow-sm transition-all space-y-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-black text-xs">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-950 uppercase tracking-tight font-display">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Specs Banner */}
        <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden max-w-5xl mx-auto">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-2xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <span className="text-[9px] font-black tracking-widest text-[#0ea5e9] uppercase bg-[#0ea5e9]/10 px-3 py-1 rounded-full border border-[#0ea5e9]/20 inline-block">
                Implantação Imediata
              </span>
              <h3 className="text-2xl font-bold font-display text-white">Solicite um estudo de viabilidade para seu projeto</h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                Nossos engenheiros desenham layouts físicos robustos em fibra óptica ou rádio-frequência ponto-a-ponto de acordo com as barreiras geográficas locais de suas matrizes e filiais.
              </p>
            </div>
            <button
              onClick={handleCotar}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs px-6 py-4 rounded-xl transition-all whitespace-nowrap shadow-md"
            >
              Falar com Engenharia de Infra
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
