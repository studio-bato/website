import { Instagram, Mail, Anchor } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[60dvh] flex flex-col items-center justify-center px-6 py-24 lg:py-32">
        <p className="text-sm text-muted-foreground tracking-widest uppercase mb-8">
          Contact
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-[6rem] leading-[0.9] text-foreground text-center tracking-tight text-balance">
          Get in
          <br />
          touch
        </h1>
        <p className="mt-8 text-muted-foreground text-center max-w-lg leading-relaxed">
          Want to produce or distribute your music with us? Interested in an
          artist residency on the boat? We would love to hear from you.
        </p>
      </section>

      {/* Contact methods */}
      <section className="py-24 lg:py-32 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            <Link
              href="https://instagram.com/studio.bato"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background p-10 sm:p-16 flex flex-col gap-6 group hover:bg-muted/30 transition-colors"
            >
              <Instagram className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground">
                Instagram
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                DM us on Instagram. It is the fastest way to start a
                conversation — we check our messages daily.
              </p>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                @studio.bato
              </p>
            </Link>

            <Link
              href="mailto:hello@studiobato.com"
              className="bg-background p-10 sm:p-16 flex flex-col gap-6 group hover:bg-muted/30 transition-colors"
            >
              <Mail className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground">
                Email
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                For project proposals, residency applications, or any detailed
                inquiry, drop us a line by email.
              </p>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                hello@studiobato.com
              </p>
            </Link>
          </div>

          <div className="mt-16 flex items-center gap-4 text-muted-foreground">
            <Anchor className="h-4 w-4" />
            <p className="text-sm">
              Bordeaux, France — moored on the Garonne
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
