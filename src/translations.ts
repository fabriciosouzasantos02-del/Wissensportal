export type SupportedLanguage = 'de' | 'en' | 'es' | 'pt' | 'fr';

export interface SocialBrowserInfo {
  isInApp: boolean;
  appName: string;
}

export function detectInAppBrowser(): SocialBrowserInfo {
  if (typeof window === 'undefined') {
    return { isInApp: false, appName: '' };
  }
  const ua = window.navigator.userAgent || window.navigator.vendor || '';

  if (/Instagram/i.test(ua)) return { isInApp: true, appName: 'Instagram' };
  if (/FBAN|FBAV/i.test(ua)) return { isInApp: true, appName: 'Facebook' };
  if (/TikTok|musical_ly/i.test(ua)) return { isInApp: true, appName: 'TikTok' };
  if (/WhatsApp/i.test(ua)) return { isInApp: true, appName: 'WhatsApp' };
  if (/Telegram/i.test(ua)) return { isInApp: true, appName: 'Telegram' };
  if (/Twitter|X/i.test(ua)) return { isInApp: true, appName: 'X (Twitter)' };
  if (/LinkedIn/i.test(ua)) return { isInApp: true, appName: 'LinkedIn' };
  if (/Snapchat/i.test(ua)) return { isInApp: true, appName: 'Snapchat' };

  return { isInApp: false, appName: '' };
}

export function detectUserLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'de';
  
  // Check if user previously saved a preferred language
  try {
    const saved = localStorage.getItem('app_user_lang') as SupportedLanguage;
    if (saved && ['de', 'en', 'es', 'pt', 'fr'].includes(saved)) {
      return saved;
    }
  } catch {
    // ignore localStorage errors
  }

  const rawLang = (window.navigator.language || (window.navigator.languages && window.navigator.languages[0]) || 'de').toLowerCase();
  
  if (rawLang.startsWith('pt')) return 'pt';
  if (rawLang.startsWith('en')) return 'en';
  if (rawLang.startsWith('es')) return 'es';
  if (rawLang.startsWith('fr')) return 'fr';
  if (rawLang.startsWith('de')) return 'de';
  return 'de';
}

export interface TranslationCategory {
  symbol: string;
  title: string;
  description: string;
  badge: string;
  herbs: string[];
  image: string;
}

export interface TranslationFaq {
  question: string;
  answer: string;
}

export interface TranslationBundle {
  // Banner
  bannerSsl: string;
  bannerOptimizedFor: string;
  bannerLanguage: string;
  bannerDeDefault: string;

  // Hero & General
  navTitle: string;
  eyebrow: string;
  headlinePart1: string;
  headlinePart2: string;
  heroQuote: string;
  heroDesc: string;
  ctaMain: string;
  learnMore: string;
  webappBadge: string;
  botanicalLabel: string;
  statSolutionsNum: string;
  statSolutionsLine1: string;
  statSolutionsLine2: string;
  groupBadge: string;
  botanicalDesc: string;

  // VSL & Modal
  vslDossierTag: string;
  vslPlaySound: string;
  vslAutoplayNotice: string;
  vslWebviewOptimized: string;
  vslStatusRunning: string;
  vslHelperSlot: string;
  vslModalTitle: string;
  vslModalDesc: string;
  vslModalContactLabel: string;
  vslModalRedirectNotice: string;
  vslModalClose: string;
  vslModalCompose: string;
  vslModalSubject: string;
  vslBufferNotice: string;

  // Section 01
  sec01Marker: string;
  sec01Tag: string;
  sec01Title: string;
  sec01QuestionPart1: string;
  sec01QuestionBold: string;
  sec01Paragraph2: string;
  sec01BadgeRed: string;
  sec01BadgeGreen: string;
  sec01ImgBadge: string;
  sec01Banner: string;

  // Section 02
  sec02Tag: string;
  sec02Title: string;
  sec02Desc: string;
  sec02Pill1Title: string;
  sec02Pill1Desc: string;
  sec02Pill2Title: string;
  sec02Pill2Desc: string;
  sec02Pill3Title: string;
  sec02Pill3Desc: string;
  sec02Cta: string;
  sec02Verified: string;
  sec02SearchPlaceholder: string;
  sec02Recipe1Tag: string;
  sec02Recipe1Time: string;
  sec02Recipe1Title: string;
  sec02Recipe1Desc: string;
  sec02Recipe1Unlocked: string;
  sec02Recipe1View: string;
  sec02Recipe2Tag: string;
  sec02Recipe2Badge: string;
  sec02Recipe2Title: string;
  sec02Caption: string;

  // Section 03
  sec03Tag: string;
  sec03Title: string;
  sec03Desc1: string;
  sec03ShoppingList: string;
  sec03Sub: string;
  sec03HerbsLabel: string;
  categories: TranslationCategory[];

  // Section 04
  sec04Tag: string;
  sec04Title: string;
  sec04Intro: string;
  sec04Step1Num: string;
  sec04Step1Title: string;
  sec04Step1Desc: string;
  sec04Step1Footer: string;
  sec04Step2Num: string;
  sec04Step2Title: string;
  sec04Step2Desc: string;
  sec04Step2Footer: string;
  sec04Step3Num: string;
  sec04Step3Title: string;
  sec04Step3Desc: string;
  sec04Step3Footer: string;

  // Section 05
  sec05Tag: string;
  sec05Title: string;
  sec05Badge: string;
  sec05PriceCaption: string;
  sec05PriceTag: string;
  sec05Condition1: string;
  sec05Condition2: string;
  sec05Condition3: string;
  sec05Cta: string;
  sec05Ssl: string;
  sec05InstantCode: string;
  sec05BelowMarker: string;
  sec05SealDays: string;
  sec05SealWord: string;
  sec05SealProtection: string;
  sec05SealCaption: string;
  sec05GuaranteeTitle: string;
  sec05GuaranteeDesc1: string;
  sec05GuaranteeDesc2: string;
  sec05GuaranteeExtra: string;

  // Section 06
  sec06Tag: string;
  sec06Title: string;
  faqItems: TranslationFaq[];
  finalCallout: string;
  finalDesc: string;
  finalCta: string;
  finalGuaranteePill: string;
  footerOrg: string;
  footerDisclaimer: string;
  legalNotice: string;
  legalRedirectPart1: string;
  legalRedirectPart2: string;
  copyright: string;

  // Sticky Bar
  stickyOneTime: string;
  stickyGuarantee: string;
  stickyCta: string;
}

