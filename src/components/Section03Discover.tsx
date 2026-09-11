import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { SupportedLanguage, translations } from '../translations';

interface Section03DiscoverProps {
  currentLang: SupportedLanguage;
}

const ACCENT_STYLES = [
  'from-amber-900/30 to-emerald-950/40 border-amber-500/40 text-amber-300',
  'from-rose-950/30 to-[#121c14] border-rose-500/30 text-rose-300',
  'from-amber-950/40 to-[#121c14] border-amber-500/40 text-amber-200',
  'from-emerald-950/40 to-[#121c14] border-emerald-500/30 text-emerald-300',
  'from-indigo-950/30 to-[#121c14] border-indigo-500/30 text-indigo-300'
];

export const Section03Discover: React.FC<Section03DiscoverProps> = ({ currentLang }) => {
  const t = translations[currentLang] || translations.de;
  const categories = t.categories || [];

  return (
    <section id="sektion-03" className="relative py-16 sm:py-24 bg-[#090f0b] border-t border-[#c5a059]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-display font-bold text-lg sm:text-xl text-[#dfb76c] tracking-wider uppercase">
            {t.sec03Tag}
          </span>
          <div className="h-[1px] flex-1 max-w-xs bg-[#dfb76c]/30" />
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#f8f5ee] leading-tight mb-6 max-w-3xl">
          {t.sec03Title}
        </h2>

        {/* Paragraphs */}
        <div className="max-w-3xl space-y-3 mb-8 text-[#c8c0b0] text-base sm:text-lg leading-relaxed font-serif-body">
          <p>
            {t.sec03Desc1}
          </p>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#142017] border border-[#c5a059]/40 text-[#dfb76c] text-xs sm:text-sm font-sans font-medium">
            <ShoppingBag className="w-4 h-4 text-[#dfb76c]" />
            <span>{t.sec03ShoppingList}</span>
          </div>
          <p className="text-sm sm:text-base text-[#ada495] pt-2 font-sans">
            {t.sec03Sub}
          </p>
        </div>

        {/* Category Cards with Exact Symbols: ✦ ◌ ✧ ◈ ⋆ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-5 bg-gradient-to-br ${ACCENT_STYLES[idx % ACCENT_STYLES.length]} border shadow-lg hover:border-[#dfb76c] transition-all group flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl sm:text-3xl font-bold text-[#dfb76c] group-hover:scale-110 transition-transform inline-block">
                    {item.symbol}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/40 text-[#e0d6c5] border border-white/10">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display text-base sm:text-lg font-bold text-[#f8f5ee] mb-2 leading-snug">
                  {item.symbol} {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#cac1b0] leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Sample Herbs & Botanical Illustration from Ancient Archive */}
              <div className="pt-3 border-t border-white/10 space-y-2.5">
                <div className="text-[11px] uppercase tracking-wider text-[#dfb76c] font-semibold flex items-center gap-1.5">
                  <span>{t.sec03HerbsLabel}</span>
                </div>

                {/* Botanical Illustration Image */}
                {item.image && (
                  <div className="relative h-36 w-full rounded-lg overflow-hidden border border-[#c5a059]/30 shadow-md group-hover:border-[#dfb76c]/60 transition-colors">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
