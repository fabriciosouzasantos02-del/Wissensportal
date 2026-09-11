import React from 'react';
import { Leaf, Flame, Sparkles, CheckCircle2 } from 'lucide-react';
import { SupportedLanguage, translations } from '../translations';

interface Section04HowItWorksProps {
  currentLang: SupportedLanguage;
}

export const Section04HowItWorks: React.FC<Section04HowItWorksProps> = ({ currentLang }) => {
  const t = translations[currentLang] || translations.de;

  return (
    <section id="sektion-04" className="relative py-16 sm:py-24 bg-[#070c08] border-t border-[#c5a059]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-display font-bold text-lg sm:text-xl text-[#dfb76c] tracking-wider uppercase">
            {t.sec04Tag}
          </span>
          <div className="h-[1px] flex-1 max-w-xs bg-[#dfb76c]/30" />
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#f8f5ee] leading-tight mb-4 max-w-3xl">
          {t.sec04Title}
        </h2>

        {/* Introductory reassurance */}
        <p className="text-base sm:text-lg text-[#c8c0b0] leading-relaxed max-w-3xl mb-12 font-serif-body">
          {t.sec04Intro}
        </p>

        {/* 3 Step Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Step 1: Exact Ingredients */}
          <div className="rounded-2xl p-6 bg-[#111913] border border-[#c5a059]/30 shadow-xl relative flex flex-col justify-between group hover:border-[#dfb76c] transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-[#1b2b1e] border border-[#dfb76c]/40 text-[#dfb76c] font-display font-bold flex items-center justify-center text-sm">
                  {t.sec04Step1Num}
                </span>
                <Leaf className="w-5 h-5 text-emerald-400" />
              </div>

              <h3 className="font-display text-lg sm:text-xl font-bold text-[#f8f5ee]">
                {t.sec04Step1Title}
              </h3>

              <p className="text-sm text-[#ada495] leading-relaxed">
                {t.sec04Step1Desc}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 text-[11px] text-emerald-400/90 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.sec04Step1Footer}</span>
            </div>
          </div>

          {/* Step 2: Detailed Preparation */}
          <div className="rounded-2xl p-6 bg-[#111913] border border-[#c5a059]/30 shadow-xl relative flex flex-col justify-between group hover:border-[#dfb76c] transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-[#1b2b1e] border border-[#dfb76c]/40 text-[#dfb76c] font-display font-bold flex items-center justify-center text-sm">
                  {t.sec04Step2Num}
                </span>
                <Flame className="w-5 h-5 text-amber-400" />
              </div>

              <h3 className="font-display text-lg sm:text-xl font-bold text-[#f8f5ee]">
                {t.sec04Step2Title}
              </h3>

              <p className="text-sm text-[#ada495] leading-relaxed">
                {t.sec04Step2Desc}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 text-[11px] text-amber-400/90 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.sec04Step2Footer}</span>
            </div>
          </div>

          {/* Step 3: Practical Application Techniques */}
          <div className="rounded-2xl p-6 bg-[#111913] border border-[#c5a059]/30 shadow-xl relative flex flex-col justify-between group hover:border-[#dfb76c] transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-[#1b2b1e] border border-[#dfb76c]/40 text-[#dfb76c] font-display font-bold flex items-center justify-center text-sm">
                  {t.sec04Step3Num}
                </span>
                <Sparkles className="w-5 h-5 text-[#dfb76c]" />
              </div>

              <h3 className="font-display text-lg sm:text-xl font-bold text-[#f8f5ee]">
                {t.sec04Step3Title}
              </h3>

              <p className="text-sm text-[#ada495] leading-relaxed">
                {t.sec04Step3Desc}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 text-[11px] text-[#dfb76c]/90 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.sec04Step3Footer}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
