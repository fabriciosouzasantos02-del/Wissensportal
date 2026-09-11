import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { HOTMART_CHECKOUT_URL } from '../types';
import { SupportedLanguage, translations } from '../translations';

interface StickyMobileBarProps {
  currentLang: SupportedLanguage;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ currentLang }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const t = translations[currentLang] || translations.de;

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past 450px (past hero)
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-2 sm:p-3 bg-[#0a110b]/95 backdrop-blur-md border-t border-[#c5a059]/30 shadow-[0_-5px_25px_rgba(0,0,0,0.8)] animate-fade-in transition-all">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 px-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-extrabold text-xl sm:text-2xl text-[#fce0ad] leading-none">
              33 €
            </span>
            <span className="text-[10px] sm:text-xs text-[#a8a090] font-medium leading-none">
              {t.stickyOneTime}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium mt-0.5">
            <ShieldCheck className="w-3 h-3" />
            <span>{t.stickyGuarantee}</span>
          </div>
        </div>

        <a
          href={HOTMART_CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="sticky-mobile-portal-btn"
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#e3bf73] via-[#dfb76c] to-[#ba8f3b] text-[#080d09] font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_2px_15px_rgba(223,183,108,0.4)] active:scale-95 transition-all text-center"
        >
          <span>{t.stickyCta}</span>
          <ArrowRight className="w-4 h-4 shrink-0 text-[#080d09]" />
        </a>
      </div>
    </div>
  );
};
