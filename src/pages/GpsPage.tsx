/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Shield, MapPin, Eye, Lock, RefreshCw, Layers, Truck, Smartphone, ChevronRight, Check, Star, CornerDownRight, Play, ArrowLeft, Key, Zap } from 'lucide-react';
import { DEPOIMENTOS_CENTRALNET } from '../types';
import { useCMS } from '../context/CMSContext';

interface GpsPageProps {
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario', tab?: 'residencial' | 'gamer' | 'casa-conectada' | 'radio' | 'empresarial') => void;
}

export default function GpsPage({ setCurrentPage }: GpsPageProps) {
  const { data } = useCMS();
  const [activePlan, setActivePlan] = useState<'individual' | 'frota'>('individual');

  const depoimentosGps = DEPOIMENTOS_CENTRALNET.filter(d => d.tipo === 'gps' || d.id === 'd3');

  const REAL_TIME_SERVICES = [
    {
      icon: MapPin,
      titulo: 'Localização em Tempo Real',
      descricao: 'Monitore as rotas do seu veículo 24 horas por dia em mapas detalhados de alta resolução com atualizações instantâneas de segundos.'
    },
    {
      icon: Eye,
      titulo: 'Cercas Virtuais Inteligentes',
      descricao: 'Preestabeleça áreas de tráfego seguras no mapa. Se o rastreador sair ou adentrar nesses raios, você é avisado prontamente no smartphone.'
    },
    {
      icon: Lock,
      titulo: 'Bloqueio do Motor Instantâneo',
      descricao: 'Sistema anti-furto seguro de verdade. Em caso de sinistros, realize o corte de combustível e trave a partida do veículo com toque único.'
    },
    {
      icon: RefreshCw,
      titulo: 'Histórico de Rotas Percorridas',
      descricao: 'Informações detalhadas sobre todas as ruas visitadas, limites de velocidade de ócio excedidos e tempos de paradas de 90 dias atrás.'
    },
    {
      icon: Zap,
      titulo: 'Sensor de Ignição Motor On/Off',
      descricao: 'Receba alertas sonoros no aplicativo no exato milissegundo em que a chave de ignição da moto ou do carro for ligada.'
    },
    {
      icon: Shield,
      titulo: 'Proteção Ativa 24 Horas',
      descricao: 'Ideal para motocicletas, carros convencionais, utilitários, frotas agrícolas, caminhões e cargas de alto valor.'
    },
    {
      icon: Layers,
      titulo: 'Monitoramento de Frotas Comerciais',
      descricao: 'Agrupe e analise rotas consolidadas de múltiplos veículos corporativos em uma única interface inteligente para otimizar custos.'
    }
  ];

  const PLANS_GPS = [
    {
      id: 'moto',
      nome: 'MOTO',
      preco: 'R$ 19,90',
      subtitulo: 'Para clientes CentralNet',
      beneficios: [
        'Proteção 24h',
        'Bloqueio e Desbloqueio',
        'Rastreadores Atualizados',
        'Acesso via Aplicativo',
        'Acesso via Web',
        'Taxa de Instalação - R$ 50,00'
      ],
      tag: 'MOTO E CICLOMOTOR'
    },
    {
      id: 'carro',
      nome: 'CARRO',
      preco: 'R$ 19,90',
      subtitulo: 'Para clientes CentralNet',
      beneficios: [
        'Proteção 24h',
        'Bloqueio e Desbloqueio',
        'Rastreadores Atualizados',
        'Acesso via Aplicativo',
        'Acesso via Web',
        'Taxa de Instalação - R$ 50,00'
      ],
      tag: 'CARROS E UTILITÁRIOS',
      bannerPopular: true
    },
    {
      id: 'caminhao',
      nome: 'CAMINHÃO',
      preco: 'R$ 29,90',
      subtitulo: 'Para clientes CentralNet',
      beneficios: [
        'Proteção 24h',
        'Bloqueio e Desbloqueio',
        'Rastreadores Atualizados',
        'Acesso via Aplicativo',
        'Acesso via Web',
        'Taxa de Instalação - R$ 70,00'
      ],
      tag: 'PESADOS E UTILITÁRIOS'
    },
    {
      id: 'smartphone',
      nome: 'SMARTPHONE',
      preco: 'R$ 4,90',
      subtitulo: 'Para clientes CentralNet',
      beneficios: [
        'Proteção 24h',
        'Acesso via Aplicativo',
        'Acesso via Web',
        'Melhor Custo Benefício'
      ],
      tag: 'PESSOAL / SMARTPHONES'
    }
  ];

  return (
    <main className="pt-28 pb-24 bg-slate-950 text-white min-h-screen font-sans overflow-hidden">
      
      {/* Background glowing particles and radial orbs */}
      <div className="absolute top-28 left-0 right-0 h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(242,101,34,0.15),transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back navigation */}
        <button
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 text-xs text-slate-300 font-bold px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 cursor-pointer mb-8 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Voltar ao Início</span>
        </button>

        {/* HERO SECTION: Call to tracking */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-24">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold rounded-full uppercase tracking-wider">
              <Shield size={12} />
              Rastreamento Veicular CN GPS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-display">
              Segurança, controle e <span className="text-orange-500">proteção</span> em tempo real.
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Monitore de onde estiver, bloqueie o motor em segundos, crie cercas virtuais e proteja sua moto, carro ou caminhão com a tecnologia de posicionamento georreferenciado mais estável e rápida da região.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
              <a
                href={data.contato.whatsappUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="bg-orange-500 hover:bg-orange-600 text-white font-black px-8 py-4.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-transform hover:scale-102 cursor-pointer shadow-lg font-display"
              >
                <span>Solicitar CN GPS no WhatsApp</span>
                <ChevronRight size={16} />
              </a>

              <a
                href="https://gps.centralnetsurubim.com.br/"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="bg-slate-805 hover:bg-slate-800 text-slate-100 font-bold px-6 py-4 rounded-xl border border-white/5 text-xs flex items-center justify-center gap-2 transition-all hover:scale-102 shadow-md"
              >
                <Smartphone size={16} className="text-orange-500" />
                <span>Entrar no Servidor de GPS</span>
              </a>
            </div>
          </div>

          {/* Interactive wireframe radar animation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-80 h-80 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden group">
              {/* Radar green scanning bar sweep */}
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(14,165,233,0.15)_0deg,transparent_130deg)] animate-[spin_5s_linear_infinite]"></div>
              
              {/* Radar circles grid */}
              <div className="absolute w-[80%] h-[80%] border border-white/5 rounded-full"></div>
              <div className="absolute w-[60%] h-[60%] border border-white/5 rounded-full"></div>
              <div className="absolute w-[40%] h-[40%] border border-white/5 rounded-full"></div>
              <div className="absolute w-px h-full bg-white/5"></div>
              <div className="absolute h-px w-full bg-white/5"></div>
              
              {/* Active bouncing target pinpoint visual */}
              <div className="absolute top-1/3 left-1/4 flex flex-col items-center gap-1.5 animate-bounce relative z-10 select-none">
                <div className="relative">
                  <div className="absolute -inset-1.5 rounded-full bg-orange-500/60 animate-ping"></div>
                  <div className="w-4.5 h-4.5 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-slate-900">
                    <Shield size={9} />
                  </div>
                </div>
                <div className="bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 text-[9px] font-mono text-emerald-400">
                  MOTO ATIVA: ONLINE
                </div>
              </div>

              {/* Central pinpoint */}
              <div className="w-2.5 h-2.5 bg-sky-400 rounded-full border border-slate-950 relative z-10"></div>
            </div>
          </div>

        </div>

        {/* SERVICES BLOCK: 7 highlighted services */}
        <div className="py-16 border-t border-white/5">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full">
              Recursos Avançados
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Tudo o que o sistema CN GPS entrega de verdade</h2>
            <p className="text-xs sm:text-sm text-slate-400">Equipamento encapsulado resistente montado estrategicamente por eletricistas técnicos credenciados.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {REAL_TIME_SERVICES.map((servico, idx) => {
              const IconComponent = servico.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white/5 hover:bg-white/10 rounded-2xl p-6 border border-white/5 hover:border-orange-500/20 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-2 font-display">{servico.titulo}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">{servico.descricao}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PLANS SECTION */}
        <div className="py-16 border-t border-white/5">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full">
              Tabela de Preços
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Planos Mensais CN GPS Justos e Sem Carência</h2>
            <p className="text-xs sm:text-sm text-slate-400">Taxa de instalação única reduzida, sob agendamento prévio facilitado.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS_GPS.map((plano) => (
              <div 
                key={plano.id}
                className={`bg-white/5 rounded-3xl p-6 border hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between relative ${
                  plano.bannerPopular 
                    ? 'border-orange-500 shadow-xl ring-1 ring-orange-500/40' 
                    : 'border-white/5'
                }`}
              >
                {plano.bannerPopular && (
                  <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-[8px] font-black tracking-widest uppercase px-3 py-1 rounded-full whitespace-nowrap">
                    RECOMENDADO
                  </span>
                )}

                <div className="space-y-5">
                  <div className="text-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#0ea5e9] bg-[#e0f2fe]/10 px-2.5 py-1 rounded border border-[#bae6fd]/15 block w-fit mx-auto">{plano.tag}</span>
                    <h3 className="text-lg font-black text-white font-display mt-3.5 tracking-tight">{plano.nome}</h3>
                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center bg-slate-900/60 space-y-1 font-display">
                    <span className="text-white text-3xl font-black tracking-tight block">{plano.preco}</span>
                    <span className="text-[10px] text-orange-500 font-extrabold block tracking-wider uppercase">{plano.subtitulo}</span>
                  </div>

                  <ul className="space-y-2.5 text-slate-300 text-xs">
                    {plano.beneficios.map((ben, i) => (
                      <li key={i} className="flex gap-2 items-center">
                        <Check size={12} className="text-orange-500 shrink-0 stroke-[3px]" />
                        <span className="font-semibold">{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <a
                    href={`https://wa.me/5581995009874?text=Ol%C3%A1%21+Gostaria+de+saber+mais+e+contratar+o+plano+de+rastreamento+${encodeURIComponent(plano.nome)}.`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 active:scale-98 hover:scale-[1.02] transition-all uppercase text-center cursor-pointer"
                  >
                    <span>COMPRAR AGORA</span>
                    <ChevronRight size={14} />
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* MOBILE APP SHOWCASE */}
        <div className="py-16 border-t border-white/5 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full">
              Aplicativo Nativo
            </span>
            <h2 className="text-3xl font-extrabold text-white font-display">Sua segurança na palma da mão nos celulares iOS e Android</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              O aplicativo oficial CN GPS consome pouquíssima bateria do telefone e envia notificações PUSH na tela bloqueada instantaneamente se houver violação de área de segurança, excesso de velocidade ou chave ligada indevida.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a 
                href="https://gps.centralnetsurubim.com.br/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/5 px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/10 font-bold text-xs flex items-center gap-2 transition-all hover:scale-102"
              >
                <span>Baixar para Android</span>
                <Play size={10} className="fill-white stroke-none" />
              </a>
              <a 
                href="https://gps.centralnetsurubim.com.br/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/5 px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/10 font-bold text-xs flex items-center gap-2 transition-all hover:scale-102"
              >
                <span>Baixar para iOS</span>
                <Play size={10} className="fill-white stroke-none" />
              </a>
            </div>
          </div>

          {/* Interactive mockup wireframe of APP */}
          <div className="flex justify-center">
            <div className="w-56 h-96 bg-slate-900 border border-white/15 rounded-3xl p-3 relative shadow-2xl overflow-hidden flex flex-col justify-between">
              {/* Phone ear speaker notch */}
              <div className="w-20 h-3.5 bg-slate-950 rounded-full mx-auto relative -top-1"></div>
              
              {/* Fake App screen mockup rendering maps placeholder layout */}
              <div className="bg-slate-950/80 rounded-2xl flex-1 mt-2 p-3 space-y-3 flex flex-col justify-between relative overflow-hidden">
                {/* Fake map wireframe lines */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
                
                <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 relative z-10">
                  <span>CN GPS APP V4</span>
                  <span>100% SATÉLITE</span>
                </div>

                <div className="bg-white/5 p-2 rounded-xl relative z-10 border border-white/5 space-y-1.5">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <span className="text-[9px] text-white font-bold uppercase">Moto - CB500</span>
                  </div>
                  <p className="text-[8px] text-slate-400">Ignição: Desligada</p>
                  <p className="text-[8px] text-slate-400">Última atualização: Há 12s</p>
                </div>

                {/* Simulated lock button */}
                <div className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 p-2.5 rounded-xl text-center text-[9px] font-bold tracking-wide relative z-10 flex items-center justify-center gap-1 cursor-pointer">
                  <Key size={10} />
                  <span>BLOQUEAR MOTOR AGORA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TESTIMONIALS & TRUST POINTS */}
        <div className="py-16 border-t border-white/5">
          <h3 className="text-xl font-bold font-display text-white text-center mb-10">Quem usa a blindagem CN GPS recomenda</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {depoimentosGps.map((dep) => (
              <div key={dep.id} className="bg-white/5 p-6 rounded-3xl border border-white/5 shadow-sm space-y-4">
                <div className="flex text-amber-500 gap-0.5">
                  <Star size={14} className="fill-amber-500" />
                  <Star size={14} className="fill-amber-500" />
                  <Star size={14} className="fill-amber-500" />
                  <Star size={14} className="fill-amber-500" />
                  <Star size={14} className="fill-star fill-amber-500" />
                </div>
                <p className="text-xs text-slate-300 italic">"{dep.comentario}"</p>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white">{dep.autor}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">{dep.cidade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REASSURING LOGIN OR CONTACT */}
        <div className="mt-12 bg-white/5 p-8 rounded-3xl border border-white/5 backdrop-blur-md max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs font-bold text-orange-500 uppercase tracking-widest">Acesso do Cliente CN GPS</p>
          <h3 className="text-lg font-bold text-white font-display">Já possui o rastreador instalado no seu veículo?</h3>
          <p className="text-xs text-slate-400">Clique abaixo para entrar na plataforma oficial e monitorar suas cercas virtuais em tempo real.</p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <a
              href="https://gps.centralnetsurubim.com.br/"
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-102 shadow-md inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Acessar Login CN GPS</span>
              <Smartphone size={14} />
            </a>
            <a
              href={data.contato.whatsappUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="bg-slate-850 hover:bg-slate-800 text-slate-200 px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Falar com Assistente Técnico</span>
              <Check size={14} />
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
