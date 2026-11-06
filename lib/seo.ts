import { site } from "@/lib/site";

export const siteUrl = "https://tmstv.co.il";

export const seoTitle =
  "TMS ТВ — Израильское премиум IPTV | 400+ каналов и архив 14 дней";

export const seoDescription =
  "Подключение качественного ТВ в Израиле. Более 400 каналов в HD/4K, архив передач на 14 дней, библиотека фильмов VOD. До 5 устройств на подписку. Поддержка 24/7.";

export const seoKeywords = [
  "IPTV Израиль",
  "ТВ в Израиле",
  "TMS TV",
  "телевидение на русском Израиль",
  "подключить ТВ",
  "VOD фильмы",
  "архив передач",
] as const;

export function structuredDataJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: site.name,
        url: siteUrl,
        telephone: site.phoneTel,
        areaServed: {
          "@type": "Country",
          name: "Israel",
        },
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service`,
        name: "IPTV & VOD Streaming Service Israel",
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: {
          "@type": "Country",
          name: "Israel",
        },
        offers: {
          "@type": "Offer",
          price: "80.00",
          priceCurrency: "ILS",
          url: siteUrl,
        },
      },
    ],
  };
}

export function jsonLdScriptHtml(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
