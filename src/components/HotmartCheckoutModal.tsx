import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import {
  getCountries,
  parsePhoneNumberFromString,
  type CountryCode,
} from 'libphonenumber-js';
import { HOTMART_CHECKOUT_URL } from '../types';
import { SupportedLanguage, translations } from '../translations';

interface HotmartCheckoutModalProps {
  currentLang: SupportedLanguage;
  onClose: () => void;
}

const digitsOnly = (value: string) => value.replace(/\D/g, '');
const availablePhoneCountries = new Set<string>(getCountries());
const fallbackCountryByLanguage: Record<SupportedLanguage, CountryCode> = {
  de: 'DE',
  pt: 'BR',
  en: 'US',
  es: 'ES',
  fr: 'FR',
};

function getDefaultPhoneCountry(language: SupportedLanguage): CountryCode {
  if (typeof navigator !== 'undefined') {
    const region = navigator.language.match(/[-_]([A-Za-z]{2})$/)?.[1]?.toUpperCase();
    if (region && availablePhoneCountries.has(region)) return region as CountryCode;
  }

  return fallbackCountryByLanguage[language];
}

function splitPhoneForHotmart(value: string, defaultCountry: CountryCode) {
  const trimmedValue = value.trim();
  const parserInput = trimmedValue.startsWith('00')
    ? `+${trimmedValue.slice(2)}`
    : trimmedValue;
  const parsedPhone = parsePhoneNumberFromString(parserInput, defaultCountry);

  if (!parsedPhone) {
    return { areaCode: '', number: digitsOnly(trimmedValue) };
  }

  const nationalFormat = parsedPhone.formatNational();
  const match = nationalFormat.match(/^\s*\(?(\d{1,6})\)?[.\s-]+(.+)$/);

  if (!match) {
    return { areaCode: '', number: digitsOnly(nationalFormat) || digitsOnly(trimmedValue) };
  }

  return {
    areaCode: digitsOnly(match[1]),
    number: digitsOnly(match[2]),
  };
}

export const HotmartCheckoutModal: React.FC<HotmartCheckoutModalProps> = ({
  currentLang,
  onClose,
}) => {
  const t = translations[currentLang] || translations.de;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (!dialog.open) dialog.showModal();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const phoneParts = splitPhoneForHotmart(phoneNumber, getDefaultPhoneCountry(currentLang));
    const checkoutUrl = new URL(HOTMART_CHECKOUT_URL);
    checkoutUrl.searchParams.set('name', name.trim());
    checkoutUrl.searchParams.set('email', email.trim());
    checkoutUrl.searchParams.set('phoneac', phoneParts.areaCode);
    checkoutUrl.searchParams.set('phonenumber', phoneParts.number);

    // Preserve the country selected in Hotmart; its calling code is country-dependent.
    window.location.assign(checkoutUrl.toString());
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="hotmart-checkout-title"
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-0 h-dvh w-full max-h-none max-w-none border-0 bg-transparent p-0 text-[#e3ded4] backdrop:bg-[#080d09]/90 backdrop:backdrop-blur-sm"
    >
      <div
        className="flex min-h-full items-center justify-center overflow-y-auto p-4 sm:p-6"
        style={{
          paddingTop: 'max(1rem, env(safe-area-inset-top))',
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        }}
      >
        <section className="relative max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto rounded-[1.35rem] border border-[#c5a059]/40 bg-[#0b120d] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.7)] sm:p-10">
          <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
            <h2
              id="hotmart-checkout-title"
              className="font-display text-2xl font-semibold leading-tight text-[#dfb76c] sm:text-3xl"
            >
              {t.checkoutTitle}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.checkoutClose}
              className="shrink-0 rounded-md p-1 text-[#e3ded4] transition-colors hover:text-[#dfb76c] focus:outline-none focus:ring-2 focus:ring-[#dfb76c]"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <form onSubmit={handleSubmit} autoComplete="on" className="space-y-5 sm:space-y-6">
            <div>
              <label htmlFor="checkout-name" className="block text-base font-medium text-[#e3ded4]">
                {t.checkoutNameLabel}
              </label>
              <input
                id="checkout-name"
                name="name"
                type="text"
                autoComplete="name"
                autoCapitalize="words"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-[#c5a059]/30 bg-[#080d09] px-4 text-base text-[#f7f3eb] outline-none placeholder:text-[#a8a090] focus:border-[#dfb76c] focus:ring-1 focus:ring-[#dfb76c]/70 sm:h-14"
              />
            </div>

            <div>
              <label htmlFor="checkout-email" className="block text-base font-medium text-[#e3ded4]">
                {t.checkoutEmailLabel}
              </label>
              <input
                id="checkout-email"
                name="email"
                type="email"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-[#c5a059]/30 bg-[#080d09] px-4 text-base text-[#f7f3eb] outline-none placeholder:text-[#a8a090] focus:border-[#dfb76c] focus:ring-1 focus:ring-[#dfb76c]/70 sm:h-14"
              />
            </div>

            <div>
              <label htmlFor="checkout-phone" className="block text-base font-medium text-[#e3ded4]">
                {t.checkoutPhoneLabel}
              </label>
              <input
                id="checkout-phone"
                name="tel"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder={t.checkoutPhonePlaceholder}
                required
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-[#c5a059]/30 bg-[#080d09] px-4 text-base text-[#f7f3eb] outline-none placeholder:text-[#a8a090] focus:border-[#dfb76c] focus:ring-1 focus:ring-[#dfb76c]/70 sm:h-14"
              />
            </div>

            <button
              type="submit"
              className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#e3bf73] via-[#dfb76c] to-[#ba8f3b] px-6 text-lg font-semibold text-[#080d09] shadow-[0_4px_25px_rgba(223,183,108,0.35)] transition-all hover:shadow-[0_6px_35px_rgba(223,183,108,0.5)] focus:outline-none focus:ring-2 focus:ring-[#dfb76c] focus:ring-offset-2 focus:ring-offset-[#0b120d] active:scale-[0.99] sm:h-14"
            >
              {t.checkoutSubmit}
            </button>
          </form>
        </section>
      </div>
    </dialog>
  );
};
