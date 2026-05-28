/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Wifi, Radio, Infinity, PiggyBank, Headphones, PhoneOff } from 'lucide-react';

const LIST_BENEFICIOS = [
  {
    icon: Wifi,
    titulo: '100% Fibra Óptica',
    descricao: 'Tecnologia GPON de ponta a ponta que garante a estabilidade máxima da sua internet.',
    cor: 'text-blue-500 bg-blue-50'
  },
  {
    icon: Radio,
    titulo: 'Wi-Fi Grátis',
    descricao: 'Roteador Dual-Band potente emprestado sem custo extra em regime de comodato para sua casa.',
    cor: 'text-orange-500 bg-orange-50'
  },
  {
    icon: Infinity,
    titulo: 'Conexão Ilimitada',
    descricao: 'Navegue o quanto quiser, baixe arquivos gigantescos e transmita sem qualquer franquia ou corte mensal.',
    cor: 'text-emerald-500 bg-emerald-50'
  },
  {
    icon: PiggyBank,
    titulo: 'Planos Acessíveis',
    descricao: 'Opções justas com velocidades exponenciais que cabem perfeitamente no planejamento financeiro familiar.',
    cor: 'text-amber-500 bg-amber-50'
  },
  {
    icon: Headphones,
    titulo: 'Suporte Especializado',
    descricao: 'Atendimento humanizado de alta qualidade e rapidez por WhatsApp ou telefone durante toda a semana.',
    cor: 'text-purple-500 bg-purple-50'
  },
  {
    icon: PhoneOff,
    titulo: 'Sem Custo de Telefone',
    descricao: 'Ao contrário de outras operadoras antigas, você não precisa assinar linha telefônica fixa para ter internet.',
    cor: 'text-rose-500 bg-rose-50'
  }
];

export default function Beneficios() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-55 border border-blue-100/60 px-3.5 py-1.5 rounded-full">
            Diferenciais de Verdade
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Por que centenas de famílias e empresas escolhem a CentralNet?
          </h2>
          <p className="text-base text-slate-600">
            Nossa missão é aproximar pessoas através de infraestrutura avançada e tratamento local e humanizado.
          </p>
        </div>

        {/* Grid Block */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {LIST_BENEFICIOS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-100 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white text-blue-600">
                    <IconComponent size={24} className="stroke-[2px]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {item.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.descricao}
                  </p>
                </div>
                
                <div className="w-8 h-1 bg-slate-100 rounded-full mt-6 group-hover:bg-orange-500 group-hover:w-16 transition-all duration-300"></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
