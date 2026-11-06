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
export default function HomePage() {
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
    </main>
  );
}
