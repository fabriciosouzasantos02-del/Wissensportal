import React, { useState } from 'react';
import { ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';
import { HOTMART_CHECKOUT_URL } from '../types';
import { SupportedLanguage, translations } from '../translations';

interface Section06FAQProps {
  currentLang: SupportedLanguage;
}

export const Section06FAQ: React.FC<Section06FAQProps> = ({ currentLang }) => {
  const t = translations[currentLang] || translations.de;
  const faqItems = t.faqItems || [];

  // Open the first item by default so content is instantly visible
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleAccordion = (index: number) => {
    setOpenIndices((prev) => 
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="sektion-06" className="relative py-16 sm:py-24 bg-[#070c08] border-t border-[#c5a059]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-display font-bold text-lg sm:text-xl text-[#dfb76c] tracking-wider uppercase">
            {t.sec06Tag}
          </span>
          <div className="h-[1px] flex-1 max-w-xs bg-[#dfb76c]/30" />
        </div>

        {/* Subtitle */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#f8f5ee] leading-tight mb-8">
          {t.sec06Title}
        </h2>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-16">
          {faqItems.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#0f1711] border border-[#c5a059]/30 overflow-hidden transition-all shadow-md"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#152217] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base sm:text-lg text-[#f4eee4] pr-2">
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-[#1c2c1f] text-[#dfb76c] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-[#c8c0b0] leading-relaxed border-t border-white/5 font-serif-body pt-4">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final High-Converting CTA Box */}
        <div className="rounded-3xl p-1 bg-gradient-to-br from-[#dfb76c] via-[#b88c34] to-[#1e2e22] shadow-[0_0_60px_rgba(223,183,108,0.25)] mb-16">
          <div className="bg-[#0b120d] rounded-[22px] p-6 sm:p-10 text-center space-y-6">
            
            {/* Final Callout Text */}
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#f7f3eb] max-w-2xl mx-auto leading-tight">
              {t.finalCallout}
            </h3>

            <p className="text-sm sm:text-base text-[#b8afa0] max-w-lg mx-auto">
              {t.finalDesc}
            </p>

            {/* Final CTA Button */}
            <div>
              <a
                href={HOTMART_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-final-manuskript"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-gradient-to-r from-[#e3bf73] via-[#dfb76c] to-[#ba8f3b] text-[#080d09] font-extrabold text-base sm:text-lg tracking-wide uppercase shadow-[0_4px_30px_rgba(223,183,108,0.45)] hover:shadow-[0_6px_40px_rgba(223,183,108,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>{t.finalCta}</span>
                <ArrowRight className="w-5 h-5 text-[#080d09]" />
              </a>
            </div>

            <div className="text-xs text-[#9f9685] flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.finalGuaranteePill}</span>
            </div>

          </div>
        </div>

        {/* Footer & Disclaimer Section */}
        <footer className="pt-8 border-t border-white/10 text-center space-y-5 text-xs text-[#8d8576]">
          
          {/* Organization & Group */}
          <div className="space-y-1">
            <h4 className="font-display font-semibold text-sm text-[#e0d6c5] tracking-wider uppercase">
              {t.footerOrg}
            </h4>
            <p className="max-w-2xl mx-auto leading-relaxed text-[#a8a090]">
              {t.footerDisclaimer}
            </p>
          </div>

          <div className="text-[11px] text-[#8e8779] pt-4 border-t border-white/5">
            © {t.copyright}
          </div>

        </footer>

      </div>
    </section>
  );
};
