export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground leading-tight text-balance">
              Built for the artists who refuse to be ordinary
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-muted-foreground leading-relaxed text-lg">
              Founded in 2018, Sonance emerged from the conviction that great
              music deserves more than an algorithm. We are a community of
              creators, curators, and believers in the transformative power of
              sound.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every release on our label meets an uncompromising standard for
              sonic excellence. We champion the sounds shaping tomorrow,
              providing independent spirit with worldwide distribution.
            </p>

            <div className="grid grid-cols-2 gap-px bg-border mt-4">
              <div className="bg-background p-6">
                <p className="font-display text-3xl text-foreground">50+</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Artists on roster
                </p>
              </div>
              <div className="bg-background p-6">
                <p className="font-display text-3xl text-foreground">200+</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Total releases
                </p>
              </div>
              <div className="bg-background p-6">
                <p className="font-display text-3xl text-foreground">12M+</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Global streams
                </p>
              </div>
              <div className="bg-background p-6">
                <p className="font-display text-3xl text-foreground">40+</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Countries reached
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
