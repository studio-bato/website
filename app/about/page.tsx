import {
  Anchor,
  Music,
  Mic,
  SlidersHorizontal,
  Radio,
  Share2,
  Video,
  Ship,
} from "lucide-react";

export default function About() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[60dvh] flex flex-col items-center justify-center px-6 py-24 lg:py-32">
        <p className="text-sm text-muted-foreground tracking-widest uppercase mb-8">
          About Us
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-[6rem] leading-[0.9] text-foreground text-center tracking-tight text-balance">
          A studio
          <br />
          on the water
        </h1>
        <p className="mt-8 text-muted-foreground text-center max-w-lg leading-relaxed">
          Studio Bato is an independent music studio based on a boat in
          Bordeaux, France. We produce, record, and share music that moves.
        </p>
      </section>

      {/* Story */}
      <section className="py-24 lg:py-32 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <Anchor className="h-8 w-8 text-muted-foreground mb-6" />
              <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground leading-tight text-balance">
                Born on the river, built for the music
              </h2>
            </div>

            <div className="flex flex-col gap-8">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Studio Bato was founded with a simple idea: create a space where
                music and life converge, away from the noise of the city. Our
                boat, moored on the Garonne in Bordeaux, is both our home and
                our creative engine.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We are a small, dedicated team of producers, engineers, and
                music lovers. We work closely with every artist who comes
                aboard — from the first demo to the final master, from the album
                artwork to the release strategy. We believe great music deserves
                a complete vision, and we are here to make it happen.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Being independent means we answer to the music, not to a
                boardroom. Every project we take on is a choice, not an
                obligation. That freedom is what allows us to stay honest,
                experimental, and deeply invested in the artists we work with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 lg:py-32 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16">
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground">
              What we do
            </h2>
            <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed text-lg">
              From the first note to the final stream, we handle every step of
              the journey. All from the boat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-background p-10 sm:p-12 flex flex-col gap-4"
              >
                <service.icon className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-display text-xl text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Residency */}
      <section className="py-24 lg:py-32 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <Ship className="h-8 w-8 text-muted-foreground mb-6" />
              <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground leading-tight text-balance">
                Artist Residency
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
                Come live and create on the boat. Leave with a finished project
                and a show under your belt.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <p className="text-muted-foreground leading-relaxed">
                Our residency program invites artists to step aboard and
                dedicate themselves entirely to their creative work. For a set
                period, you live on the boat, with full access to the studio,
                the equipment, and our team. No distractions, no commute — just
                you and the music, rocked by the river.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you are writing an album, developing a live performance,
                experimenting with new sounds, or working on a cross-disciplinary
                project, the residency gives you the time and space to go deep.
                Our producers and engineers are available to collaborate, or to
                simply let you work in peace.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every residency ends with a live show on the boat, open to the
                public. It is the culmination of your time here — a chance to
                share what you have built with an audience, in an intimate and
                unforgettable setting on the water.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border mt-16">
            {residencyDetails.map((detail) => (
              <div key={detail.label} className="bg-background p-6">
                <p className="font-display text-3xl text-foreground">
                  {detail.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {detail.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const services = [
  {
    icon: Music,
    title: "Production",
    description:
      "We produce music from scratch or help shape your existing ideas into fully realized tracks. Our producers bring taste, technique, and a deep love for sound.",
  },
  {
    icon: Mic,
    title: "Recording",
    description:
      "Our boat studio is equipped for professional recording — vocals, instruments, live sessions. Compact, treated, and surprisingly quiet for a floating space.",
  },
  {
    icon: SlidersHorizontal,
    title: "Mixing & Mastering",
    description:
      "We mix and master every release in-house, ensuring a polished, cohesive sound that translates across every speaker and platform.",
  },
  {
    icon: Radio,
    title: "Distribution",
    description:
      "We handle distribution to all major streaming platforms — Spotify, Apple Music, Deezer, and beyond. Your music, everywhere it needs to be.",
  },
  {
    icon: Share2,
    title: "Communication",
    description:
      "From social media strategy to press outreach, we help artists build their audience and tell their story. We craft the narrative around the music.",
  },
  {
    icon: Video,
    title: "Video Clips",
    description:
      "We produce music videos and visual content — from concept to final cut. The river, the boat, and the city provide a unique backdrop.",
  },
];

const residencyDetails = [
  { value: "2–4", label: "Weeks on board" },
  { value: "24/7", label: "Studio access" },
  { value: "1", label: "Live show included" },
  { value: "100%", label: "Your project, your vision" },
];
