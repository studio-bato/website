import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="mx-auto flex gap-4 items-center justify-center">
        <div className="font-display text-2xl tracking-tight text-foreground">
          Admin
        </div>
        <Link
          href="/admin/artists"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Artists
        </Link>
        <Link
          href="/admin/releases"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Releases
        </Link>
      </div>
      {children}
    </div>
  );
}
