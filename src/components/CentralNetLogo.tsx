/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CentralNetLogoProps {
  className?: string; // Optional custom tailwind or normal class names
  showText?: boolean;
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export default function CentralNetLogo({
  className = '',
  showText = true,
  theme = 'light',
  size = 'md'
}: CentralNetLogoProps) {
  // Simple responsive sizing definitions
  const sizeClasses = {
    sm: { globe: 'w-8 h-8 sm:w-10 sm:h-10', textTitle: 'text-sm sm:text-base', textSub: 'text-[9px]' },
    md: { globe: 'w-11 h-11 sm:w-14 sm:h-14', textTitle: 'text-lg sm:text-xl md:text-2xl', textSub: 'text-[10px]' },
    lg: { globe: 'w-16 h-16 sm:w-20 sm:h-20', textTitle: 'text-2xl sm:text-3xl', textSub: 'text-xs' }
  };

  const activeSize = sizeClasses[size] || sizeClasses.sm;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      
      {/* Uploaded CentralNet Logo PNG Image */}
      <div className={`relative ${activeSize.globe} shrink-0 transform transition-transform duration-300 group-hover:scale-105 active:scale-95`}>
        <img 
          src="/Captura_de_tela_2026-05-28_204446-removebg-preview.png"
          alt="CentralNet Logo"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Brand Text Columns closely matching the original typeface and orange 'Central' style */}
      {showText && (
        <div className="flex flex-col select-none text-left">
          <span className={`${activeSize.textTitle} font-black tracking-tight leading-none font-display`}>
            <span className={theme === 'dark' ? 'text-white' : 'text-[#E38025]'}>Central</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-[#0C82C6]'}>Net</span>
          </span>
          <span className={`${activeSize.textSub} font-extrabold tracking-widest uppercase leading-none mt-1 ${theme === 'dark' ? 'text-white/60' : 'text-slate-500'}`}>
            Telecomunicações
          </span>
        </div>
      )}

    </div>
  );
}
