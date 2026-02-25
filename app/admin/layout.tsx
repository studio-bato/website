import { getSession } from "./session";
import { logout } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "./actions";
import { AdminNav } from "./nav";

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
      <AdminNav logoutAction={logout} />
      {children}
    </div>
  );
}
