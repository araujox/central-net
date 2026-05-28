/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, MapPin, Eye, Lock, RefreshCw, Layers, Truck, Smartphone, ChevronRight } from 'lucide-react';

interface RastreamentoSectionProps {
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel') => void;
}

export default function RastreamentoSection({ setCurrentPage }: RastreamentoSectionProps) {
  const FUNCIONALIDADES_GPS = [
    {
      icon: MapPin,
      titulo: 'Localização em Tempo Real',
      descricao: 'Saiba exatamente onde seu veículo está com atualizações instantâneas de segundos sobre o mapa de alta definição.'
    },
    {
      icon: Eye,
      titulo: 'Cerca Virtual Georreferenciada',
      descricao: 'Defina limites de circulação permitidos no GPS e receba alertas imediatos no celular se o veículo sair daquela delimitação.'
    },
    {
      icon: Lock,
      titulo: 'Bloqueio e Desbloqueio Instantâneo',
      descricao: 'Em casos de emergência, roubo ou furto, efetue o corte de combustível do motor do veículo diretamente pelo seu celular.'
    },
    {
      icon: RefreshCw,
      titulo: 'Histórico Completo de Rotas',
      descricao: 'Revise todas as rotas percorridas, paradas com tempos de ócio, velocidade média alcançada e quilometragem de até 90 dias atrás.'
    },
    {
      icon: Layers,
      titulo: 'Monitoramento de Frota Inteligente',
      descricao: 'Monitore múltiplos veículos comerciais e motos simultaneamente em uma única tela de forma consolidada e veloz.'
    },
    {
      icon: Truck,
      titulo: 'Proteção Total e Versátil',
      descricao: 'Módulo de hardware super discreto anti-água ideal para motos, carros comerciais, caminhões e frotas agrícolas de serviço.'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Decorative side shape */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-500/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-50 border border-orange-100/60 px-3.5 py-1.5 rounded-full">
            Segurança Sob Controle: CN GPS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Rastreamento Veicular Completo na Palma da Mão
          </h2>
          <p className="text-base text-slate-600">
            Proteja o seu patrimônio com a tecnologia líder em acompanhamento georreferenciado 24 horas por dia. Controle rotas, bloqueie motores e tenha tranquilidade absoluta.
          </p>
        </div>

        {/* Layout Grid columns */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Features Column */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {FUNCIONALIDADES_GPS.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={index} 
                  className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-slate-200 hover:-translate-y-0.5 shadow-sm transition-all"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                      <IconComp size={20} className="stroke-[2px]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900 font-display leading-tight">{item.titulo}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.descricao}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Marketing Column */}
          <div className="lg:col-span-4 bg-slate-900 text-white p-8 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden flex flex-col justify-between h-full min-h-[420px]">
            
            {/* Visual shine blur background */}
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-500/15 rounded-full filter blur-xl"></div>
            
            <div className="space-y-6 relative z-10">
              <div className="inline-flex p-3 rounded-2xl bg-orange-500/20 text-orange-500">
                <Shield size={24} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-display text-white">Pronto para proteger seu veículo?</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Planos acessíveis com instalação limpa sob agendamento prévio. Mantenha controle de frotas comerciais com relatórios focados e alertas automáticos.
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2 text-xs font-semibold text-slate-300">
                <p className="flex items-center gap-2">✔ Aplicativo iOS e Android oficial</p>
                <p className="flex items-center gap-2">✔ Dispositivo discreto e imperceptível</p>
                <p className="flex items-center gap-2">✔ Bateria inteligente de baixo consumo</p>
              </div>
            </div>

            {/* Obligatory Button */}
            <div className="pt-8 relative z-10">
              <button
                id="conhecer-rastreamento-section-btn"
                onClick={() => {
                  setCurrentPage('gps');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-xl text-xs flex items-center justify-center gap-2 transition-transform hover:scale-102 active:scale-98 cursor-pointer shadow-md text-center font-display"
              >
                <span>Conhecer Rastreamento Veicular</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
