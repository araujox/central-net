/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CONTATO_CENTRALNET } from '../types';

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000); // Exibe balão após 4 segundos
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {showTooltip && (
        <div className="bg-white text-slate-800 p-3 rounded-2xl shadow-xl border border-emerald-100 max-w-xs mb-3 relative flex items-start gap-2 animate-bounce pointer-events-auto">
          <div className="flex-1 text-xs font-medium">
            <p className="text-emerald-600 font-bold mb-0.5">Atendimento Online</p>
            <p className="text-slate-600 leading-relaxed">Olá! Quer assinar ou tirar dúvidas? Fale conosco agora!</p>
          </div>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            aria-label="Fechar mensagem"
          >
            <X size={14} />
          </button>
          <div className="absolute right-6 -bottom-2 w-4 h-4 bg-white border-r border-b border-emerald-100 transform rotate-45"></div>
        </div>
      )}

      <a
        id="whatsapp-floater"
        href={CONTATO_CENTRALNET.whatsappUrl}
        target="_blank"
        referrerPolicy="no-referrer"
        rel="noopener noreferrer"
        className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center pointer-events-auto relative group glow-blue"
        aria-label="Fale conosco no WhatsApp"
      >
        {/* Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-40 animate-ping group-hover:opacity-0 transition-opacity"></span>
        <MessageCircle size={28} className="relative z-10 fill-white stroke-emerald-500" />
      </a>
    </div>
  );
}
