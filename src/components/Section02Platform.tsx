import React from 'react';
import { 
  Smartphone, 
  ExternalLink, 
  FileText,
  Search, 
  Clock, 
  ShieldCheck
} from 'lucide-react';
import { HOTMART_CHECKOUT_URL } from '../types';
import { SupportedLanguage, translations } from '../translations';

interface Section02PlatformProps {
  currentLang: SupportedLanguage;
}

export const Section02Platform: React.FC<Section02PlatformProps> = ({ currentLang }) => {
  const t = translations[currentLang] || translations.de;

  return (
    <section id="sektion-02" className="relative py-16 sm:py-24 bg-[#070c08] border-t border-[#c5a059]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-display font-bold text-lg sm:text-xl text-[#dfb76c] tracking-wider uppercase">
            {t.sec02Tag}
          </span>
          <div className="h-[1px] flex-1 max-w-xs bg-[#dfb76c]/30" />
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#f8f5ee] leading-tight mb-6 max-w-3xl">
          {t.sec02Title}
        </h2>

        {/* Description */}
        <p className="text-[#c8c0b0] text-base sm:text-lg leading-relaxed max-w-3xl mb-10 font-serif-body">
          {t.sec02Desc}
        </p>

        {/* Grid: Pills on Left, Web-App Interface Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Pills & Core Feature Points */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Pill 1: +300 Solutions */}
            <div className="p-4 rounded-xl bg-[#101812] border border-[#c5a059]/40 shadow-md flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#1a291d] flex items-center justify-center text-[#dfb76c] font-display font-bold text-lg shrink-0 border border-[#dfb76c]/40">
                +300
              </div>
              <div>
                <h3 className="text-base font-bold text-[#f7f3eb]">{t.sec02Pill1Title}</h3>
                <p className="text-xs sm:text-sm text-[#ada495] mt-1 leading-snug">
                  {t.sec02Pill1Desc}
                </p>
              </div>
            </div>

            {/* Pill 2: Step-by-Step */}
            <div className="p-4 rounded-xl bg-[#101812] border border-[#c5a059]/30 shadow-md flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#1a291d] flex items-center justify-center text-[#dfb76c] shrink-0 border border-[#dfb76c]/40">
                <FileText className="w-5 h-5 text-[#dfb76c]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#f7f3eb]">{t.sec02Pill2Title}</h3>
                <p className="text-xs sm:text-sm text-[#ada495] mt-1">
                  {t.sec02Pill2Desc}
                </p>
              </div>
            </div>

            {/* Pill 3: Instant Access */}
            <div className="p-4 rounded-xl bg-[#101812] border border-[#c5a059]/30 shadow-md flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#1a291d] flex items-center justify-center text-[#dfb76c] shrink-0 border border-[#dfb76c]/40">
                <Smartphone className="w-5 h-5 text-[#dfb76c]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#f7f3eb]">{t.sec02Pill3Title}</h3>
                <p className="text-xs sm:text-sm text-[#ada495] mt-1">
                  {t.sec02Pill3Desc}
                </p>
              </div>
            </div>

            {/* Zum Portal CTA */}
            <div className="pt-2">
              <a
                href={HOTMART_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="section02-cta-portal"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#b88c34] text-[#080d09] font-bold text-base shadow-lg hover:shadow-[0_0_25px_rgba(223,183,108,0.4)] transition-all cursor-pointer"
              >
                <span>{t.sec02Cta}</span>
                <ExternalLink className="w-4 h-4 text-[#080d09]" />
              </a>
            </div>
          </div>

          {/* Right Column: Live Web-App Mockup with Interactive Experience */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-[#0d140e] p-3 sm:p-4 border border-[#c5a059]/40 shadow-2xl">
              
              {/* Device Frame Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs text-[#a8a090]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-[#dfb76c]">app.archiv1910.de</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{t.sec02Verified}</span>
                </div>
              </div>

              {/* Mockup Inside Content */}
              <div className="bg-[#121c14] rounded-xl p-4 border border-[#c5a059]/20 space-y-4">
                
                {/* Search & Category Filter Mock */}
                <div className="flex items-center gap-2 bg-[#090e0a] px-3 py-2 rounded-lg border border-white/10 text-xs text-[#b8afa0]">
                  <Search className="w-3.5 h-3.5 text-[#dfb76c]" />
                  <span>{t.sec02SearchPlaceholder}</span>
                </div>

                {/* Recipe Card Preview */}
                <div className="bg-[#18261b] rounded-lg p-3.5 border border-[#dfb76c]/30 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded bg-[#dfb76c]/20 text-[#fce0ad] font-bold text-[10px] uppercase">
                      {t.sec02Recipe1Tag}
                    </span>
                    <span className="text-[10px] text-[#9ca3af] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#dfb76c]" /> {t.sec02Recipe1Time}
                    </span>
                  </div>

                  <h4 className="font-display font-semibold text-sm sm:text-base text-[#f7f3eb]">
                    {t.sec02Recipe1Title}
                  </h4>

                  <p className="text-xs text-[#c4bba9] leading-relaxed">
                    {t.sec02Recipe1Desc}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] border-t border-white/10">
                    <span className="text-emerald-400 font-medium">{t.sec02Recipe1Unlocked}</span>
                    <span className="text-[#dfb76c] font-semibold">{t.sec02Recipe1View}</span>
                  </div>
                </div>

                {/* Second Quick Entry Card */}
                <div className="bg-[#152018] rounded-lg p-3 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] text-[#a8a090]">{t.sec02Recipe2Tag}</span>
                    <span className="text-[10px] text-emerald-400">{t.sec02Recipe2Badge}</span>
                  </div>
                  <div className="text-xs font-semibold text-[#e5dfd2]">
                    {t.sec02Recipe2Title}
                  </div>
                </div>

              </div>

              {/* Required Caption */}
              <div className="mt-3 text-center">
                <p className="text-xs font-semibold text-[#dfb76c] tracking-wide leading-snug">
                  {t.sec02Caption}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
