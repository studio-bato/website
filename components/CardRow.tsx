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
    <Link href={href} className="group cursor-pointer py-2 hover:bg-card/50 ">
      <div className="flex items-start space-x-4 lg:space-x-8">
        <div className="relative aspect-[1/1] overflow-hidden w-36 lg:w-96 shrink-0">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </Link>
  );
}
