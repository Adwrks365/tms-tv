import Link from "next/link";
import type { ReactNode } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { site, whatsappHref } from "@/lib/site";

const variants = {
  primary:
    "bg-[linear-gradient(100deg,#0b4ec8_0%,#1a74f5_58%,#1493e6_100%)] text-white shadow-[0_14px_34px_-16px_rgba(20,110,230,0.95)] hover:brightness-110",
  whatsapp:
    "bg-[#25D366] text-white shadow-[0_14px_34px_-16px_rgba(37,211,102,0.55)] hover:bg-[#20BD5A]",
  ghost:
    "border border-white/25 bg-white/5 text-white hover:border-white/45 hover:bg-white/10",
  light: "bg-white text-navy-950 hover:bg-cyan-50",
  navy: "bg-navy-950 text-white hover:bg-navy-800",
} as const;

type Variant = keyof typeof variants;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-semibold transition duration-200 active:scale-[0.98] ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        data-ui="button"
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
        <span className="sr-only"> (откроется в новом окне)</span>
      </a>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} data-ui="button" className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} data-ui="button" className={classes}>
      {children}
    </a>
  );
}

export function WhatsAppButton({
  message,
  children,
  variant = "primary",
  className = "",
}: {
  message: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <ButtonLink
      href={whatsappHref(message)}
      external
      variant={variant}
      className={className}
    >
      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
      {children}
    </ButtonLink>
  );
}

export function PhoneButton({
  variant = "light",
  className = "",
  children,
}: {
  variant?: Variant;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <ButtonLink href={`tel:${site.phoneTel}`} variant={variant} className={className}>
      <Phone className="h-4 w-4 shrink-0" aria-hidden />
      {children ?? site.phoneDisplay}
    </ButtonLink>
  );
}

export function Section({
  id,
  labelledBy,
  className = "",
  children,
}: {
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-24 py-20 md:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl pl-14 pr-5 xl:px-5">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  id,
  light = false,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  id: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className={`text-sm font-semibold ${light ? "text-cyan-200" : "text-blue-700"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={`text-3xl font-extrabold tracking-tight md:text-4xl ${eyebrow ? "mt-3" : ""} ${light ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {text ? (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-slate-200" : "text-muted"}`}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
