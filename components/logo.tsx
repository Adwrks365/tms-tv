import Image from "next/image";
import Link from "next/link";

export function Logo({
  priority = false,
  height = 52,
}: {
  priority?: boolean;
  height?: number;
}) {
  return (
    <Link
      href="/"
      aria-label="TMS ТВ — Телевидение онлайн"
      className="inline-flex shrink-0 items-center rounded-md"
    >
      <Image
        src="/logo.png"
        alt=""
        width={861}
        height={282}
        sizes="180px"
        priority={priority}
        style={{ width: "auto", height }}
      />
    </Link>
  );
}
