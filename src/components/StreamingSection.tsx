/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, ArrowRight } from 'lucide-react';

export default function StreamingSection() {
  const handleConsultarPlanos = () => {
    const el = document.getElementById('planos-centralnet');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="streaming-centralnet" className="py-20 md:py-28 bg-[#dbdeea] relative overflow-hidden select-none font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT SIDE: 2x2 Vector Grid of Streaming Badges (Exactly like the User's Screenshot) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="grid grid-cols-2 gap-4 xs:gap-6 w-full max-w-[480px]">
              
              {/* Tile 1: WATCH */}
              <div 
                id="tile-watch"
                className="bg-[#f26522] aspect-[4/3] rounded-[28px] xs:rounded-[36px] p-6 xs:p-8 flex flex-col items-center justify-center shadow-lg transition-transform duration-300 hover:scale-[1.03] select-none cursor-pointer border border-[#f57538]"
              >
                <img 
                  src="/watch_logo-removebg-preview.png" 
                  alt="WATCH" 
                  className="w-full h-full object-contain select-none" 
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Tile 2: Prime Video */}
              <div 
                id="tile-prime"
                className="bg-[#007eff] aspect-[4/3] rounded-[28px] xs:rounded-[36px] p-6 xs:p-8 flex flex-col items-center justify-center shadow-lg transition-transform duration-300 hover:scale-[1.03] select-none cursor-pointer border border-[#1b8cff]"
              >
                <img 
                  src="/prime_logo-removebg-preview.png" 
                  alt="Prime Video" 
                  className="w-full h-full object-contain select-none" 
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Tile 3: Disney+ */}
              <div 
                id="tile-disney"
                className="bg-[#012431] aspect-[4/3] rounded-[28px] xs:rounded-[36px] p-6 xs:p-8 flex flex-col items-center justify-center shadow-lg transition-transform duration-300 hover:scale-[1.03] select-none cursor-pointer border border-[#053d53]"
              >
                <img 
                  src="/disney_logo-removebg-preview.png" 
                  alt="Disney+" 
                  className="w-full h-full object-contain select-none" 
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Tile 4: HBO Max */}
              <div 
                id="tile-hbo"
                className="bg-gradient-to-r from-[#7a18f4] to-[#4c0da7] aspect-[4/3] rounded-[28px] xs:rounded-[36px] p-6 xs:p-8 flex flex-col items-center justify-center shadow-lg transition-transform duration-300 hover:scale-[1.03] select-none cursor-pointer border border-[#8f36ff]/30"
              >
                <img 
                  src="/logo_hbo-removebg-preview.png" 
                  alt="HBO Max" 
                  className="w-full h-full object-contain select-none" 
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Gorgeous responsive titles exactly like the User's Screenshot */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            <h2 className="text-[38px] xs:text-[46px] sm:text-[62px] font-extrabold text-[#005cdc] tracking-tight leading-[1.05] font-sans">
              Assista sem interrupções
            </h2>
            
            <p className="text-[#005cdc] text-md xs:text-lg sm:text-lg font-semibold leading-relaxed max-w-xl mx-auto lg:mx-0 opacity-90">
              Ao seu streaming preferido sem travar,
              <br />
              Nossa conexão banda larga tem garantia.
            </p>

            <div className="pt-4 flex flex-col xs:flex-row justify-center lg:justify-start gap-4">
              <button 
                onClick={handleConsultarPlanos}
                className="bg-[#005cdc] hover:bg-[#004bb3] text-white font-black text-xs uppercase tracking-wider px-8 py-4.5 rounded-2xl shadow-sm hover:shadow transition-all hover:scale-103 active:scale-97 cursor-pointer flex items-center justify-center gap-2 duration-300"
              >
                <span>Escolher Plano de Fibra</span>
                <ArrowRight size={14} className="stroke-[2.5]" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