export const translations: Record<SupportedLanguage, TranslationBundle> = {
  de: {
    // Banner
    bannerSsl: "Geschützter Archiv-Server · SSL 256-Bit",
    bannerOptimizedFor: "Optimiert für",
    bannerLanguage: "Sprache:",
    bannerDeDefault: "DE (Standard)",

    // Hero
    navTitle: "Die verbotene Apotheke · Archiv 1910",
    eyebrow: "Die verbotene Apotheke · Archiv 1910",
    headlinePart1: "1910 wurde ein Mann dafür bezahlt, die natürliche Heilkunst zu zerstören – und ",
    headlinePart2: "Sie zahlen die Zeche …",
    heroQuote: "„Millionen werden für chemische Medikamente ausgegeben, um Ihre Beschwerden zu behandeln – doch wahre Heilung findet sich seit jeher in der Natur.“",
    heroDesc: "Entdecken Sie das uralte Arsenal zur Behandlung, Heilung und Kontrolle von Krankheiten und zur Wiederherstellung Ihrer Gesundheit von innen heraus.",
    ctaMain: "Jetzt zum Portal",
    learnMore: "Mehr erfahren",
    webappBadge: "Web-App-Plattform – Sofortiger Zugriff",
    botanicalLabel: "Naturheilkunde",
    statSolutionsNum: "+300",
    statSolutionsLine1: "NATÜRLICHE LÖSUNGEN",
    statSolutionsLine2: "UND TECHNIKEN",
    groupBadge: "GRUPPE FÜR NATÜRLICHE HEILMETHODEN",
    botanicalDesc: "Umfassende Rezepturen, Tinkturen, Kräuterextrakte und überlieferte Manuskripte direkt in einer intuitiven Web-App aufbereitet.",

    // VSL & Modal
    vslDossierTag: "Dossier 1910 · Archiv-Enthüllung",
    vslPlaySound: "Klicken zum Abspielen mit Ton",
    vslAutoplayNotice: "(Autoplay ist deaktiviert – Video startet exklusiv bei Klick in bester Audioqualität)",
    vslWebviewOptimized: "Optimiert für mobile Browser & Social-Media-Webviews",
    vslStatusRunning: "Archiv-VSL läuft",
    vslHelperSlot: "",
    vslModalTitle: "Kontakt & Kundenservice",
    vslModalDesc: "Haben Sie Fragen zur Web-App-Plattform oder zum Zugriff auf das Archiv von 1910? Unser Support-Team steht Ihnen gerne zur Seite.",
    vslModalContactLabel: "Offizielle Kontaktadresse:",
    vslModalRedirectNotice: "",
    vslModalClose: "Schließen",
    vslModalCompose: "E-Mail verfassen",
    vslModalSubject: "Anfrage zu Die verbotene Apotheke Archiv 1910",
    vslBufferNotice: "Puffer-Wechsel zu Video-Tag",

    // Section 01
    sec01Marker: "01",
    sec01Tag: "Der Pharma-Konflikt von 1910",
    sec01Title: "Die Pharmaindustrie entwickelt keine Heilmittel, sie schafft Kunden.",
    sec01QuestionPart1: "Wenn Sie heute an einer Krankheit leiden, beantworten Sie diese Frage ehrlich: ",
    sec01QuestionBold: "Hat das Medikament, das Sie einnehmen, Ihr Problem gelöst oder müssen Sie es Ihr Leben lang einnehmen?",
    sec01Paragraph2: "Die moderne Medizin ist in Notfällen hervorragend, aber bei chronischen Krankheiten unterdrückt sie oft nur die Symptome. Ihre Vorfahren wussten, wie man den Körper mit natürlichen Heilmitteln schonend behandelt.",
    sec01BadgeRed: "Unterdrückung von Symptomen statt Ursachenbehebung",
    sec01BadgeGreen: "Überlieferte Ganzheitlichkeit aus natürlichen Extrakten",
    sec01ImgBadge: "Abhängigkeit vs. Natur",
    sec01Banner: "Schluss mit schwarzen Pillen und ihren verheerenden Nebenwirkungen!",

    // Section 02
    sec02Tag: "02 / Die Webplattform",
    sec02Title: "Praktische Gesundheitstipps unserer Vorfahren: Natürliche Behandlungen und Heilmittel.",
    sec02Desc: "Wir haben über 300 Techniken und Rezepte für natürliche Heilmittel und traditionelle Heilmethoden zusammengetragen, basierend auf überliefertem Wissen. Eine präzise Schritt-für-Schritt-Anleitung mit genauen Zutaten, Extraktionsmethoden und praktischen Anwendungshinweisen.",
    sec02Pill1Title: "+300 nummerierte Lösungen",
    sec02Pill1Desc: "Tees, Heilmittel in Flaschen, Bäder, Salben, Techniken, natürliche Ressourcen, Weihrauch, Lebensmittel, Kompressen und weiteres traditionelles Wissen.",
    sec02Pill2Title: "Kompakte Schritt-für-Schritt-Anleitungen",
    sec02Pill2Desc: "Exakte Mengenangaben, Koch- und Ziehzeiten sowie optimale Temperaturführung für maximale Wirkstoffausbeute.",
    sec02Pill3Title: "Sofortiger Zugriff auf die praktische Webplattform",
    sec02Pill3Desc: "Direkt im Browser nutzbar – optimiert für jedes Smartphone, Tablet und jeden Computer ohne Installation.",
    sec02Cta: "Zum Portal",
    sec02Verified: "Verifizierte Plattform",
    sec02SearchPlaceholder: "Suche: „Leberwickel“, „Wermuttinktur“, „Entzündung“...",
    sec02Recipe1Tag: "Rezept #042 · Archiv 1910",
    sec02Recipe1Time: "15 Min. Ziehzeit",
    sec02Recipe1Title: "Traditionelle Bitterstoff-Tinktur zur Leberaktivierung",
    sec02Recipe1Desc: "Exakte Schritt-für-Schritt Zubereitung aus Löwenzahnwurzel, Schafgarbenblüte und Wermutkraut mit 40% reinem Fruchtdestillat.",
    sec02Recipe1Unlocked: "✓ Vollständige Anleitung freigeschaltet",
    sec02Recipe1View: "Web-App Ansicht",
    sec02Recipe2Tag: "Rezept #118",
    sec02Recipe2Badge: "100% Natürlich",
    sec02Recipe2Title: "Kräuter-Dampfkompresse gegen rheumatische Gelenkbeschwerden",
    sec02Caption: "Übersichtliches und praktisches Wissen für den schnellen Zugriff – Ihre Hausapotheke mit Naturprodukten.",

    // Section 03
    sec03Tag: "03 / WAS SIE ENTDECKEN WERDEN",
    sec03Title: "Ein klarer Weg durch die natürliche Hausapotheke.",
    sec03Desc1: "Techniken und Ressourcen für Erste Hilfe und Notfälle zu Hause. Überlieferte Manuskripte, natürliche Ressourcen, Rezepte und natürliche Heilmittel, die über Generationen verborgen waren.",
    sec03ShoppingList: "Einkaufsliste mit Zutaten und natürlichen Ressourcen für die Zubereitung.",
    sec03Sub: "Die Inhalte sind nach Körperbereichen und Alltagssituationen gegliedert – von ersten Eindrücken bis zur praktischen Anwendung.",
    sec03HerbsLabel: "Überlieferte Heilmittel:",
    categories: [
      {
        symbol: '✦',
        badge: 'Entgiftung & Stoffwechsel',
        title: '✦ Leber, Nieren und Gallenblase',
        description: 'Intensive traditionelle Heilmittel und natürliche Ressourcen für die tägliche Pflanzenpflege.',
        herbs: ['Löwenzahnwurzel', 'Mariendistel', 'Artischocke', 'Goldrute'],
        image: '/assets/category-liver-kidneys.webp'
      },
      {
        symbol: '◌',
        badge: 'Vitale Zirkulation',
        title: '◌ Herz und Kreislauf',
        description: 'Traditionelle Rezepte und Achtsamkeitsübungen für Durchblutung und Wohlbefinden.',
        herbs: ['Weißdorn', 'Mistelkraut', 'Knoblauchextrakt', 'Melisse'],
        image: '/assets/category-circulation.webp'
      },
      {
        symbol: '✧',
        badge: 'Schmerzlinderung',
        title: '✧ Chronische Schmerzen und Entzündungen',
        description: 'Traditionelle Anwendungen umfassen Kompressen, Bäder, Öle und Salben.',
        herbs: ['Weidenrinde', 'Teufelskralle', 'Arnika-Öl', 'Beinwell'],
        image: '/assets/category-pain-inflammation.webp'
      },
      {
        symbol: '◈',
        badge: 'Prävention & Begleitung',
        title: '◈ Chronische Erkrankungen und Beschwerden',
        description: 'Unterstützende und vorbeugende Anwendungen als Ergänzung zur professionellen Behandlung.',
        herbs: ['Kurkuma-Mazerat', 'Schwarzkümmelöl', 'Propolis', 'Schafgarbe'],
        image: '/assets/category-prevention-support.webp'
      },
      {
        symbol: '⋆',
        badge: 'Ruhe & Abwehrkräfte',
        title: '⋆ Nervensystem und Immunsystem',
        description: 'Rezepte zur Linderung von Unruhe und Schlafproblemen sowie zur Stärkung der natürlichen Abwehrkräfte.',
        herbs: ['Passionsblume', 'Baldrianwurzel', 'Echinacea', 'Hagebutte'],
        image: '/assets/category-calm-immunity.webp'
      }
    ],

    // Section 04
    sec04Tag: "04 / SO FUNKTIONIERT ES",
    sec04Title: "Wie funktionieren die Schritt-für-Schritt-Anleitungen?",
    sec04Intro: "Keine Sorge, Sie benötigen keine medizinischen Vorkenntnisse. Die Anleitungen sind intuitiv und leicht verständlich.",
    sec04Step1Num: "1",
    sec04Step1Title: "Genaue Zutaten",
    sec04Step1Desc: "Wurzeln, Blätter, Rinde und Samen, erhältlich in Reformhäusern oder auf Wochenmärkten.",
    sec04Step1Footer: "Mit Bezugsquellen-Empfehlungen",
    sec04Step2Num: "2",
    sec04Step2Title: "Detaillierte Zubereitung",
    sec04Step2Desc: "Genaue Kochzeit, richtige Mengenverhältnisse und geeignetes Gefäß – alles leicht verständlich erklärt.",
    sec04Step2Footer: "Gelinggarantie auch für Einsteiger",
    sec04Step3Num: "3",
    sec04Step3Title: "Praktische Anwendungstechniken",
    sec04Step3Desc: "Konzentrierte Aufgüsse, Tinkturen, dermatologische Salben, warme Kompressen und Sirupe.",
    sec04Step3Footer: "Vielfältige Hausmittel-Formen",

    // Section 05
    sec05Tag: "LEBENSLANGER ZUGRIFF",
    sec05Title: "Sichern Sie sich dauerhaften Zugriff auf historische Ahnen-Archive, Techniken, Rezepte, natürliche Heilmittel und natürliche Ressourcen – Heilung von innen heraus",
    sec05Badge: "Offizielle Web-App-Lizenz · Einmaliger Sonderzugang",
    sec05PriceCaption: "",
    sec05PriceTag: "33 €",
    sec05Condition1: "Einmalige Zahlung.",
    sec05Condition2: "Keine monatlichen Gebühren.",
    sec05Condition3: "Keine weiteren Kosten.",
    sec05Cta: "ICH MÖCHTE JETZT AUF DIE MANUSKRIPTE ZUGREIFEN",
    sec05Ssl: "SSL 256-Bit Verschlüsselte Zahlung",
    sec05InstantCode: "Sofortiger Freischalt-Code per E-Mail",
    sec05BelowMarker: "",
    sec05SealDays: "15 TAGE",
    sec05SealWord: "GARANTIE",
    sec05SealProtection: "100% SCHUTZ",
    sec05SealCaption: "",
    sec05GuaranteeTitle: "Zufriedenheitsgarantie – Volle Kostenübernahme",
    sec05GuaranteeDesc1: "Testen Sie es 15 Tage lang risikofrei. Greifen Sie auf die Plattform zu.",
    sec05GuaranteeDesc2: "Sie können innerhalb von 15 Tagen eine Rückerstattung beantragen.",
    sec05GuaranteeExtra: "Sollten Sie aus irgendeinem Grund nicht absolut überzeugt sein, genügt eine kurze formlose E-Mail an unseren Kundenservice, und der volle Betrag von 33 € wird Ihnen ohne Rückfragen sofort erstattet.",

    // Section 06
    sec06Tag: "06 / HÄUFIG GESTELLTE FRAGEN",
    sec06Title: "Alles Wichtige auf einen Blick.",
    faqItems: [
      {
        question: "Lehrt die Plattform, wie man schwere Krankheiten behandelt?",
        answer: "Plazz vermittelt traditionelles Wissen zur Unterstützung, Vorbeugung und Linderung verschiedener chronischer Krankheiten und Schmerzen und dient als Ergänzung zur medizinischen Behandlung."
      },
      {
        question: "Wo finde ich Heilpflanzen?",
        answer: "Die überwiegende Mehrheit aller in den Manuskripten von 1910 dokumentierten Heilkräuter, Wurzeln, Samen und Rinden ist in Reformhäusern, gut sortierten Apotheken, auf regionalen Wochenmärkten oder über zertifizierte Online-Kräuterhändler frei erhältlich. In der Web-App ist für jede Rezeptur eine praktische Einkaufsliste mit geprüften Bezugsquellen hinterlegt."
      },
      {
        question: "Wie erhalte ich Zugriff?",
        answer: "Unmittelbar nach der sicheren Zahlung über Hotmart erhalten Sie innerhalb von Sekunden eine Bestätigungs-E-Mail mit Ihren persönlichen Zugangsdaten und dem Direktlink zur geschützten Web-App-Plattform. Sie können sofort und ohne jegliche Wartezeit loslegen."
      },
      {
        question: "Kann ich es auf meinem Smartphone lesen?",
        answer: "Ja, absolut. Die gesamte Plattform wurde speziell für Smartphones und Tablets optimiert. Sie funktioniert reibungslos in jedem mobilen Browser (inklusive WhatsApp, Instagram und Facebook Webviews), benötigt keinen Speicherplatz auf Ihrem Gerät und passt sich allen Bildschirmgrößen perfekt an."
      }
    ],
    finalCallout: "Entscheiden Sie sich noch heute für ein bewussteres und natürlicheres Leben.",
    finalDesc: "Erhalten Sie sofortigen und lebenslangen Zugang zu mehr als 300 natürlichen Lösungen und Rezepten, die auf bewährten historischen Aufzeichnungen basieren.",
    finalCta: "Ich möchte die Manuskripte jetzt!",
    finalGuaranteePill: "Bedingungslose 15-Tage-Garantie · Einmalzahlung von 33 €",
    footerOrg: "Naturopathia · Gruppe für natürliche Heilmethoden",
    footerDisclaimer: "Bewährtes Informationsmaterial und historisch überliefertes Wissen. Dies ersetzt keine Beratung, Diagnose oder Behandlung durch medizinisches Fachpersonal. Ziehen Sie für Unterstützung und Diagnosen stets eine qualifizierte Fachkraft für Naturheilkunde hinzu.",
    legalNotice: "Rechtlicher Hinweis",
    legalRedirectPart1: "",
    legalRedirectPart2: "",
    copyright: "2026 Naturopathia · Gruppe für natürliche Heilmethoden",

    // Sticky Bar
    stickyOneTime: "Einmalig",
    stickyGuarantee: "15 Tage Garantie",
    stickyCta: "Jetzt zum Portal"
  },

  pt: {
    // Banner
    bannerSsl: "Servidor de Arquivo Protegido · SSL 256-Bit",
    bannerOptimizedFor: "Otimizado para",
    bannerLanguage: "Idioma:",
    bannerDeDefault: "DE (Alemão)",

    // Hero
    navTitle: "A Farmácia Proibida · Arquivo 1910",
    eyebrow: "A Farmácia Proibida · Arquivo 1910",
    headlinePart1: "Em 1910 um homem foi pago para destruir a medicina natural – e ",
    headlinePart2: "você está pagando a conta …",
    heroQuote: "“Milhões são gastos em medicamentos químicos para tratar problemas – mas a verdadeira cura sempre esteve na natureza.”",
    heroDesc: "Descubra o arsenal ancestral para tratamento, cura e controle de enfermidades, restaurando sua saúde de dentro para fora.",
    ctaMain: "Acessar o Portal Agora",
    learnMore: "Saiba mais",
    webappBadge: "Plataforma Web-App – Acesso Imediato",
    botanicalLabel: "Naturopatia",
    statSolutionsNum: "+300",
    statSolutionsLine1: "SOLUÇÕES NATURAIS",
    statSolutionsLine2: "E TÉCNICAS",
    groupBadge: "GRUPO DE MÉTODOS NATURAIS DE CURA",
    botanicalDesc: "Receitas abrangentes, tinturas, extratos de ervas e manuscritos ancestrais reunidos em um Web-App intuitivo.",

    // VSL & Modal
    vslDossierTag: "Dossiê 1910 · Revelação do Arquivo",
    vslPlaySound: "Clique para reproduzir com áudio",
    vslAutoplayNotice: "(A reprodução automática está desativada – clique para assistir com áudio em alta qualidade)",
    vslWebviewOptimized: "Otimizado para navegadores de celular e redes sociais",
    vslStatusRunning: "VSL do Arquivo em reprodução",
    vslHelperSlot: "",
    vslModalTitle: "Contato & Suporte ao Cliente",
    vslModalDesc: "Tem dúvidas sobre a plataforma Web-App ou acesso ao arquivo de 1910? Nossa equipe de suporte está pronta para ajudar.",
    vslModalContactLabel: "Endereço oficial de contato:",
    vslModalRedirectNotice: "",
    vslModalClose: "Fechar",
    vslModalCompose: "Escrever e-mail",
    vslModalSubject: "Dúvida sobre A Farmácia Proibida Arquivo 1910",
    vslBufferNotice: "Alternando buffer para o vídeo",

    // Section 01
    sec01Marker: "01",
    sec01Tag: "O Conflito Farmacêutico de 1910",
    sec01Title: "A indústria farmacêutica não cria curas, ela cria clientes.",
    sec01QuestionPart1: "Se você sofre de alguma condição de saúde hoje, responda com sinceridade: ",
    sec01QuestionBold: "o remédio que você toma resolveu o seu problema ou você é obrigado a tomá-lo pelo resto da vida?",
    sec01Paragraph2: "A medicina moderna é excelente para emergências, mas em doenças crônicas ela apenas mascara os sintomas. Seus antepassados sabiam tratar o organismo com compostos da terra.",
    sec01BadgeRed: "Supressão de sintomas em vez da causa raiz",
    sec01BadgeGreen: "Equilíbrio ancestral através de extratos botânicos",
    sec01ImgBadge: "Dependência vs. Natureza",
    sec01Banner: "Chega de pílulas pretas e seus efeitos colaterais devastadores!",

    // Section 02
    sec02Tag: "02 / A Plataforma Web",
    sec02Title: "Conselhos práticos de saúde dos nossos antepassados: Tratamentos naturais e remédios caseiros.",
    sec02Desc: "Reunimos mais de 300 técnicas e receitas de remédios naturais e métodos tradicionais de cura baseados em saberes transmitidos por gerações. Um guia passo a passo com ingredientes exatos, métodos de extração e aplicações práticas.",
    sec02Pill1Title: "+300 soluções numeradas",
    sec02Pill1Desc: "Chás, remédios em garrafa, banhos, pomadas, técnicas, recursos naturais, incenso, alimentos, compressas e outros conhecimentos tradicionais.",
    sec02Pill2Title: "Instruções passo a passo compactas",
    sec02Pill2Desc: "Quantidades exatas, tempos de infusão e controle ideal de temperatura para máxima extração dos princípios ativos.",
    sec02Pill3Title: "Acesso imediato à plataforma prática",
    sec02Pill3Desc: "Acessível direto no navegador – otimizado para celulares, tablets e computadores sem necessidade de instalar nada.",
    sec02Cta: "Acessar o Portal",
    sec02Verified: "Plataforma Verificada",
    sec02SearchPlaceholder: "Pesquisar: “Compressa de fígado”, “Tintura de absinto”, “Inflamação”...",
    sec02Recipe1Tag: "Receita #042 · Arquivo 1910",
    sec02Recipe1Time: "15 min de infusão",
    sec02Recipe1Title: "Tintura Amarga Tradicional para Ativação Hepática",
    sec02Recipe1Desc: "Preparo detalhado com raiz de dente-de-leão, flores de mil-folhas e folhas de absinto em destilado puro a 40%.",
    sec02Recipe1Unlocked: "✓ Instrução completa liberada",
    sec02Recipe1View: "Visualização Web-App",
    sec02Recipe2Tag: "Receita #118",
    sec02Recipe2Badge: "100% Natural",
    sec02Recipe2Title: "Compressa aromática de vapor para dores articulares e reumatismo",
    sec02Caption: "Conhecimento claro e prático para acesso rápido – sua farmácia caseira com produtos naturais.",

    // Section 03
    sec03Tag: "03 / O QUE VOCÊ VAI DESCOBRIR",
    sec03Title: "Um caminho claro pela farmácia caseira natural.",
    sec03Desc1: "Técnicas e recursos para primeiros socorros em casa. Manuscritos herdados, recursos botânicos, receitas e remédios naturais mantidos em segredo por gerações.",
    sec03ShoppingList: "Lista de compras com ingredientes e recursos naturais para o preparo.",
    sec03Sub: "Os conteúdos são organizados por áreas corporais e situações do dia a dia – das primeiras impressões à aplicação prática.",
    sec03HerbsLabel: "Remédios ancestrais:",
    categories: [
      {
        symbol: '✦',
        badge: 'Desintoxicação & Metabolismo',
        title: '✦ Fígado, Rins e Vesícula Biliar',
        description: 'Remédios tradicionais intensivos e recursos naturais para o cuidado botânico diário.',
        herbs: ['Raiz de dente-de-leão', 'Cardo-mariano', 'Alcachofra', 'Vara-de-ouro'],
        image: '/assets/category-liver-kidneys.webp'
      },
      {
        symbol: '◌',
        badge: 'Circulação Vital',
        title: '◌ Coração e Circulação Sanguínea',
        description: 'Receitas tradicionais e exercícios de atenção para circulação e bem-estar.',
        herbs: ['Espinheiro-branco', 'Visco', 'Extrato de alho', 'Erva-cidreira'],
        image: '/assets/category-circulation.webp'
      },
      {
        symbol: '✧',
        badge: 'Alívio da Dor',
        title: '✧ Dores Crônicas e Inflamações',
        description: 'Aplicações tradicionais incluem compressas, banhos medicinais, óleos e pomadas.',
        herbs: ['Casca de salgueiro', 'Garra-do-diabo', 'Óleo de arnica', 'Confrei'],
        image: '/assets/category-pain-inflammation.webp'
      },
      {
        symbol: '◈',
        badge: 'Prevenção & Apoio',
        title: '◈ Doenças Crônicas e Queixas Recorrentes',
        description: 'Aplicações preventivas e de apoio como complemento ao tratamento médico.',
        herbs: ['Macerado de cúrcuma', 'Óleo de cominho preto', 'Própolis', 'Mil-folhas'],
        image: '/assets/category-prevention-support.webp'
      },
      {
        symbol: '⋆',
        badge: 'Calma & Imunidade',
        title: '⋆ Sistema Nervoso e Sistema Imunológico',
        description: 'Receitas para aliviar a ansiedade e insônia, além de fortalecer as defesas naturais.',
        herbs: ['Passiflora', 'Raiz de valeriana', 'Equinácea', 'Rosa-mosqueta'],
        image: '/assets/category-calm-immunity.webp'
      }
    ],

    // Section 04
    sec04Tag: "04 / COMO FUNCIONA",
    sec04Title: "Como funcionam as orientações passo a passo?",
    sec04Intro: "Não se preocupe, você não precisa de conhecimento médico prévio. As instruções são intuitivas e acessíveis a qualquer pessoa.",
    sec04Step1Num: "1",
    sec04Step1Title: "Ingredientes Exatos",
    sec04Step1Desc: "Raízes, folhas, cascas e sementes fáceis de encontrar em casas de ervas, ervanárias e feiras livres.",
    sec04Step1Footer: "Com lista de fornecedores recomendados",
    sec04Step2Num: "2",
    sec04Step2Title: "Preparo Detalhado",
    sec04Step2Desc: "Tempo de cozimento preciso, proporções exatas e recipientes adequados – tudo explicado com simplicidade.",
    sec04Step2Footer: "Garantia de sucesso até para iniciantes",
    sec04Step3Num: "3",
    sec04Step3Title: "Técnicas Práticas de Aplicação",
    sec04Step3Desc: "Chás concentrados, tinturas alcoólicas, pomadas dermatológicas, compressas mornas e xaropes terapêuticos.",
    sec04Step3Footer: "Diversas formas de remédios caseiros",

    // Section 05
    sec05Tag: "ACESSO VITALÍCIO",
    sec05Title: "Garanta acesso duradouro aos arquivo históricos ancestrais técnicas receitas remédios naturais recursos naturais cura de dentro pra fora",
    sec05Badge: "Licença Oficial Web-App · Acesso Especial Único",
    sec05PriceCaption: "",
    sec05PriceTag: "33 €",
    sec05Condition1: "Pagamento único.",
    sec05Condition2: "Sem mensalidades ou assinaturas.",
    sec05Condition3: "Sem nenhum custo adicional posterior.",
    sec05Cta: "QUERO ACESSAR OS MANUSCRITOS AGORA",
    sec05Ssl: "Pagamento Criptografado SSL 256-Bit",
    sec05InstantCode: "Código de ativação imediato por e-mail",
    sec05BelowMarker: "",
    sec05SealDays: "15 DIAS",
    sec05SealWord: "GARANTIA",
    sec05SealProtection: "100% SEGURO",
    sec05SealCaption: "",
    sec05GuaranteeTitle: "Garantia de Satisfação – Reembolso Integral",
    sec05GuaranteeDesc1: "Experimente sem riscos por 15 dias completos. Acesse a plataforma.",
    sec05GuaranteeDesc2: "Você pode solicitar reembolso total dentro do prazo de 15 dias.",
    sec05GuaranteeExtra: "Se por qualquer razão você não estiver 100% satisfeito, basta enviar um e-mail simples e o valor integral de 33 € será devolvido na hora, sem perguntas.",

    // Section 06
    sec06Tag: "06 / PERGUNTAS FREQUENTES",
    sec06Title: "Tudo o que você precisa saber.",
    faqItems: [
      {
        question: "A plataforma ensina a tratar doenças graves?",
        answer: "A plataforma transmite saberes tradicionais para apoio, prevenção e alívio de diversas queixas e dores crônicas, servindo como complemento ao acompanhamento médico."
      },
      {
        question: "Onde encontro as plantas medicinais?",
        answer: "A grande maioria das ervas, raízes e sementes documentadas nos manuscritos de 1910 pode ser adquirida facilmente em ervanárias, farmácias de manipulação, feiras ou pela internet. No aplicativo há uma lista prática de compras com fontes confiáveis."
      },
      {
        question: "Como recebo o acesso?",
        answer: "Logo após a confirmação do pagamento seguro pela Hotmart, você recebe instantaneamente um e-mail com seus dados de acesso e o link direto para a plataforma web. Pode começar na hora."
      },
      {
        question: "Posso acessar pelo meu celular?",
        answer: "Sim, com certeza. Toda a plataforma foi especialmente desenhada para smartphones e tablets. Funciona perfeitamente em qualquer navegador (incluindo navegadores internos de WhatsApp, Instagram e Facebook) sem ocupar espaço no aparelho."
      }
    ],
    finalCallout: "Tome hoje a decisão por uma vida mais consciente e natural.",
    finalDesc: "Receba acesso vitalício imediato a mais de 300 manuscritos e receitas testadas do ano de 1910.",
    finalCta: "Quero os manuscritos agora!",
    finalGuaranteePill: "Garantia incondicional de 15 dias · Pagamento único de 33 €",
    footerOrg: "Naturopatia · Grupo de Métodos Naturais de Cura",
    footerDisclaimer: "Material informativo e de preservação histórica. Não substitui consulta, diagnóstico ou acompanhamento de profissionais habilitados de saúde.",
    legalNotice: "Aviso Legal",
    legalRedirectPart1: "",
    legalRedirectPart2: "",
    copyright: "2026 Naturopatia · Grupo de Métodos Naturais de Cura",

    // Sticky Bar
    stickyOneTime: "Pagamento único",
    stickyGuarantee: "15 dias de garantia",
    stickyCta: "Acessar o Portal"
  },

  en: {
    // Banner
    bannerSsl: "Secure Archive Server · SSL 256-Bit",
    bannerOptimizedFor: "Optimized for",
    bannerLanguage: "Language:",
    bannerDeDefault: "DE (German default)",

    // Hero
    navTitle: "The Forbidden Pharmacy · Archive 1910",
    eyebrow: "The Forbidden Pharmacy · Archive 1910",
    headlinePart1: "In 1910, a man was paid to destroy natural healing – and ",
    headlinePart2: "you are paying the price …",
    heroQuote: "“Millions are spent on synthetic drugs to manage symptoms – yet genuine healing has always resided in nature.”",
    heroDesc: "Discover the ancient arsenal for treating, curing, and managing ailments, restoring your vitality from within.",
    ctaMain: "Enter the Portal Now",
    learnMore: "Learn more",
    webappBadge: "Web-App Platform – Instant Access",
    botanicalLabel: "Naturopathy",
    statSolutionsNum: "+300",
    statSolutionsLine1: "NATURAL REMEDIES",
    statSolutionsLine2: "AND METHODS",
    groupBadge: "NATURAL HEALING METHODS GROUP",
    botanicalDesc: "Comprehensive recipes, tinctures, herbal extracts, and ancestral manuscripts made accessible in an intuitive Web-App.",

    // VSL & Modal
    vslDossierTag: "Dossier 1910 · Archive Revelation",
    vslPlaySound: "Click to play with sound",
    vslAutoplayNotice: "(Autoplay is disabled – click to start with high-fidelity audio)",
    vslWebviewOptimized: "Optimized for mobile browsers & social media webviews",
    vslStatusRunning: "Archive VSL is playing",
    vslHelperSlot: "",
    vslModalTitle: "Contact & Customer Support",
    vslModalDesc: "Do you have questions about the Web-App platform or accessing the 1910 archive? Our support team is here to assist you.",
    vslModalContactLabel: "Official contact address:",
    vslModalRedirectNotice: "",
    vslModalClose: "Close",
    vslModalCompose: "Compose email",
    vslModalSubject: "Inquiry about The Forbidden Pharmacy Archive 1910",
    vslBufferNotice: "Switching stream buffer to video tag",

    // Section 01
    sec01Marker: "01",
    sec01Tag: "The 1910 Pharma Conflict",
    sec01Title: "Big Pharma doesn't create cures, it creates lifelong customers.",
    sec01QuestionPart1: "If you suffer from a condition today, answer honestly: ",
    sec01QuestionBold: "has the prescription drug solved your problem, or are you forced to take it for the rest of your life?",
    sec01Paragraph2: "Modern medicine excels at emergency care, but with chronic disease it merely suppresses symptoms. Your ancestors understood how to heal the body harmoniously with pure earth compounds.",
    sec01BadgeRed: "Symptom masking instead of addressing root causes",
    sec01BadgeGreen: "Holistic ancestral restoration via pure botanical extracts",
    sec01ImgBadge: "Dependence vs. Nature",
    sec01Banner: "No more black pills and their devastating side effects!",

    // Section 02
    sec02Tag: "02 / The Web Platform",
    sec02Title: "Ancestral Health Guidance: Natural Treatments and Herbal Remedies.",
    sec02Desc: "We have gathered over 300 natural healing techniques and traditional recipes based on preserved generational knowledge. Complete with exact ingredients, extraction ratios, and practical usage guides.",
    sec02Pill1Title: "+300 numbered solutions",
    sec02Pill1Desc: "Teas, bottled elixirs, healing baths, salves, botanical techniques, natural resources, incense, and ancestral wisdom.",
    sec02Pill2Title: "Compact step-by-step instructions",
    sec02Pill2Desc: "Exact ingredient quantities, steeping times, and thermal guidance for maximum bioactive yield.",
    sec02Pill3Title: "Immediate access to the Web-App platform",
    sec02Pill3Desc: "Runs seamlessly in your browser – optimized for mobile smartphones, tablets, and desktops without installing software.",
    sec02Cta: "Go to Portal",
    sec02Verified: "Verified Platform",
    sec02SearchPlaceholder: "Search: “Liver compress”, “Wormwood tincture”, “Inflammation”...",
    sec02Recipe1Tag: "Recipe #042 · Archive 1910",
    sec02Recipe1Time: "15 min steeping",
    sec02Recipe1Title: "Traditional Bitter Tincture for Liver Activation",
    sec02Recipe1Desc: "Step-by-step preparation using dandelion root, yarrow blossoms, and wormwood in 40% pure fruit distillate.",
    sec02Recipe1Unlocked: "✓ Full instructions unlocked",
    sec02Recipe1View: "Web-App View",
    sec02Recipe2Tag: "Recipe #118",
    sec02Recipe2Badge: "100% Natural",
    sec02Recipe2Title: "Herbal steam compress for rheumatic joint aches",
    sec02Caption: "Clear and practical knowledge for quick access – your home pharmacy with natural products.",

    // Section 03
    sec03Tag: "03 / WHAT YOU WILL DISCOVER",
    sec03Title: "A clear path through the natural home pharmacy.",
    sec03Desc1: "Techniques and resources for first aid at home. Inherited manuscripts, botanical resources, recipes, and natural remedies kept secret for generations.",
    sec03ShoppingList: "Shopping list with ingredients and natural resources for preparation.",
    sec03Sub: "The contents are organized by body areas and everyday situations – from first impressions to practical application.",
    sec03HerbsLabel: "Ancestral remedies:",
    categories: [
      {
        symbol: '✦',
        badge: 'Detox & Metabolism',
        title: '✦ Liver, Kidneys, and Gallbladder',
        description: 'Intensive traditional remedies and natural resources for daily botanical care.',
        herbs: ['Dandelion root', 'Milk thistle', 'Artichoke', 'Goldenrod'],
        image: '/assets/category-liver-kidneys.webp'
      },
      {
        symbol: '◌',
        badge: 'Vital Circulation',
        title: '◌ Heart and Circulation',
        description: 'Traditional recipes and mindfulness exercises for circulation and well-being.',
        herbs: ['Hawthorn', 'Mistletoe', 'Garlic extract', 'Lemon balm'],
        image: '/assets/category-circulation.webp'
      },
      {
        symbol: '✧',
        badge: 'Pain Relief',
        title: '✧ Chronic Pain and Inflammation',
        description: 'Traditional applications include compresses, medicinal baths, oils, and salves.',
        herbs: ['Willow bark', 'Devil’s claw', 'Arnica oil', 'Comfrey'],
        image: '/assets/category-pain-inflammation.webp'
      },
      {
        symbol: '◈',
        badge: 'Prevention & Support',
        title: '◈ Chronic Conditions and Recurrent Ailments',
        description: 'Preventative and supportive applications as a complement to medical care.',
        herbs: ['Turmeric extract', 'Black seed oil', 'Propolis', 'Yarrow'],
        image: '/assets/category-prevention-support.webp'
      },
      {
        symbol: '⋆',
        badge: 'Calm & Immunity',
        title: '⋆ Nervous System and Immune System',
        description: 'Recipes to relieve anxiety and insomnia, and to strengthen natural defenses.',
        herbs: ['Passionflower', 'Valerian root', 'Echinacea', 'Rosehips'],
        image: '/assets/category-calm-immunity.webp'
      }
    ],

    // Section 04
    sec04Tag: "04 / HOW IT WORKS",
    sec04Title: "How do the step-by-step instructions work?",
    sec04Intro: "No need to worry; you require no prior medical experience. Instructions are crystal clear and easy to follow.",
    sec04Step1Num: "1",
    sec04Step1Title: "Exact Ingredients",
    sec04Step1Desc: "Roots, leaves, barks, and seeds widely obtainable at herbal stores, organic markets, or online.",
    sec04Step1Footer: "Includes vetted sourcing recommendations",
    sec04Step2Num: "2",
    sec04Step2Title: "Detailed Preparation",
    sec04Step2Desc: "Exact cooking times, proper proportions, and ideal vessels explained in straightforward steps.",
    sec04Step2Footer: "Guaranteed success even for beginners",
    sec04Step3Num: "3",
    sec04Step3Title: "Practical Application Techniques",
    sec04Step3Desc: "Potent herbal teas, concentrated tinctures, dermatological salves, warm compresses, and syrups.",
    sec04Step3Footer: "Diverse home remedy formats",

    // Section 05
    sec05Tag: "LIFETIME ACCESS",
    sec05Title: "Secure lifetime access to ancestral historical archives, techniques, recipes, natural remedies, and natural resources – healing from within",
    sec05Badge: "Official Web-App License · One-Time Special Access",
    sec05PriceCaption: "",
    sec05PriceTag: "33 €",
    sec05Condition1: "One-time payment.",
    sec05Condition2: "No monthly fees or subscriptions.",
    sec05Condition3: "No additional subsequent costs.",
    sec05Cta: "I WANT TO ACCESS THE MANUSCRIPTS NOW",
    sec05Ssl: "SSL 256-Bit Encrypted Payment",
    sec05InstantCode: "Immediate activation code by email",
    sec05BelowMarker: "",
    sec05SealDays: "15 DAYS",
    sec05SealWord: "GUARANTEE",
    sec05SealProtection: "100% PROTECTED",
    sec05SealCaption: "",
    sec05GuaranteeTitle: "Satisfaction Guarantee – Full Refund",
    sec05GuaranteeDesc1: "Test it risk-free for 15 full days. Explore the entire web platform.",
    sec05GuaranteeDesc2: "You can request a 100% refund anytime within 15 days.",
    sec05GuaranteeExtra: "If for any reason you are not completely satisfied, a brief email to support will yield an immediate, no-questions-asked refund of your 33 €.",

    // Section 06
    sec06Tag: "06 / FREQUENTLY ASKED QUESTIONS",
    sec06Title: "Everything you need to know at a glance.",
    faqItems: [
      {
        question: "Does the platform teach how to treat severe diseases?",
        answer: "The platform provides traditional knowledge for supportive care, prevention, and relief of various chronic pains and complaints, serving as a companion to medical guidance."
      },
      {
        question: "Where can I source medicinal plants?",
        answer: "The vast majority of roots, herbs, and barks documented in the 1910 manuscripts are easily purchased at health stores, herbal pharmacies, farmer's markets, or online. The app features a shopping list with verified suppliers for each recipe."
      },
      {
        question: "How do I receive access?",
        answer: "Immediately after your secure payment through Hotmart, you will receive an instant confirmation email with your login credentials and direct link to the protected web platform."
      },
      {
        question: "Can I use it on my smartphone?",
        answer: "Yes, absolutely. The platform was created specifically for smartphones and tablets. It runs smoothly in any mobile browser (including WhatsApp, Instagram, and Facebook in-app browsers) without requiring local storage."
      }
    ],
    finalCallout: "Make the decision today for a more conscious and natural way of living.",
    finalDesc: "Receive immediate lifetime access to over 300 manuscripts and proven formulations from the year 1910.",
    finalCta: "I want the manuscripts now!",
    finalGuaranteePill: "15-day risk-free money-back guarantee · One-time 33 €",
    footerOrg: "Naturopathy · Natural Healing Group",
    footerDisclaimer: "Educational and historical informational material. Not intended as medical diagnosis or individual treatment advice. Always seek qualified healthcare practitioners.",
    legalNotice: "Legal Notice",
    legalRedirectPart1: "",
    legalRedirectPart2: "",
    copyright: "2026 Naturopathy · Natural Healing Group",

    // Sticky Bar
    stickyOneTime: "One-time",
    stickyGuarantee: "15-Day Guarantee",
    stickyCta: "Go to Portal"
  },

  es: {
    // Banner
    bannerSsl: "Servidor de Archivo Protegido · SSL 256-Bit",
    bannerOptimizedFor: "Optimizado para",
    bannerLanguage: "Idioma:",
    bannerDeDefault: "DE (Alemán)",

    // Hero
    navTitle: "La Farmacia Prohibida · Archivo 1910",
    eyebrow: "La Farmacia Proibida · Archivo 1910",
    headlinePart1: "En 1910 pagaron a un hombre para destruir la medicina natural – y ",
    headlinePart2: "usted está pagando el precio …",
    heroQuote: "“Se gastan millones en fármacos químicos para tratar afecciones, cuando la verdadera curación siempre ha estado en la naturaleza.”",
    heroDesc: "Descubra el arsenal ancestral para el tratamiento, alivio y control de enfermedades, restaurando su salud desde dentro hacia afuera.",
    ctaMain: "Ir al Portal Ahora",
    learnMore: "Saber más",
    webappBadge: "Plataforma Web-App – Acceso Inmediato",
    botanicalLabel: "Naturopatía",
    statSolutionsNum: "+300",
    statSolutionsLine1: "SOLUCIONES NATURALES",
    statSolutionsLine2: "Y TÉCNICAS",
    groupBadge: "GRUPO DE MÉTODOS NATURALES DE CURACIÓN",
    botanicalDesc: "Recetas detalladas, tinturas, extractos y manuscritos antiguos presentados en una Web-App intuitiva.",

    // VSL & Modal
    vslDossierTag: "Dossier 1910 · Revelación del Archivo",
    vslPlaySound: "Haga clic para reproducir con audio",
    vslAutoplayNotice: "(La reproducción automática está desactivada – haga clic para escuchar en alta fidelidad)",
    vslWebviewOptimized: "Optimizado para navegadores móviles y redes sociales",
    vslStatusRunning: "VSL del Archivo en reproducción",
    vslHelperSlot: "",
    vslModalTitle: "Contacto y Atención al Cliente",
    vslModalDesc: "¿Tiene preguntas sobre la plataforma Web-App o el acceso al archivo de 1910? Nuestro equipo de soporte está a su entera disposición.",
    vslModalContactLabel: "Dirección oficial de contacto:",
    vslModalRedirectNotice: "",
    vslModalClose: "Cerrar",
    vslModalCompose: "Redactar correo",
    vslModalSubject: "Consulta sobre La Farmacia Prohibida Archivo 1910",
    vslBufferNotice: "Cambiando buffer al video",

    // Section 01
    sec01Marker: "01",
    sec01Tag: "El Conflicto Farmacéutico de 1910",
    sec01Title: "La industria farmacéutica no crea curas, crea clientes de por vida.",
    sec01QuestionPart1: "Si padece alguna enfermedad hoy, respóndase sinceramente: ",
    sec01QuestionBold: "¿el fármaco que toma resolvió su problema o está obligado a tomarlo por el resto de sus días?",
    sec01Paragraph2: "La medicina moderna es admirable en urgencias, pero ante dolencias crónicas sólo enmascara los síntomas. Sus antepasados sabían cómo sanar el cuerpo con las riquezas botánicas de la tierra.",
    sec01BadgeRed: "Supresión de síntomas sin tratar la raíz",
    sec01BadgeGreen: "Equilibrio ancestral mediante extractos botánicos puros",
    sec01ImgBadge: "Dependencia vs. Naturaleza",
    sec01Banner: "¡Basta de píldoras negras y sus devastadores efectos secundarios!",

    // Section 02
    sec02Tag: "02 / La Plataforma Web",
    sec02Title: "Sabiduría ancestral de salud: Tratamientos naturales y remedios caseros.",
    sec02Desc: "Reunimos más de 300 técnicas y recetas de remedios naturales basadas en el saber tradicional transmitido por generaciones. Un manual paso a paso con dosis exactas, métodos de extracción y consejos de uso.",
    sec02Pill1Title: "+300 soluciones numeradas",
    sec02Pill1Desc: "Tés, elixires embotellados, baños, pomadas, técnicas botánicas, incienso, cataplasmas y saber ancestral.",
    sec02Pill2Title: "Instrucciones paso a paso compactas",
    sec02Pill2Desc: "Medidas exactas, tiempos de cocción y temperaturas idóneas para extraer los máximos principios activos.",
    sec02Pill3Title: "Acceso inmediato a la plataforma práctica",
    sec02Pill3Desc: "Se ejecuta en cualquier navegador – optimizado para teléfonos móviles, tablets y ordenadores sin instalar aplicaciones.",
    sec02Cta: "Ir al Portal",
    sec02Verified: "Plataforma Verificada",
    sec02SearchPlaceholder: "Buscar: “Compresa hepática”, “Tintura de ajenjo”, “Inflamación”...",
    sec02Recipe1Tag: "Receta #042 · Archivo 1910",
    sec02Recipe1Time: "15 min de reposo",
    sec02Recipe1Title: "Tintura Amarga Tradicional para Activación Hepática",
    sec02Recipe1Desc: "Elaboración paso a paso con raíz de diente de león, milenrama y ajenjo en destilado al 40%.",
    sec02Recipe1Unlocked: "✓ Instrucción completa desbloqueada",
    sec02Recipe1View: "Vista Web-App",
    sec02Recipe2Tag: "Receta #118",
    sec02Recipe2Badge: "100% Natural",
    sec02Recipe2Title: "Compresa aromática de vapor para molestias reumáticas",
    sec02Caption: "Conocimiento claro y práctico para un acceso rápido: su botiquín casero con productos naturales.",

    // Section 03
    sec03Tag: "03 / LO QUE VA A DESCUBRIR",
    sec03Title: "Un camino claro a través de la farmacia casera natural.",
    sec03Desc1: "Técnicas y recursos para primeros auxilios en casa. Manuscritos heredados, recursos botánicos, recetas y remedios naturales guardados en secreto durante generaciones.",
    sec03ShoppingList: "Lista de compras con ingredientes y recursos naturales para la preparación.",
    sec03Sub: "Los contenidos están organizados por áreas corporais y situaciones cotidianas, desde las primeras impresiones hasta la aplicación práctica.",
    sec03HerbsLabel: "Remedios ancestrales:",
    categories: [
      {
        symbol: '✦',
        badge: 'Desintoxicación & Metabolismo',
        title: '✦ Hígado, Riñones y Vesícula Biliar',
        description: 'Remedios tradicionales intensivos y recursos naturales para el cuidado botánico diario.',
        herbs: ['Raíz de diente de león', 'Cardo mariano', 'Alcachofa', 'Vara de oro'],
        image: '/assets/category-liver-kidneys.webp'
      },
      {
        symbol: '◌',
        badge: 'Circulación Vital',
        title: '◌ Corazón y Circulación Sanguínea',
        description: 'Recetas tradicionales y ejercicios de atención para la circulación y el bienestar.',
        herbs: ['Espino blanco', 'Muérdago', 'Extracto de ajo', 'Melisa'],
        image: '/assets/category-circulation.webp'
      },
      {
        symbol: '✧',
        badge: 'Alivio del Dolor',
        title: '✧ Dolores Crónicos e Inflamaciones',
        description: 'Las aplicaciones tradicionales incluyen compresas, baños medicinales, aceites y pomadas.',
        herbs: ['Corteza de sauce', 'Harpagofito', 'Aceite de árnica', 'Consuelda'],
        image: '/assets/category-pain-inflammation.webp'
      },
      {
        symbol: '◈',
        badge: 'Prevención & Apoyo',
        title: '◈ Enfermedades Crónicas y Molestias Recurrentes',
        description: 'Aplicaciones preventivas y de apoyo como complemento al tratamiento médico.',
        herbs: ['Macerado de cúrcuma', 'Aceite de comino negro', 'Própolis', 'Milenrama'],
        image: '/assets/category-prevention-support.webp'
      },
      {
        symbol: '⋆',
        badge: 'Calma & Inmunidad',
        title: '⋆ Sistema Nervoso e Sistema Inmunológico',
        description: 'Recetas para aliviar la ansiedad y el insomnio, además de fortalecer las defensas naturales.',
        herbs: ['Pasiflora', 'Raíz de valeriana', 'Equinácea', 'Escaramujo'],
        image: '/assets/category-calm-immunity.webp'
      }
    ],

    // Section 04
    sec04Tag: "04 / CÓMO FUNCIONA",
    sec04Title: "¿Cómo funcionan las instrucciones paso a paso?",
    sec04Intro: "No se preocupe, no requiere conocimientos médicos previos. Las indicaciones son intuitivas y fáciles de comprender.",
    sec04Step1Num: "1",
    sec04Step1Title: "Ingredientes Exactos",
    sec04Step1Desc: "Raíces, hojas, cortezas y semillas fáciles de encontrar en herbolarios y mercados.",
    sec04Step1Footer: "Incluye guía de proveedores recomendados",
    sec04Step2Num: "2",
    sec04Step2Title: "Preparación Detallada",
    sec04Step2Desc: "Tiempos de cocción precisos, proporciones correctas y recipientes idóneos explicados con claridad.",
    sec04Step2Footer: "Éxito asegurado incluso para principiantes",
    sec04Step3Num: "3",
    sec04Step3Title: "Técnicas de Aplicación Práctica",
    sec04Step3Desc: "Infusiones concentradas, tinturas hidroalcohólicas, pomadas, compresas templadas y jarabes.",
    sec04Step3Footer: "Formatos variados de medicina tradicional",

    // Section 05
    sec05Tag: "ACCESO DE POR VIDA",
    sec05Title: "Asegure acceso duradero a los archivos históricos ancestrales, técnicas, recetas, remedios naturales y recursos naturales – sanación de dentro hacia afuera",
    sec05Badge: "Licencia Oficial Web-App · Acceso Especial Único",
    sec05PriceCaption: "",
    sec05PriceTag: "33 €",
    sec05Condition1: "Pago único.",
    sec05Condition2: "Sin mensualidades o suscripciones.",
    sec05Condition3: "Sin ningún costo adicional posterior.",
    sec05Cta: "QUIERO ACCEDER A LOS MANUSCRITOS AHORA",
    sec05Ssl: "Pago Cifrado SSL 256-Bit",
    sec05InstantCode: "Código de activación inmediata por correo",
    sec05BelowMarker: "",
    sec05SealDays: "15 DÍAS",
    sec05SealWord: "GARANTÍA",
    sec05SealProtection: "100% PROTEGIDO",
    sec05SealCaption: "",
    sec05GuaranteeTitle: "Garantía de Satisfacción – Reembolso Íntegro",
    sec05GuaranteeDesc1: "Pruébelo sin riesgo durante 15 días enteros. Acceda al portal.",
    sec05GuaranteeDesc2: "Puede solicitar el reembolso del 100% en un plazo de 15 días.",
    sec05GuaranteeExtra: "Si por cualquier motivo no queda completamente satisfecho, un correo breve bastará para recibir de vuelta sus 33 € sin preguntas.",

    // Section 06
    sec06Tag: "06 / PREGUNTAS FRECUENTES",
    sec06Title: "Todo lo importante en un vistazo.",
    faqItems: [
      {
        question: "¿La plataforma enseña a curar enfermedades graves?",
        answer: "La plataforma difunde conocimientos tradicionales orientados a apoyar, prevenir y aliviar dolores crónicos y malestares, actuando como complemento a la atención médica profesional."
      },
      {
        question: "¿Dónde consigo las plantas medicinales?",
        answer: "La inmensa mayoría de las hierbas, raíces y cortezas catalogadas en 1910 están fácilmente disponibles en herboristerías, farmacias botánicas o tiendas online certificadas. En el Web-App encontrará una lista de compra precisa para cada receta."
      },
      {
        question: "¿Cómo recibo el acceso?",
        answer: "Inmediatamente después de abonar su pedido a través de Hotmart, recibirá en segundos un correo con sus claves personales y el enlace directo a la plataforma web."
      },
      {
        question: "¿Puedo leerlo en mi teléfono móvil?",
        answer: "Sí, por supuesto. La plataforma fue concebida expresamente para teléfonos móviles y tablets. Funciona de manera óptima en cualquier navegador móvil (incluyendo navegadores integrados de WhatsApp, Instagram y Facebook) sin ocupar almacenamiento."
      }
    ],
    finalCallout: "Tome hoy la decisión de vivir de manera más consciente y natural.",
    finalDesc: "Obtenga acceso vitalicio inmediato a más de 300 manuscritos y recetas probadas del año 1910.",
    finalCta: "¡Quiero los manuscritos ahora!",
    finalGuaranteePill: "Garantía incondicional de 15 días · Pago único de 33 €",
    footerOrg: "Naturopatía · Grupo de Métodos Naturales de Curación",
    footerDisclaimer: "Material informativo tradicional. No sustituye la atención o diagnóstico de profesionales de la salud. Acuda siempre a profesionales titulados para su seguimiento.",
    legalNotice: "Aviso Legal",
    legalRedirectPart1: "",
    legalRedirectPart2: "",
    copyright: "2026 Naturopatía · Grupo de Métodos Naturales de Curación",

    // Sticky Bar
    stickyOneTime: "Pago único",
    stickyGuarantee: "15 días de garantía",
    stickyCta: "Ir al Portal"
  },

  fr: {
    // Banner
    bannerSsl: "Serveur d'Archives Sécurisé · SSL 256-Bit",
    bannerOptimizedFor: "Optimisé pour",
    bannerLanguage: "Langue :",
    bannerDeDefault: "DE (Allemand par défaut)",

    // Hero
    navTitle: "La Pharmacie Interdite · Archives 1910",
    eyebrow: "La Pharmacie Interdite · Archives 1910",
    headlinePart1: "En 1910, un homme fut payé pour anéantir la médecine par les plantes – et ",
    headlinePart2: "c'est vous qui en payez le prix …",
    heroQuote: "« Des millions sont déboursés en médicaments chimiques pour masquer les troubles, alors que la véritable guérison se trouve depuis toujours dans la nature. »",
    heroDesc: "Découvrez l'arsenal ancestral pour traiter, apaiser et surmonter les maux en régénérant votre organisme de l'intérieur.",
    ctaMain: "Accéder au Portail",
    learnMore: "En savoir plus",
    webappBadge: "Plateforme Web-App – Accès Immédiat",
    botanicalLabel: "Naturopathie",
    statSolutionsNum: "+300",
    statSolutionsLine1: "SOLUTIONS NATURELLES",
    statSolutionsLine2: "ET TECHNIQUES",
    groupBadge: "GROUPE DE MÉTHODES NATURELLES DE GUÉRISON",
    botanicalDesc: "Formulations complètes, teintures, extraits végétaux et manuscrits anciens réunis dans une Web-App intuitive.",

    // VSL & Modal
    vslDossierTag: "Dossier 1910 · Révélation d'Archive",
    vslPlaySound: "Cliquer pour lire avec le son",
    vslAutoplayNotice: "(La lecture automatique est désactivée – cliquez pour démarrer avec un son haute fidélité)",
    vslWebviewOptimized: "Optimisé pour navigateurs mobiles et réseaux sociaux",
    vslStatusRunning: "VSL de l'Archive en cours",
    vslHelperSlot: "",
    vslModalTitle: "Contact & Support Client",
    vslModalDesc: "Avez-vous des questions sur la plateforme Web-App ou l'accès aux archives de 1910 ? Notre équipe d'assistance se tient à votre entière disposition.",
    vslModalContactLabel: "Adresse officielle de contact :",
    vslModalRedirectNotice: "",
    vslModalClose: "Fermer",
    vslModalCompose: "Rédiger un courriel",
    vslModalSubject: "Question sur La Pharmacie Interdite Archives 1910",
    vslBufferNotice: "Bascule du flux vidéo",

    // Section 01
    sec01Marker: "01",
    sec01Tag: "Le Conflit Pharmaceutique de 1910",
    sec01Title: "L'industrie pharmaceutique ne crée pas de remèdes, elle crée des clients réguliers.",
    sec01QuestionPart1: "Si vous souffrez d'un trouble aujourd'hui, répondez avec franchise : ",
    sec01QuestionBold: "le médicament que vous prenez a-t-il résolu votre problème ou êtes-vous condamné à le prendre toute votre vie ?",
    sec01Paragraph2: "La médecine moderne excelle dans l'urgence, mais face aux maladies chroniques, elle se contente d'anesthésier les symptômes. Vos ancêtres savaient rétablir l'organisme avec des trésors botaniques.",
    sec01BadgeRed: "Suppression superficielle des symptômes au lieu de la cause",
    sec01BadgeGreen: "Harmonisation globale ancestrale par des extraits purs",
    sec01ImgBadge: "Dépendance vs. Nature",
    sec01Banner: "Finies les pilules noires et leurs effets secondaires dévastateurs !",

    // Section 02
    sec02Tag: "02 / La Plateforme Web",
    sec02Title: "Conseils ancestraux de santé : Traitements naturels et remèdes de tradition.",
    sec02Desc: "Nous avons réuni plus de 300 techniques et préparations de remèdes naturels fondés sur le savoir immémorial des anciens. Un accompagnement précis pas à pas avec proportions exactes, méthodes d'extraction et usages recommandés.",
    sec02Pill1Title: "+300 solutions numérotées",
    sec02Pill1Desc: "Tisanes, élixirs en bouteille, bains bienfaisants, onguents, encens, cataplasmes et savoir traditionnel préservé.",
    sec02Pill2Title: "Instructions pas à pas compactes",
    sec02Pill2Desc: "Dosages exacts, durées d'infusion et maîtrise de la température pour libérer l'intégralité des principes actifs.",
    sec02Pill3Title: "Accès immédiat à la plateforme Web-App",
    sec02Pill3Desc: "Consultable directement sur tout navigateur – optimisé pour smartphones, tablettes et ordinateurs sans installation.",
    sec02Cta: "Accéder au Portail",
    sec02Verified: "Plateforme Vérifiée",
    sec02SearchPlaceholder: "Rechercher : « Compresse pour le foie », « Teinture d'absinthe », « Inflammation »...",
    sec02Recipe1Tag: "Recette #042 · Archive 1910",
    sec02Recipe1Time: "15 min d'infusion",
    sec02Recipe1Title: "Teinture Amère Traditionnelle pour Activer le Foie",
    sec02Recipe1Desc: "Préparation détaillée à base de racine de pissenlit, fleurs d'achillée et absinthe dans un distillat pur à 40%.",
    sec02Recipe1Unlocked: "✓ Recette complète débloquée",
    sec02Recipe1View: "Vue Web-App",
    sec02Recipe2Tag: "Recette #118",
    sec02Recipe2Badge: "100% Naturel",
    sec02Recipe2Title: "Compresse chaude de plantes pour soulager les douleurs rhumatismales",
    sec02Caption: "Des connaissances claires et pratiques pour un accès rapide – votre pharmacie à domicile avec des produits naturels.",

    // Section 03
    sec03Tag: "03 / CE QUE VOUS ALLEZ DÉCOUVRIR",
    sec03Title: "Un chemin clair à travers la pharmacie naturelle maison.",
    sec03Desc1: "Techniques et ressources pour les premiers secours à domicile. Manuscrits hérités, ressources botaniques, recettes et remèdes naturels gardés secrets pendant des générations.",
    sec03ShoppingList: "Liste de courses avec ingrédients et ressources naturelles pour la préparation.",
    sec03Sub: "Les contenus sont organisés par zones corporelles et situations du quotidien – des premières impressions à l'application pratique.",
    sec03HerbsLabel: "Remèdes ancestraux :",
    categories: [
      {
        symbol: '✦',
        badge: 'Détox & Métabolisme',
        title: '✦ Foie, Reins et Vésicule Biliaire',
        description: 'Remèdes traditionnels intensifs et ressources naturelles pour les soins botaniques quotidiens.',
        herbs: ['Racine de pissenlit', 'Chardon-Marie', 'Artichaut', 'Verge d’or'],
        image: '/assets/category-liver-kidneys.webp'
      },
      {
        symbol: '◌',
        badge: 'Circulation Vitale',
        title: '◌ Cœur et Circulation Sanguine',
        description: 'Recettes traditionnelles et exercices d\'attention pour la circulation et le bien-être.',
        herbs: ['Aubépine', 'Gui', 'Extrait d’ail', 'Mélisse'],
        image: '/assets/category-circulation.webp'
      },
      {
        symbol: '✧',
        badge: 'Soulagement de la Douleur',
        title: '✧ Douleurs Chroniques et Inflammations',
        description: 'Les applications traditionnelles comprennent les compresses, les bains médicinaux, les huiles et les onguents.',
        herbs: ['Écorce de saule', 'Harpagophytum', 'Huile d’arnica', 'Consoude'],
        image: '/assets/category-pain-inflammation.webp'
      },
      {
        symbol: '◈',
        badge: 'Prévention & Soutien',
        title: '◈ Maladies Chroniques et Troubles Récurrents',
        description: 'Applications préventives et de soutien en complément du traitement médical.',
        herbs: ['Macérat de curcuma', 'Huile de nigelle', 'Propolis', 'Achillée'],
        image: '/assets/category-prevention-support.webp'
      },
      {
        symbol: '⋆',
        badge: 'Calme & Immunité',
        title: '⋆ Système Nerveux et Système Immunitaire',
        description: 'Recettes pour soulager l\'anxiété et l\'insomnie, et renforcer les défenses naturelles.',
        herbs: ['Passiflore', 'Racine de valériane', 'Échinacée', 'Cynorrhodon'],
        image: '/assets/category-calm-immunity.webp'
      }
    ],

    // Section 04
    sec04Tag: "04 / COMMENT ÇA FONCTIONNE",
    sec04Title: "Comment s'articulent les guides pas à pas ?",
    sec04Intro: "Soyez rassuré(e), aucune connaissance médicale préalable n'est nécessaire. Les fiches sont intuitives et accessibles.",
    sec04Step1Num: "1",
    sec04Step1Title: "Ingrédients Précis",
    sec04Step1Desc: "Racines, feuilles, écorces et graines faciles à trouver en herboristerie, magasin bio ou sur les marchés.",
    sec04Step1Footer: "Fournisseurs recommandés inclus",
    sec04Step2Num: "2",
    sec04Step2Title: "Préparation Détaillée",
    sec04Step2Desc: "Durée d'ébullition exacte, proportions rigoureuses et choix du récipient décrits simplement.",
    sec04Step2Footer: "Réussite assurée même pour les néophytes",
    sec04Step3Num: "3",
    sec04Step3Title: "Techniques d'Application Concrètes",
    sec04Step3Desc: "Infusions concentrées, teintures mères, baumes cutanés, compresses tièdes et sirops.",
    sec04Step3Footer: "Formats variés de remèdes naturels",

    // Section 05
    sec05Tag: "ACCÈS À VIE",
    sec05Title: "Obtenez un accès durable aux archives historiques ancestrales, techniques, recettes, remèdes naturels et ressources naturelles – guérison de l'intérieur",
    sec05Badge: "Licence Officielle Web-App · Accès Spécial Unique",
    sec05PriceCaption: "",
    sec05PriceTag: "33 €",
    sec05Condition1: "Paiement unique.",
    sec05Condition2: "Pas d'abonnements mensuels.",
    sec05Condition3: "Aucun coût supplémentaire ultérieur.",
    sec05Cta: "JE VEUX ACCÉDER AUX MANUSCRITS MAINTENANT",
    sec05Ssl: "Paiement Chiffré SSL 256-Bit",
    sec05InstantCode: "Code d'activation immédiat par e-mail",
    sec05BelowMarker: "",
    sec05SealDays: "15 JOURS",
    sec05SealWord: "GARANTIE",
    sec05SealProtection: "100% SÉCURISÉ",
    sec05SealCaption: "",
    sec05GuaranteeTitle: "Garantie de Satisfaction – Remboursement Intégral",
    sec05GuaranteeDesc1: "Testez pendant 15 jours sans le moindre risque. Accédez au portail.",
    sec05GuaranteeDesc2: "Vous pouvez demander un remboursement complet sous 15 jours.",
    sec05GuaranteeExtra: "Si pour quelque raison que ce soit vous n'étiez pas conquis(e), un simple courriel à notre support entraînera le remboursement immédiat de vos 33 €.",

    // Section 06
    sec06Tag: "06 / QUESTIONS FRÉQUEMMENT POSÉES",
    sec06Title: "L'essentiel en toute transparence.",
    faqItems: [
      {
        question: "La plateforme apprend-elle à guérir des maladies graves ?",
        answer: "La plateforme transmet des savoirs ancestraux précieux pour soutenir, prévenir et soulager divers troubles chroniques, venant en précieux renfort d'un suivi médical qualifié."
      },
      {
        question: "Où se procurer les plantes médicinales ?",
        answer: "La grande majorité des plantes, racines et graines cataloguées dans les écrits de 1910 s'achètent aisément en herboristerie, pharmacie spécialisée ou auprès de boutiques certifiées en ligne. L'application intègre une liste d'achat vérifiée pour chaque recette."
      },
      {
        question: "Comment reçois-je l'accès ?",
        answer: "Immédiatement après validation du règlement sécurisé sur Hotmart, vous recevez un courriel contenant vos identifiants et le lien direct vers la plateforme en ligne."
      },
      {
        question: "Puis-je l'utiliser sur mon smartphone ?",
        answer: "Oui, parfaitement. L'ensemble de la plateforme a été pensé pour téléphones mobiles et tablettes. Elle fonctionne sur tout navigateur mobile (y compris les navigateurs intégrés de WhatsApp, Instagram et Facebook) sans saturer l'espace de votre appareil."
      }
    ],
    finalCallout: "Prenez aujourd'hui la décision d'une vie plus consciente et naturelle.",
    finalDesc: "Bénéficiez d'un accès à vie immédiat à plus de 300 manuscrits et formules éprouvées de l'année 1910.",
    finalCta: "Je veux les manuscrits maintenant !",
    finalGuaranteePill: "Garantie satisfait ou remboursé 15 jours · Paiement unique 33 €",
    footerOrg: "Naturopathie · Groupe de Méthodes Naturelles de Guérison",
    footerDisclaimer: "Contenu informatif et historique. Ne remplace en aucun cas un avis, diagnostic ou traitement médical. Consultez toujours un praticien qualifié.",
    legalNotice: "Mentions Légales",
    legalRedirectPart1: "",
    legalRedirectPart2: "",
    copyright: "2026 Naturopathie · Groupe de Méthodes Naturelles de Guérison",

    // Sticky Bar
    stickyOneTime: "Paiement unique",
    stickyGuarantee: "15 jours de garantie",
    stickyCta: "Accéder au Portail"
  }
};
