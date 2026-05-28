/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, Network, ShieldCheck, Activity, Phone, ArrowRight, Check, Sparkles, Server, Zap, RefreshCw } from 'lucide-react';
import { CONTATO_CENTRALNET } from '../types';
import CentralNetLogo from '../components/CentralNetLogo';

interface DedicadoPageProps {
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario') => void;
}

export default function DedicadoPage({ setCurrentPage }: DedicadoPageProps) {
  const handleCotar = (velocidade?: string) => {
    const textMsg = velocidade 
      ? `Olá! Tenho interesse no Link Dedicado de ${velocidade} para minha empresa. Gostaria de solicitar um orçamento e viabilidade técnica.`
      : 'Olá! Gostaria de falar com um especialista sobre soluções de Link Dedicado para minha empresa.';
    const encoded = encodeURIComponent(textMsg);
    const whatsappLink = `${CONTATO_CENTRALNET.whatsappUrl}&text=${encoded}`;
    window.open(whatsappLink, '_blank', 'noreferrer,noopener');
  };

  const VANTAGENS = [
    {
      icon: RefreshCw,
      title: "Garantia de Banda Simétrica (100%)",
      desc: "Download e Upload exatamente iguais. Crucial para envio constante de dados para nuvem, backups em tempo real e serviços web."
    },
    {
      icon: ShieldCheck,
      title: "SLA de Disponibilidade Extrema",
      desc: "Garantia contratual de disponibilidade operacional de até 99.8%. Faturamento ininterrupto com rotas redundantes."
    },
    {
      icon: Server,
      title: "IP Público Fixo Incluso",
      desc: "Possibilidade de blocos de IP fixos para servidores locais, sistemas internos privados, conexões VPN diretas e câmeras."
    },
    {
      icon: Activity,
      title: "Monitoramento Ativo 24/7",
      desc: "Nossa central de monitoria (NOC) antecipa e soluciona qualquer anomalia antes mesmo que sua equipe note."
    },
    {
      icon: Zap,
      title: "Latência Ultra Reduzida",
      desc: "Tráfego privilegiado através de anéis de fibra redundantes, ideais para operações financeiras e reuniões em tempo real."
    },
    {
      icon: Network,
      title: "Suporte Técnico Giga-SLA 24h",
      desc: "Sua empresa conta com atendimento exclusivo e expresso com chegada rápida de técnicos de campo altamente treinados."
    }
  ];

  return (
    <main className="pt-28 pb-24 bg-slate-50 min-h-screen font-sans">
      <div className="absolute top-28 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Button */}
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

        {/* Hero Area */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1 text-xs font-black tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">
              <Sparkles size={12} className="stroke-[2.5]" />
              Conexão Exclusiva para PMEs e Grandes Empresas
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight font-display leading-[1.1]">
              O que é um <span className="text-blue-600">Link Dedicado</span> e por que sua empresa precisa dele?
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Diferente da banda larga convencional, o Link Dedicado oferece uma rota exclusiva onde sua largura de banda não é compartilhada com nenhum vizinho. Sua empresa opera no anel óptico com estabilidade militar, SLA de alta tolerância e suporte Giga-SLA prioritário.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => handleCotar()}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-6 py-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-98 transition-all flex items-center gap-2"
              >
                <span>Falar com Gerente de Contas</span>
                <ArrowRight size={14} />
              </button>
              <a
                href="#planos-valores"
                className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-xs px-6 py-4 rounded-xl transition-colors inline-flex items-center justify-center"
              >
                Ver Planos Disponíveis
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-tr from-blue-900 to-slate-900 text-white rounded-3xl p-8 border border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full filter blur-2xl pointer-events-none"></div>
            <div className="space-y-6 relative z-10">
              <div className="flex gap-3 items-center">
                <CentralNetLogo showText={false} size="sm" theme="dark" />
                <div>
                  <h3 className="font-extrabold text-sm tracking-tight">CentralNet Empresas</h3>
                  <p className="text-[10px] text-slate-350 font-medium">Projetos Customizados</p>
                </div>
              </div>

              <div className="space-y-3 pt-3">
                <p className="text-[11px] font-black tracking-widest text-orange-500 uppercase">Benefícios do Contrato</p>
                <div className="space-y-2 text-xs text-slate-300">
                  <p className="flex items-start gap-2">
                    <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Conexão por Fibra Óptica redundante física no prédio.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>IP Fixo Público (/29 ou superior) de acordo com a demanda.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Clube de Vantagens Corporativo de Descontos e Parcerias.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Assinatura Digital de relatórios de banda e SLA.</span>
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-2xl border border-white/5 space-y-1 text-center">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Garantia em Contrato</span>
                <span className="text-xl font-black text-white font-display">100% de Velocidade Simétrica</span>
                <p className="text-[10px] text-slate-400">Download = Upload a qualquer horário do dia ou noite.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Cards Grid */}
        <div className="py-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
              A vantagem competitiva definitiva para sua empresa
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Criamos uma estrutura focada em resilicência cibernética e operacional para conectar seu faturamento sem riscos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {VANTAGENS.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div key={index} className="bg-white hover:bg-slate-50/50 p-6 rounded-3xl border border-slate-150 shadow-xs hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
                    <IconComp size={18} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2 font-display">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Simular e valores */}
        <div id="planos-valores" className="mt-16 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-orange-500 font-extrabold pb-1 block">Soluções Corporativas</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-display">Sugestões de Velocidades Recomendadas</h2>
            <p className="text-xs text-slate-500">
              Trabalhamos com velocidades sob medida até 10 Gbps. Confira os mais requisitados por empresas em Surubim e região:
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="border border-slate-150 rounded-2xl p-6 bg-slate-50 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="bg-blue-600 text-white rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider inline-block">
                  Escritórios PMEs
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">100 Mega</h3>
                <p className="text-xs text-slate-500">Indicado para lojas comerciais com até 15 colaboradores usando sistemas de ERP e faturamento em nuvem simultâneos.</p>
              </div>
              <button
                onClick={() => handleCotar('100 Mega Dedicado')}
                className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 rounded-xl transition-all uppercase tracking-wider"
              >
                Pedir Cotação
              </button>
            </div>

            <div className="border border-orange-500/40 shadow-sm rounded-2xl p-6 bg-white flex flex-col justify-between relative">
              <div className="absolute top-3 right-3 bg-orange-500 text-white rounded-md px-2 py-0.5 text-[8px] font-black uppercase tracking-wider">
                Mais Vendido
              </div>
              <div className="space-y-4">
                <div className="bg-orange-500 text-white rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider inline-block">
                  Corporações de Escopo
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">200 Mega</h3>
                <p className="text-xs text-slate-500">Ideal para escolas, clínicas de saúde, redes de varejo, servidores e sedes que dependem de VPN estável para interligar filiais.</p>
              </div>
              <button
                onClick={() => handleCotar('200 Mega Dedicado')}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-3.5 rounded-xl transition-all uppercase tracking-wider shadow-sm"
              >
                Pedir Cotação
              </button>
            </div>

            <div className="border border-slate-150 rounded-2xl p-6 bg-slate-50 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="bg-violet-600 text-white rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider inline-block">
                  Altamente Crítico
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">300 M a 1 Gbps+</h3>
                <p className="text-xs text-slate-500">Desenvolvido sob demanda para hospitais, provedores regionais, data centers corporativos e indústrias com processos IoT e automação.</p>
              </div>
              <button
                onClick={() => handleCotar('Acima de 300 Mega')}
                className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 rounded-xl transition-all uppercase tracking-wider"
              >
                Consultar Viabilidade
              </button>
            </div>
          </div>
        </div>

        {/* Consulting Project Card */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden max-w-5xl mx-auto shadow-lg">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-3">
              <span className="text-[9px] font-black tracking-widest text-sky-400 uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20 inline-block">
                Consultoria e Engenharia de Rede
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Precisa de suporte consultivo personalizado?</h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Nossos engenheiros de telecomunicações analisam as demandas de sua empresa sem compromisso e formulam projetos arquitetônicos otimizados de fibra redundante e endereçamento IP.
              </p>
            </div>
            <button
              onClick={() => handleCotar()}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs px-6 py-4 rounded-xl transition-all whitespace-nowrap shadow-lg shrink-0"
            >
              Falar com Engenheiro no WhatsApp
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
