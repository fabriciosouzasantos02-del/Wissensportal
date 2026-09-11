import React from 'react';
import { Globe, Smartphone, ShieldCheck } from 'lucide-react';
import { SupportedLanguage, detectInAppBrowser, translations } from '../translations';

interface LanguageBannerProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  detectedLang: SupportedLanguage;
}

export const LanguageBanner: React.FC<LanguageBannerProps> = ({
  currentLang,
  onLanguageChange,
  detectedLang,
}) => {
  const inAppInfo = detectInAppBrowser();
  const t = translations[currentLang] || translations.de;

  const handleSelect = (lang: SupportedLanguage) => {
    try {
      localStorage.setItem('app_user_lang', lang);
    } catch {
      // ignore
    }
    onLanguageChange(lang);
  };

  return (
    <div className="w-full bg-[#0a110b] border-b border-[#c5a059]/25 text-xs text-[#dcd6ca] sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: In-App Browser Indicator & Security Notice */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#142016] border border-[#c5a059]/30 text-[#e6c278] text-[11px] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.bannerSsl}</span>
          </div>

          {inAppInfo.isInApp && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1e271a] text-[#f3d38c] text-[11px]">
              <Smartphone className="w-3 h-3 text-[#dfb76c]" />
              <span>{t.bannerOptimizedFor} {inAppInfo.appName} Webview</span>
            </div>
          )}
        </div>

        {/* Right: Language Selector (DE, PT, EN, ES, FR) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[11px] text-[#a8a090]">
            <Globe className="w-3.5 h-3.5 text-[#dfb76c]" />
            <span className="hidden sm:inline">{t.bannerLanguage}</span>
          </div>

          <div className="inline-flex p-0.5 bg-[#121c13] rounded-lg border border-[#c5a059]/30">
            <button
              onClick={() => handleSelect('de')}
              id="lang-btn-de"
              className={`px-2 py-0.5 text-[11px] rounded font-medium transition-all ${
                currentLang === 'de'
                  ? 'bg-gradient-to-r from-[#dfb76c] to-[#c59b48] text-[#0a110b] font-bold shadow-sm'
                  : 'text-[#d6cebf] hover:text-white'
              }`}
              title="Deutsch (Originalfassung)"
            >
              DE
            </button>
            <button
              onClick={() => handleSelect('pt')}
              id="lang-btn-pt"
              className={`px-2 py-0.5 text-[11px] rounded font-medium transition-all ${
                currentLang === 'pt'
                  ? 'bg-gradient-to-r from-[#dfb76c] to-[#c59b48] text-[#0a110b] font-bold shadow-sm'
                  : 'text-[#d6cebf] hover:text-white'
              }`}
              title="Português"
            >
              PT
            </button>
            <button
              onClick={() => handleSelect('en')}
              id="lang-btn-en"
              className={`px-2 py-0.5 text-[11px] rounded font-medium transition-all ${
                currentLang === 'en'
                  ? 'bg-gradient-to-r from-[#dfb76c] to-[#c59b48] text-[#0a110b] font-bold shadow-sm'
                  : 'text-[#d6cebf] hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => handleSelect('es')}
              id="lang-btn-es"
              className={`px-2 py-0.5 text-[11px] rounded font-medium transition-all ${
                currentLang === 'es'
                  ? 'bg-gradient-to-r from-[#dfb76c] to-[#c59b48] text-[#0a110b] font-bold shadow-sm'
                  : 'text-[#d6cebf] hover:text-white'
              }`}
              title="Español"
            >
              ES
            </button>
            <button
              onClick={() => handleSelect('fr')}
              id="lang-btn-fr"
              className={`px-2 py-0.5 text-[11px] rounded font-medium transition-all ${
                currentLang === 'fr'
                  ? 'bg-gradient-to-r from-[#dfb76c] to-[#c59b48] text-[#0a110b] font-bold shadow-sm'
                  : 'text-[#d6cebf] hover:text-white'
              }`}
              title="Français"
            >
              FR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
