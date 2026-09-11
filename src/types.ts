export interface CategoryItem {
  id: string;
  symbol: string;
  title: string;
  description: string;
  herbs: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const HOTMART_CHECKOUT_URL = "https://pay.hotmart.com/D107568925I?checkoutMode=10";
export const DISPLAY_EMAIL = "contact@medizin-der-natur.de";
export const TARGET_EMAIL = "unterstutzung.service@gmail.com";
