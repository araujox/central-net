/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, FileText, Download } from 'lucide-react';

interface ContratosPageProps {
  setCurrentPage: (page: 'home' | 'assine' | 'gps' | 'cnmovel' | 'dedicado' | 'ponto' | 'temporario' | 'contratos') => void;
}

export default function ContratosPage({ setCurrentPage }: ContratosPageProps) {
  const contratos = [
    {
      title: 'CONTRATO SCM',
      url: 'https://centralnetsurubim.com.br/contratos/scm.pdf',
    },
    {
      title: 'CONTRATO COMODATO',
      url: 'https://centralnetsurubim.com.br/contratos/comodato.pdf',
    },
    {
      title: 'CONTRATO DEDICADO',
      url: 'https://centralnetsurubim.com.br/contratos/link_dedicado.pdf',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* 1. Header Band with Blue Wave/Gradient Layout */}
      <div className="relative pt-36 pb-20 bg-gradient-to-r from-blue-600 to-sky-500 overflow-hidden text-center text-white select-none">
        {/* Abstract shapes / light streaks mimicking high-fidelity design */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-400/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute -left-16 -top-16 w-64 h-64 bg-white/5 rounded-full filter blur-xl pointer-events-none"></div>
        <div className="absolute right-10 bottom-0 w-96 h-32 bg-sky-300/10 rounded-full filter blur-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight font-display drop-shadow-sm">
            Contratos
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-white/90">
            <span>Atendimento</span>
            <span className="text-sky-200/80 font-bold">&#8250;</span>
            <span className="font-semibold text-white">Contratos</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        {/* Back navigation */}
        <button
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-bold px-4 py-2 bg-white hover:bg-slate-100 rounded-xl border border-slate-200/60 shadow-xs cursor-pointer mb-12 transition-all hover:translate-x-[-2px]"
        >
          <ArrowLeft size={14} />
          <span>Voltar ao Início</span>
        </button>

        {/* 2. Abstract Polygonal Backdrop grid for the Cards */}
        <div className="relative mt-4">
          {/* Triangles decorative background or grid */}
          <div className="absolute inset-0 bg-transparent opacity-5 pointer-events-none -z-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40 L 40 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>

          {/* Cards Grid exactly styled as the user screenshot: 3 PDF entries */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contratos.map((item, index) => (
              <a
                href={item.url}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                key={index}
                className="group bg-white rounded-3xl p-8 border border-slate-150 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center gap-6 cursor-pointer relative top-0 hover:-top-1 overflow-hidden"
              >
                {/* Background elegant lighting on hover */}
                <div className="absolute inset-0 bg-sky-50/10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>

                {/* Custom Styled High-Fidelity PDF download icon matching screenshot */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                  {/* The Document base shape */}
                  <div className="w-16 h-20 bg-white border-2 border-slate-300 rounded-lg shadow-sm relative flex items-center justify-center transition-all duration-300 group-hover:border-sky-500 group-hover:shadow-md">
                    {/* Folded corner of document */}
                    <div className="absolute top-0 right-0 w-4 h-4 bg-slate-100 border-b border-l border-slate-300 rounded-bl-sm rounded-tr-sm transition-all duration-300 group-hover:border-sky-300 group-hover:bg-sky-50"></div>

                    {/* PDF label Badge */}
                    <div className="absolute -left-2 top-7 px-2.5 py-1 bg-sky-500 text-white font-extrabold text-[10px] rounded shadow-xs tracking-wider select-none leading-none">
                      PDF
                    </div>

                    {/* Miniature lines inside the document */}
                    <div className="space-y-1.5 w-8 ml-3 mt-1 pointer-events-none">
                      <div className="h-1 bg-slate-200 group-hover:bg-sky-150 rounded w-full"></div>
                      <div className="h-1 bg-slate-200 group-hover:bg-sky-150 rounded w-4/5"></div>
                      <div className="h-1 bg-slate-200 group-hover:bg-sky-150 rounded w-3/4"></div>
                    </div>
                  </div>

                  {/* Downward Download Arrow layered perfectly on top-bottom of document */}
                  <div className="absolute bottom-1 right-3 w-8 h-8 rounded-full bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:translate-y-1 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-400">
                    <Download size={15} className="stroke-[2.5]" />
                  </div>
                </div>

                {/* Sub-text information matching the layout */}
                <div className="space-y-2 relative z-10 w-full">
                  <h3 className="text-[#0284c7] font-black tracking-tight text-lg sm:text-xl font-display uppercase group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-extrabold tracking-wider text-sky-500/90 uppercase block group-hover:text-sky-600 group-hover:underline transition-all duration-200 bg-sky-50/50 py-1 rounded-lg">
                    CLIQUE NO ÍCONE PARA BAIXAR O CONTRATO.
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* SCM regulates compliance notice bottom */}
          <div className="mt-16 text-center max-w-xl mx-auto space-y-4">
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Todos os documentos encontram-se no formato portável PDF de alta legibilidade. Caso necessite de vias físicas autenticadas, dirija-se à nossa sede de atendimento munido de documento de identificação com foto.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
