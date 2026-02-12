import Link from "next/link";

const footerLinks = {
  Label: [
    { label: "About", href: "/about" },
    { label: "Artists", href: "/artists" },
    { label: "Releases", href: "/releases" },
  ],
  Connect: [
    { label: "Instagram", href: "https://instagram.com/studio.bato" },
    { label: "Youtube", href: "https://www.youtube.com/@studiobato" },
    { label: "Spotify", href: "https://open.spotify.com/playlist/7yFysgG2WnkdMiigB6pJLo?si=f68df9108ec54827&nd=1" },
    { label: "SoundCloud", href: "https://soundcloud.com/studiobato" },
  ],
  Info: [
    { label: "Contact", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <Link
              href="/"
              className="font-display text-xl tracking-tight text-foreground"
            >
              Studio Bato
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Independent boat-made music label
              <br />
              <span className="italic">Bordeaux, France</span>
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                {category}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {"© 2026 StudioBato. All rights reserved."}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
