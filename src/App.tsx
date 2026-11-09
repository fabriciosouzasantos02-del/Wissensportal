import React, { useState, useEffect } from 'react';
import { LanguageBanner } from './components/LanguageBanner';
import { HeroSection } from './components/HeroSection';
import { Section01Pharma } from './components/Section01Pharma';
import { Section02Platform } from './components/Section02Platform';
import { Section03Discover } from './components/Section03Discover';
import { Section04HowItWorks } from './components/Section04HowItWorks';
import { Section06FAQ } from './components/Section06FAQ';
import { SupportedLanguage, detectUserLanguage } from './translations';
import { HotmartCheckoutModal } from './components/HotmartCheckoutModal';

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('de');
  const [detectedLang, setDetectedLang] = useState<SupportedLanguage>('de');
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    // 1. Check if user already manually selected a preferred language previously
    try {
      const saved = localStorage.getItem('app_user_lang') as SupportedLanguage;
      if (saved && ['de', 'pt', 'en', 'es', 'fr'].includes(saved)) {
        setCurrentLang(saved);
        return;
      }
    } catch {
      // ignore
    }

    // 2. Automatically detect device/browser/in-app language
    const autoLang = detectUserLanguage();
    setDetectedLang(autoLang);

    // Follow user's browser/social webview/device language automatically
    if (autoLang && ['de', 'pt', 'en', 'es', 'fr'].includes(autoLang)) {
      setCurrentLang(autoLang);
    }
  }, []);

  useEffect(() => {
    // Keep html lang attribute in sync for browser accessibility
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLang;
    }
  }, [currentLang]);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    try {
      localStorage.setItem('app_user_lang', lang);
    } catch {
      // ignore
    }
    setCurrentLang(lang);
  };

  const openCheckout = () => setCheckoutOpen(true);

  return (
    <div className="min-h-screen bg-[#080d09] text-[#e3ded4] font-sans selection:bg-[#dfb76c] selection:text-[#080d09]">
      {/* Top Banner: In-App Browser Detection & Language Switcher (DE, PT, EN, ES, FR) */}
      <LanguageBanner 
        currentLang={currentLang} 
        onLanguageChange={handleLanguageChange}
        detectedLang={detectedLang}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with VSL Multi-Tag Player and Core Manifesto */}
          <HeroSection currentLang={currentLang} onCheckoutClick={openCheckout} />

        {/* Section 01: Die Pharmaindustrie entwickelt keine Heilmittel */}
        <Section01Pharma currentLang={currentLang} />

        {/* Section 02: Die Webplattform & 300+ Lösungen */}
          <Section02Platform currentLang={currentLang} onCheckoutClick={openCheckout} />

        {/* Section 03: WAS SIE ENTDECKEN WERDEN */}
        <Section03Discover currentLang={currentLang} />

        {/* Section 04: SO FUNKTIONIERT ES */}
        <Section04HowItWorks currentLang={currentLang} />

        {/* Section 06: HÄUFIG GESTELLTE FRAGEN & Rechtlicher Hinweis */}
          <Section06FAQ currentLang={currentLang} onCheckoutClick={openCheckout} />
        </main>

        {checkoutOpen && (
          <HotmartCheckoutModal
            currentLang={currentLang}
            onClose={() => setCheckoutOpen(false)}
          />
        )}

      </div>
  );
}
