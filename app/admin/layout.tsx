import Link from "next/link";
import { getSession } from "./session";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "./actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await getSession();

  if (!authenticated) {
    return (
      <main className="min-h-[60dvh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Admin</h1>
        <form action={login} className="flex items-center gap-2 mt-4">
          <Input
            type="password"
            name="password"
            placeholder="Enter password to access admin"
            className=""
          />
          <Button className="" type="submit">
            Login
          </Button>
        </form>
      </main>
    );
  }

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
