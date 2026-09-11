import React from 'react';
import { Check, Lock, ArrowRight, Award, Sparkles, Clock } from 'lucide-react';
import { HOTMART_CHECKOUT_URL } from '../types';
import { SupportedLanguage, translations } from '../translations';

interface Section05PricingGuaranteeProps {
  currentLang: SupportedLanguage;
}

export const Section05PricingGuarantee: React.FC<Section05PricingGuaranteeProps> = ({ currentLang }) => {
  const t = translations[currentLang] || translations.de;

  return (
    <section id="sektion-05" className="relative py-16 sm:py-24 bg-[#090f0b] border-t border-[#c5a059]/20 overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c5a059]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        
        {/* Section Marker */}
        <div className="flex items-center justify-center gap-3 mb-4 text-center">
          <span className="font-display font-bold text-sm sm:text-base text-[#dfb76c] tracking-widest uppercase">
            {t.sec05Tag}
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-[#f7f3eb] text-center leading-tight mb-8">
          {t.sec05Title}
        </h2>

        {/* Main Pricing Box */}
        <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#e3bf73] via-[#dfb76c]/40 to-[#1e2e22] shadow-[0_0_50px_rgba(212,163,89,0.2)] mb-12">
          <div className="bg-[#0b120d] rounded-[22px] p-6 sm:p-10 text-center relative overflow-hidden">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1b2b1d] border border-[#dfb76c]/50 text-[#fce0ad] text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#dfb76c]" />
              <span>{t.sec05Badge}</span>
            </div>

            {/* Price Showcase */}
            <div className="space-y-1 mb-6">
              {t.sec05PriceCaption ? (
                <span className="text-xs uppercase tracking-widest text-[#a8a090] font-semibold block">
                  {t.sec05PriceCaption}
                </span>
              ) : null}
              <div className="flex items-center justify-center gap-1">
                <span className="font-display text-6xl sm:text-7xl md:text-8xl font-black text-[#fdfaf2] gold-gradient-text tracking-tight">
                  {t.sec05PriceTag}
                </span>
              </div>
            </div>

            {/* Exact Three Pricing Conditions */}
            <div className="max-w-md mx-auto space-y-3 mb-8 text-left bg-[#121c14] p-4 sm:p-5 rounded-xl border border-[#c5a059]/25">
              <div className="flex items-center gap-3 text-sm sm:text-base text-[#e5dfd2] font-semibold">
                <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span>{t.sec05Condition1}</span>
              </div>

              <div className="flex items-center gap-3 text-sm sm:text-base text-[#e5dfd2] font-semibold">
                <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span>{t.sec05Condition2}</span>
              </div>

              <div className="flex items-center gap-3 text-sm sm:text-base text-[#e5dfd2] font-semibold">
                <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span>{t.sec05Condition3}</span>
              </div>
            </div>

            {/* Main Action Button */}
            <a
              href={HOTMART_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="cta-buy-manuskripte-main"
              className="w-full max-w-xl inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-gradient-to-r from-[#e3bf73] via-[#dfb76c] to-[#ba8f3b] text-[#080d09] font-extrabold text-base sm:text-lg md:text-xl tracking-wide uppercase shadow-[0_4px_30px_rgba(223,183,108,0.45)] hover:shadow-[0_6px_45px_rgba(223,183,108,0.65)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              <span className="text-center">{t.sec05Cta}</span>
              <ArrowRight className="w-6 h-6 shrink-0 text-[#080d09]" />
            </a>

            {/* Safe Checkout Badges */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-[#a39b8c]">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.sec05Ssl}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#dfb76c]" />
                <span>{t.sec05InstantCode}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Premium Guarantee Seal Section */}
        <div className="rounded-2xl bg-gradient-to-r from-[#101812] via-[#162319] to-[#101812] border border-[#dfb76c]/40 p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          
          {/* Custom Luxury Gold Medallion */}
          <div className="shrink-0 relative">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#dfb76c] to-[#8d6c29] p-1 shadow-[0_0_30px_rgba(223,183,108,0.4)] flex items-center justify-center relative">
              <div className="w-full h-full rounded-full bg-[#0b120d] border-2 border-dashed border-[#dfb76c]/80 flex flex-col items-center justify-center text-center p-2">
                <Award className="w-7 h-7 sm:w-8 sm:h-8 text-[#dfb76c] mb-0.5" />
                <span className="font-display font-extrabold text-xs sm:text-sm text-[#fce0ad] leading-tight">
                  {t.sec05SealDays}
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase font-bold tracking-widest text-emerald-400 leading-none">
                  {t.sec05SealWord}
                </span>
                <span className="text-[7px] text-[#a8a090] mt-0.5">{t.sec05SealProtection}</span>
              </div>
            </div>
          </div>

          {/* Guarantee Copy */}
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f7f3eb]">
              {t.sec05GuaranteeTitle}
            </h3>
            <p className="text-sm sm:text-base text-[#d8d0c2] leading-relaxed font-serif-body">
              {t.sec05GuaranteeDesc1}
            </p>
            <p className="text-sm sm:text-base text-[#fce0ad] font-semibold">
              {t.sec05GuaranteeDesc2}
            </p>
            <p className="text-xs text-[#9f9685] pt-1">
              {t.sec05GuaranteeExtra}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
