import Link from "next/link";
import Image from "next/image";

interface CardRowProps {
  src: string;
  alt: string;
  href: string;
  children: React.ReactNode;
}
export function CardRow({ src, alt, href, children }: CardRowProps) {
  return (
    <Link href={href} className="group cursor-pointer hover:bg-card/50">
      <div className="flex flex-col">
        <div className="relative aspect-[1/1] overflow-hidden w-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="pt-4">{children}</div>
      </div>
    </Link>
  );
}
