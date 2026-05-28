/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, MessageSquare, Phone, ArrowRight, ShieldCheck, Headphones, Smartphone, HelpCircle, Check } from 'lucide-react';
import { PLANOS_CNMOVEL, PlanoMovel, CONTATO_CENTRALNET } from '../types';

interface CnMovelPageProps {
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel') => void;
}

export default function CnMovelPage({ setCurrentPage }: CnMovelPageProps) {
  const handleContratar = (plano: PlanoMovel) => {
    const textMsg = `Olá! Gostaria de contratar o plano CN Móvel "${plano.nome} ${plano.gigaTotal}" por R$ ${plano.preco}/mês. Como funciona a portabilidade e ativação do chip?`;
    const encoded = encodeURIComponent(textMsg);
    const whatsappLink = `https://wa.me/5581995009874?text=${encoded}`;
    window.open(whatsappLink, '_blank', 'noreferrer,noopener');
  };

  return (
    <main className="pt-28 pb-24 bg-slate-50 min-h-screen font-sans">
      {/* Background decoration */}
      <div className="absolute top-28 left-0 right-0 h-96 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none"></div>

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

        {/* Hero Title Portion */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-black tracking-widest text-orange-500 uppercase bg-orange-50 border border-orange-100/60 px-4 py-1.5 rounded-full">
            Planos CN Móvel
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
            A melhor conexão móvel para o seu smartphone
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Fale ilimitado, use WhatsApp sem consumir sua franquia e garanta bônus exclusivos de portabilidade com a cobertura de alto padrão e estabilidade da CentralNet.
          </p>
        </div>

        {/* PLANS DISPLAY GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANOS_CNMOVEL.map((plano) => {
            return (
              <div
                key={plano.id}
                className={`bg-white rounded-3xl overflow-hidden border shadow-sm transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:scale-101 relative ${
                  plano.bannerPopular 
                    ? 'border-orange-500 ring-2 ring-orange-500/40 shadow-md md:scale-[1.02]' 
                    : 'border-slate-100'
                }`}
              >
                {/* Popular badge */}
                {plano.bannerPopular && (
                  <span className="absolute top-3 right-3 bg-white text-orange-600 text-[9px] font-black tracking-wider uppercase px-3 py-1 rounded-full shadow-sm z-20">
                    POPULAR ⭐
                  </span>
                )}

                {/* Orange top block styled exactly like the physical flyer */}
                <div className="bg-orange-500 text-white p-6 text-center space-y-2 relative">
                  <div className="absolute top-2 left-3 text-white/20 font-black text-5xl font-display pointer-events-none select-none">
                    CN
                  </div>
                  <h3 className="text-2xl font-black tracking-wider font-display drop-shadow-sm">
                    {plano.nome}
                  </h3>
                  <div className="text-4xl font-extrabold font-display border-t border-white/20 pt-1.5">
                    {plano.gigaTotal}
                  </div>
                  <div className="text-[11px] font-bold text-orange-100 bg-orange-600/30 py-1 px-2 rounded-lg inline-block">
                    {plano.franquiaDetalhe}
                  </div>
                </div>

                {/* Plan parameters body */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between gap-6 bg-white">
                  
                  {/* Detailed specs list resembling the graphics */}
                  <div className="space-y-4">
                    {/* WhatsApp */}
                    <div className="flex gap-3.5 items-center">
                      <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                        {/* Custom visual WhatsApp SVG to match the theme green */}
                        <svg className="w-5 h-5 text-emerald-500 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.035-4.225l.394.234c1.61.957 3.47 1.463 5.4 1.465 5.562 0 10.086-4.524 10.089-10.091.002-2.697-1.047-5.234-2.952-7.143C17.11 2.33 14.58 1.282 11.992 1.282c-5.565 0-10.093 4.52-10.097 10.091-.002 1.83.479 3.619 1.393 5.191l.257.442-.998 3.645 3.73-.978zM17.12 14.39c-.28-.14-1.65-.814-1.906-.907-.256-.093-.443-.14-.63.14-.187.28-.72.907-.883 1.093-.163.187-.326.21-.606.07-.28-.14-1.182-.435-2.251-1.39-1.203-1.073-1.722-1.455-1.921-1.826-.2-.373-.021-.575.16-.714.163-.125.326-.373.49-.56.163-.187.218-.32.327-.535.11-.215.054-.403-.028-.56-.082-.157-.63-1.52-.863-2.08-.227-.547-.463-.473-.632-.473-.163-.002-.35-.002-.538-.002-.187 0-.49.07-.747.35-.257.28-1.001.978-1.001 2.385s1.026 2.766 1.168 2.952c.141.187 2.016 3.08 4.886 4.316.685.295 1.218.47 1.637.603.687.219 1.312.188 1.808.114.551-.082 1.652-.676 1.884-1.33.233-.653.233-1.214.163-1.33-.07-.116-.256-.21-.536-.35z" />
                        </svg>
                      </div>
                      <div className="leading-tight">
                        <span className="text-emerald-600 font-extrabold text-[10px] uppercase tracking-wider block">WhatsApp Grátis</span>
                        <span className="text-xs text-slate-700 font-bold">{plano.whatsapp}</span>
                      </div>
                    </div>

                    {/* Ligações */}
                    <div className="flex gap-3.5 items-center">
                      <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                        <Phone size={15} />
                      </div>
                      <div className="leading-tight">
                        <span className="text-blue-600 font-extrabold text-[10px] uppercase tracking-wider block">Ligações</span>
                        <span className="text-xs text-slate-700 font-bold">{plano.ligacoes}</span>
                      </div>
                    </div>

                    {/* SMS */}
                    <div className="flex gap-3.5 items-center">
                      <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                        <MessageSquare size={15} />
                      </div>
                      <div className="leading-tight">
                        <span className="text-slate-500 font-extrabold text-[10px] uppercase tracking-wider block">Mensagens</span>
                        <span className="text-xs text-slate-700 font-bold">{plano.sms}</span>
                      </div>
                    </div>

                    {/* Skeelo Audiobooks styled badge mimicking the exact app-store style indicator */}
                    {plano.skeelo && (
                      <div className="mt-2.5 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50 p-2.5 rounded-xl">
                        {/* Skeelo custom branding block */}
                        <div className="flex items-center gap-2">
                          <div className="bg-slate-900 border border-slate-700/80 rounded-lg px-2 py-1 text-[10px] font-black text-white flex items-center gap-1">
                            {/* Alien sprout logo mockup representing Skeelo */}
                            <div className="w-2.5 h-2.5 rounded px-0.5 bg-emerald-500 flex items-center justify-center font-mono text-[6px] text-slate-900 font-black">
                              👽
                            </div>
                            <span className="font-sans text-[8px] tracking-tight uppercase">skeelo <span className="text-emerald-400 font-semibold normal-case text-[7px]">audiobooks</span></span>
                          </div>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase font-black px-1.5 py-0.5 rounded-md">
                            GRÁTIS
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium font-sans">
                          Acesso Imediato
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Pricing Footer and Active WhatsApp CTA */}
                  <div className="space-y-4">
                    {/* Dark/Blue price banner matching flyer */}
                    <div className="bg-blue-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-inner">
                      <span className="text-[10px] uppercase tracking-widest text-blue-200 font-black">Valor Mensal</span>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-xs font-bold text-blue-200">R$</span>
                        <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
                          {plano.preco}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleContratar(plano)}
                      className={`w-full py-4.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider ${
                        plano.bannerPopular
                          ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-200'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <span>Ativar Esse Plano</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Call banner */}
        <div className="mt-20 bg-emerald-50 rounded-3xl p-8 sm:p-10 border border-emerald-100 shadow-sm max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-md shrink-0">
              <Phone size={24} className="fill-white stroke-emerald-500" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full uppercase tracking-wider">Portabilidade Rápida</span>
              <h3 className="text-xl font-bold text-slate-900 font-display">Deseja trazer seu número atual para a CentralNet?</h3>
              <p className="text-xs text-slate-500">Fazemos a portabilidade imediata sem burocracia e com a mesma numeração atual. Solicite agora!</p>
            </div>
          </div>
          <a
            href={CONTATO_CENTRALNET.whatsappUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-4 rounded-xl text-xs font-bold transition-all w-full md:w-auto inline-flex items-center justify-center gap-2 shadow-md hover:scale-103 active:scale-97"
          >
            <span>Pedir Portabilidade no WhatsApp</span>
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Informative Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-slate-200/60 max-w-5xl mx-auto text-center md:text-left text-slate-500">
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck size={16} className="text-blue-600" /> Sem Carência ou Fidelidade
            </h4>
            <p className="text-xs leading-relaxed">Nossos planos prezam pela transparência e liberdade. Use sua internet móvel sem contratos de fidelização forçados.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 flex items-center justify-center md:justify-start gap-1.5">
              <Headphones size={16} className="text-blue-600" /> Cobertura Nacional 4G / 5G
            </h4>
            <p className="text-xs leading-relaxed">Conecte-se com sinal garantido nas estradas, capitais e no interior através das torres operacionais mais estáveis do país.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 flex items-center justify-center md:justify-start gap-1.5">
              <Smartphone size={16} className="text-blue-600" /> Chips Estilo Triplo Corte
            </h4>
            <p className="text-xs leading-relaxed">Receba ou retire seu chip compatível com todos os modelos de smartphone (Mini, Micro ou Nano SIM).</p>
          </div>
        </div>

      </div>
    </main>
  );
}
