import React from 'react';
import { ArrowRight, Sparkles, BookOpen, ChevronDown } from 'lucide-react';
import { VslVideoPlayer } from './VslVideoPlayer';
import { HOTMART_CHECKOUT_URL } from '../types';
import { SupportedLanguage, translations } from '../translations';

interface HeroSectionProps {
  currentLang: SupportedLanguage;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang] || translations.de;

  const handleScrollToNext = () => {
    const sec1 = document.getElementById('sektion-01');
    if (sec1) {
      sec1.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative w-full overflow-hidden pt-6 pb-14 sm:pb-20 bg-radial from-[#121c14] via-[#090e0a] to-[#050805]">
      {/* Decorative Archival Watermark / Background Texture */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center mix-blend-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=1600&q=80')`,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* Eyebrow / Dossier Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162319] border border-[#c5a059]/40 text-[#dfb76c] text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-lg shadow-black/40 mb-4 animate-fade-in">
          <BookOpen className="w-3.5 h-3.5 text-[#e6c278]" />
          <span>{t.eyebrow}</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[2.75rem] leading-[1.2] text-[#f7f3eb] font-bold max-w-4xl tracking-tight mb-6">
          {t.headlinePart1}
          <span className="gold-gradient-text underline decoration-[#dfb76c]/40 underline-offset-4">
            {t.headlinePart2}
          </span>
        </h1>

        {/* VSL Video Section Component with Multi-Video-Tag redundancy & Mobile Optimization */}
        <div className="w-full my-2">
          <VslVideoPlayer currentLang={currentLang} />
        </div>

        {/* Supporting Copy */}
        <div className="max-w-3xl mx-auto mt-6 sm:mt-8 space-y-4 text-center">
          <p className="text-base sm:text-lg text-[#d8d0c2] leading-relaxed font-serif-body italic text-balance">
            {t.heroQuote}
          </p>

          <p className="text-sm sm:text-base text-[#bfb5a3] leading-relaxed max-w-2xl mx-auto font-normal">
            {t.heroDesc}
          </p>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
          {/* Main Hotmart Checkout Link */}
          <a
            href={HOTMART_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-portal"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#e3bf73] via-[#dfb76c] to-[#ba8f3b] text-[#080d09] font-bold text-base sm:text-lg tracking-wide shadow-[0_4px_25px_rgba(223,183,108,0.35)] hover:shadow-[0_6px_35px_rgba(223,183,108,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{t.ctaMain}</span>
            <ArrowRight className="w-5 h-5 text-[#080d09]" />
          </a>

          {/* Secondary Learn More Button */}
          <button
            onClick={handleScrollToNext}
            id="hero-learn-more"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#131d15] hover:bg-[#1c2b1f] border border-[#c5a059]/30 text-[#e0d6c5] font-semibold text-sm sm:text-base transition-colors"
          >
            <span>{t.learnMore}</span>
            <ChevronDown className="w-4 h-4 text-[#dfb76c]" />
          </button>
        </div>

        {/* Web-App Platform Badge & Immediate Access Announcement */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#c5a059]">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
          <span>{t.webappBadge}</span>
        </div>

        {/* Featured Botanical Card */}
        <div className="w-full max-w-3xl mt-12 p-1 rounded-2xl bg-gradient-to-b from-[#c5a059]/30 to-[#1e2e22]/40 border border-[#c5a059]/30 shadow-2xl">
          <div className="bg-[#0b120d] rounded-[15px] p-4 sm:p-6 flex flex-col md:flex-row items-center gap-6 text-left">
            {/* Botanical Card Image */}
            <div className="relative w-full md:w-56 h-48 md:h-44 rounded-xl overflow-hidden shrink-0 border border-[#c5a059]/30 shadow-inner group">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                alt="Botanical illustration"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <span className="text-xs font-semibold tracking-wider text-[#e6c278] uppercase drop-shadow">
                  {t.botanicalLabel}
                </span>
              </div>
            </div>

            {/* +300 Solutions & Group Badge */}
            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18261b] text-[#dfb76c] text-xs font-semibold tracking-wider uppercase border border-[#c5a059]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#dfb76c]" />
                <span>{t.groupBadge}</span>
              </div>

              <div className="flex items-baseline justify-center md:justify-start gap-3 pt-1">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#fdfaf2] gold-gradient-text">
                  {t.statSolutionsNum}
                </span>
                <div className="text-xs sm:text-sm font-bold text-[#e0d6c5] tracking-wider uppercase leading-tight">
                  {t.statSolutionsLine1}<br />{t.statSolutionsLine2}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#a8a090] pt-1">
                {t.botanicalDesc}
              </p>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
