import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { HOTMART_CHECKOUT_URL } from '../types';
import { SupportedLanguage, translations } from '../translations';

interface HotmartCheckoutModalProps {
  currentLang: SupportedLanguage;
  onClose: () => void;
}

const digitsOnly = (value: string) => value.replace(/\D/g, '');

export const HotmartCheckoutModal: React.FC<HotmartCheckoutModalProps> = ({
  currentLang,
  onClose,
}) => {
  const t = translations[currentLang] || translations.de;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [areaCode, setAreaCode] = useState('');
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

    const checkoutUrl = new URL(HOTMART_CHECKOUT_URL);
    checkoutUrl.searchParams.set('name', name.trim());
    checkoutUrl.searchParams.set('email', email.trim());
    checkoutUrl.searchParams.set('phoneac', digitsOnly(areaCode));
    checkoutUrl.searchParams.set('phonenumber', digitsOnly(phoneNumber));

    // Keep Hotmart's selected checkout country unchanged; its calling code is country-dependent.
    window.location.assign(checkoutUrl.toString());
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="hotmart-checkout-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-0 h-dvh w-full max-h-none max-w-none border-0 bg-transparent p-0 text-[#e3ded4] backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      <div
        className="flex min-h-full items-center justify-center overflow-y-auto p-4 sm:p-6"
        style={{
          paddingTop: 'max(1rem, env(safe-area-inset-top))',
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        }}
      >
        <section className="relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#c5a059]/40 bg-[#0b120d] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.65)] sm:p-7">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#dfb76c]">
                Hotmart
              </p>
              <h2
                id="hotmart-checkout-title"
                className="font-display text-2xl font-bold leading-tight text-[#f7f3eb] sm:text-3xl"
              >
                {t.checkoutTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#b8afa0]">
                {t.checkoutDescription}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.checkoutClose}
              className="shrink-0 rounded-lg border border-white/10 p-2 text-[#c8c0b0] transition-colors hover:border-[#dfb76c]/50 hover:text-[#f7f3eb] focus:outline-none focus:ring-2 focus:ring-[#dfb76c]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <form onSubmit={handleSubmit} autoComplete="on" className="space-y-4">
            <div>
              <label htmlFor="checkout-name" className="block text-sm font-semibold text-[#e3ded4]">
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
                className="mt-2 w-full rounded-lg border border-[#c5a059]/30 bg-[#080d09] px-4 py-3 text-base text-[#f7f3eb] outline-none placeholder:text-[#80786c] focus:border-[#dfb76c] focus:ring-2 focus:ring-[#dfb76c]/25"
              />
            </div>

            <div>
              <label htmlFor="checkout-email" className="block text-sm font-semibold text-[#e3ded4]">
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
                className="mt-2 w-full rounded-lg border border-[#c5a059]/30 bg-[#080d09] px-4 py-3 text-base text-[#f7f3eb] outline-none placeholder:text-[#80786c] focus:border-[#dfb76c] focus:ring-2 focus:ring-[#dfb76c]/25"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <label htmlFor="checkout-area-code" className="block text-sm font-semibold text-[#e3ded4]">
                  {t.checkoutAreaCodeLabel}
                </label>
                <input
                  id="checkout-area-code"
                  name="phoneac"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-area-code"
                  placeholder={t.checkoutAreaCodePlaceholder}
                  required
                  value={areaCode}
                  onChange={(event) => setAreaCode(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-[#c5a059]/30 bg-[#080d09] px-4 py-3 text-base text-[#f7f3eb] outline-none placeholder:text-[#80786c] focus:border-[#dfb76c] focus:ring-2 focus:ring-[#dfb76c]/25"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="checkout-phone-number" className="block text-sm font-semibold text-[#e3ded4]">
                  {t.checkoutPhoneNumberLabel}
                </label>
                <input
                  id="checkout-phone-number"
                  name="phonenumber"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-local"
                  placeholder={t.checkoutPhoneNumberPlaceholder}
                  required
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-[#c5a059]/30 bg-[#080d09] px-4 py-3 text-base text-[#f7f3eb] outline-none placeholder:text-[#80786c] focus:border-[#dfb76c] focus:ring-2 focus:ring-[#dfb76c]/25"
                />
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#a8a090]">{t.checkoutPhoneHint}</p>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#e3bf73] via-[#dfb76c] to-[#ba8f3b] px-6 py-4 text-base font-extrabold tracking-wide text-[#080d09] shadow-[0_4px_25px_rgba(223,183,108,0.3)] transition-all hover:shadow-[0_6px_35px_rgba(223,183,108,0.5)] focus:outline-none focus:ring-2 focus:ring-[#fce0ad] focus:ring-offset-2 focus:ring-offset-[#0b120d] active:scale-[0.99]"
            >
              <span>{t.checkoutSubmit}</span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>
        </section>
      </div>
    </dialog>
  );
};
