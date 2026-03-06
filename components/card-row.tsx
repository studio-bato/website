import { Link } from "@/i18n/navigation";
import Image from "next/image";

interface CardRowProps {
  src: string;
  alt: string;
  href: string;
  children: React.ReactNode;
}
export function CardRow({ src, alt, href, children }: CardRowProps) {
  return (
    <Link href={href} className="group cursor-pointer">
      <div className="flex flex-col w-full">
        <div className="relative aspect-square overflow-hidden w-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="pt-4">{children}</div>
      </div>
    </Link>
  );
}
