import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Chrome } from "@/components/chrome";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { description } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

const title = "TMS ТВ — интернет-телевидение в Израиле | Каналы и VOD";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s — TMS ТВ",
  },
  description,
  applicationName: "TMS ТВ",
  openGraph: {
    title,
    description,
    locale: "ru_IL",
    type: "website",
    siteName: "TMS ТВ",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" dir="ltr" className={`${manrope.variable} h-full`} suppressHydrationWarning>
      <body
        className={`${manrope.className} min-h-full pb-[calc(8.75rem+env(safe-area-inset-bottom))] antialiased md:pb-24`}
        style={{
          fontFamily: '"TMS Shekel", var(--font-manrope), "Segoe UI", Arial, sans-serif',
        }}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var raw=localStorage.getItem("tms-a11y");if(!raw)return;var p=JSON.parse(raw);var r=document.documentElement;if(p.scale&&p.scale!==100)r.style.fontSize=p.scale+"%";if(p.contrast)r.dataset.a11yContrast="high";if(p.links)r.dataset.a11yLinks="on";if(p.readable)r.dataset.a11yReadable="on";if(p.motion)r.dataset.a11yMotion="reduce";}catch(e){}})();`,
          }}
        />
        <a className="skip-link" href="#content">
          К содержанию
        </a>
        <Header />
        {children}
        <Footer />
        <Chrome />
      </body>
    </html>
  );
}
