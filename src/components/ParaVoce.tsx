/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Wifi, Gamepad2, Laptop, Radio, Smartphone, Gift, ShieldAlert, ChevronRight } from 'lucide-react';

interface ParaVoceProps {
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel') => void;
  scrollSection: (sectionId: string) => void;
}

export default function ParaVoce({ setCurrentPage, scrollSection }: ParaVoceProps) {
  const SERVICOS = [
    {
      id: 'fibra',
      icon: Wifi,
      titulo: 'Fibra Óptica',
      descricao: 'Internet ultra-estável por cabo de luz, ideal para todos os cômodos da sua casa.',
      botaoLabel: 'Ver Planos Fibra',
      action: () => {
        setCurrentPage('assine');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      tag: 'Mais Vendido',
      tagColor: 'bg-blue-500/10 text-blue-600'
    },
    {
      id: 'gamer',
      icon: Gamepad2,
      titulo: 'Planos Gamer',
      descricao: 'Conexão refinada com rotas de baixíssimo ping para League of Legends, CS, Valorant e consoles.',
      botaoLabel: 'Conhecer Planos Gamer',
      action: () => {
        setCurrentPage('assine');
        setTimeout(() => {
          const el = document.getElementById('categoria-gamer');
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      },
      tag: 'Ping Baixo',
      tagColor: 'bg-emerald-500/10 text-emerald-600'
    },
    {
      id: 'casa',
      icon: Laptop,
      titulo: 'Casa Conectada',
      descricao: 'Intensidade de sinal para alimentar lâmpadas portáteis, TVs, portões e ar condicionado sem engasgos.',
      botaoLabel: 'Falar com Consultor',
      action: () => {
        const el = document.getElementById('contato');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'radio',
      icon: Radio,
      titulo: 'Internet via Rádio',
      descricao: 'Sinal de alta segurança focado em locais rurais e distantes onde a fibra ainda não chegou.',
      botaoLabel: 'Verificar Disponibilidade',
      action: () => {
        const el = document.getElementById('contato');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'movel',
      icon: Smartphone,
      titulo: 'CN Móvel',
      descricao: 'Chips de telefonia celular com ampla cobertura nacional e pacotes robustos extras de dados.',
      botaoLabel: 'Ver Planos Móvel',
      action: () => {
        setCurrentPage('cnmovel');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      tag: 'Novidade',
      tagColor: 'bg-purple-500/10 text-purple-600'
    },
    {
      id: 'vantagens',
      icon: Gift,
      titulo: 'CN Vantagens',
      descricao: 'Clube de benefícios parceiros com descontos imperdíveis em estabelecimentos selecionados.',
      botaoLabel: 'Aproveitar Clube',
      action: () => {
        const el = document.getElementById('contato');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'rastreamento',
      icon: ShieldAlert,
      titulo: 'Rastreamento Veicular',
      descricao: 'CN GPS: Proteja e saiba a localização exata de seu veículo na palma da mão 24 horas.',
      botaoLabel: 'Ativar Rastreador',
      action: () => {
        setCurrentPage('gps');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      tag: 'Segurança Total',
      tagColor: 'bg-rose-500/10 text-rose-600'
    }
  ];

  return (
    <section id="para-voce" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-50 border border-orange-100/65 px-3.5 py-1.5 rounded-full">
              Tecnologia Para Você
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Soluções completas planejadas para sua casa e família
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Trabalhe em Home Office, estude, jogue com ping estável e assista à sua programação favorita em alta definição com a máxima largura de banda disponível.
            </p>
          </div>
          <button 
            onClick={() => setCurrentPage('assine')}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-755 transition-colors group cursor-pointer whitespace-nowrap"
          >
            Ver todos os planos disponíveis
            <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Services Bento/List Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICOS.map((servico) => {
            const IconComponent = servico.icon;
            return (
              <div 
                key={servico.id}
                className="bg-slate-50/50 hover:bg-white rounded-3xl p-6 border border-slate-100/80 hover:border-slate-200 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Optional Tech Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <IconComponent size={24} className="stroke-[2px]" />
                    </div>
                    {servico.tag && (
                      <span className={`text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full ${servico.tagColor}`}>
                        {servico.tag}
                      </span>
                    )}
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">
                    {servico.titulo}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {servico.descricao}
                  </p>
                </div>

                {/* Styled Button CTA */}
                <button
                  onClick={servico.action}
                  className="w-full py-3 bg-white hover:bg-orange-500 hover:text-white text-slate-700 font-bold text-xs rounded-xl border border-slate-200 group-hover:border-transparent transition-all duration-300 cursor-pointer text-center"
                >
                  {servico.botaoLabel}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
