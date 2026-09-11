import React from 'react';
import { AlertCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { SupportedLanguage, translations } from '../translations';

interface Section01PharmaProps {
  currentLang: SupportedLanguage;
}

export const Section01Pharma: React.FC<Section01PharmaProps> = ({ currentLang }) => {
  const t = translations[currentLang] || translations.de;

  return (
    <section id="sektion-01" className="relative py-16 sm:py-24 bg-[#090f0b] border-t border-[#c5a059]/20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Marker */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-display font-bold text-2xl sm:text-3xl text-[#dfb76c]/80 tracking-widest">
            {t.sec01Marker}
          </span>
          <div className="h-[1px] w-12 bg-[#dfb76c]/40" />
          <span className="text-xs uppercase tracking-widest font-semibold text-[#a8a090]">
            {t.sec01Tag}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#f7f3eb] leading-tight max-w-3xl mb-8">
          {t.sec01Title}
        </h2>

        {/* Narrative Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-6 text-[#d0c7b7] text-base sm:text-lg leading-relaxed font-serif-body">
            <p className="bg-[#121c14] border-l-2 border-[#dfb76c] p-4 sm:p-5 rounded-r-xl text-base text-[#e5ded0] leading-relaxed shadow-sm">
              {t.sec01QuestionPart1}
              <strong className="text-[#fce0ad] font-semibold font-sans">
                {t.sec01QuestionBold}
              </strong>
            </p>

            <p className="text-[#b5ab99] text-base leading-relaxed">
              {t.sec01Paragraph2}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-sans">
              <div className="flex items-start gap-2 p-3 rounded-lg bg-[#141d15]/80 border border-red-500/20 text-[#e0cfbe]">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{t.sec01BadgeRed}</span>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-lg bg-[#141d15]/80 border border-emerald-500/20 text-[#e0cfbe]">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{t.sec01BadgeGreen}</span>
              </div>
            </div>
          </div>

          {/* Contrast Illustration */}
          <div className="md:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/40 bg-[#0d140f] p-2 shadow-2xl">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
                  alt="Contrast illustration"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Warning Badge on Image */}
                <div className="absolute top-3 right-3 bg-red-950/90 text-red-300 border border-red-500/40 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 shadow-md">
                  <AlertCircle className="w-3 h-3 text-red-400" />
                  <span>{t.sec01ImgBadge}</span>
                </div>

                {/* Caption Banner */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/95 to-transparent">
                  <p className="text-xs sm:text-sm font-bold text-[#fce0ad] tracking-wide leading-snug drop-shadow-md">
                    {t.sec01Banner}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
