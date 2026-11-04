import { Archive } from "@/components/archive";
import { Channels } from "@/components/channels";
import { Devices } from "@/components/devices";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { HowTo } from "@/components/how-to";
import { MultiScreen } from "@/components/multi-screen";
import { Pricing } from "@/components/pricing";
import { Support } from "@/components/support";
import { Vod } from "@/components/vod";
import { Why } from "@/components/why";
import { description, plans } from "@/lib/site";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "TMS ТВ",
    serviceType: "Интернет-телевидение",
    areaServed: { "@type": "Country", name: "Israel" },
    telephone: "+972543980048",
    description,
    provider: { "@type": "Organization", name: "TMS ТВ" },
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.period,
      price: plan.price,
      priceCurrency: "ILS",
    })),
  };

  return (
    <main id="content">
      <Hero />
      <Channels />
      <Vod />
      <Archive />
      <Devices />
      <MultiScreen />
      <Pricing />
      <Why />
      <HowTo />
      <Support />
      <Faq />
      <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
