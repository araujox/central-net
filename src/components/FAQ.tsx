/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function FAQ() {
  const { data, formatWhatsappLink } = useCMS();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Only active FAQs sorted by ordem
  const activeFaqs = data.faqs
    .filter((f) => f.ativo)
    .sort((a, b) => a.ordem - b.ordem);

  const faqsToDisplay = activeFaqs.length > 0 ? activeFaqs : data.faqs;

  const whatsappFaqUrl = formatWhatsappLink('Olá! Tenho uma pergunta que não encontrei no FAQ do site sobre os planos.');

  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-100/60 px-3.5 py-1.5 rounded-full">
            Tire Suas Dúvidas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Perguntas Frequentes sobre a CentralNet
          </h2>
          <p className="text-base text-slate-600">
            Encontre respostas diretas sobre nossos planos de internet fibra óptica, prazos de instalação, suporte e o sistema de rastreamento veicular.
          </p>
        </div>

        {/* Accordions Container */}
        <div className="space-y-4">
          {faqsToDisplay.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={faq.id || index}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen 
                    ? 'border-blue-500/30 shadow-sm ring-1 ring-blue-500/10' 
                    : 'border-slate-100 shadow-sm hover:border-slate-200'
                }`}
              >
                {/* Accordion Trigger Head */}
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-start justify-between gap-4 font-display font-bold text-slate-900 text-sm sm:text-base cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle size={18} className={`shrink-0 ${isOpen ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{faq.pergunta}</span>
                  </span>
                  
                  <span className={`p-1 bg-slate-100 rounded-lg text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : ''}`}>
                    <ChevronDown size={16} />
                  </span>
                </button>

                {/* Accordion Body Expandable Panel */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-80 border-t border-slate-100/80 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="px-6 py-5 sm:px-8 sm:py-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans bg-slate-50/50 rounded-b-2xl">
                    {faq.resposta}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action card for further support */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900 font-display">Ainda tem alguma dúvida técnica ou comercial?</h4>
            <p className="text-xs text-slate-500">Nossa equipe de atendimento humanizado está totalmente disponível para te ajudar.</p>
          </div>
          <a
            href={whatsappFaqUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            Perguntar no WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
