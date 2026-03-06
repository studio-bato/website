import { getSession } from "./session";
import { logout, login } from "./actions";
import { AdminNav } from "./nav";
import { LoginForm } from "./login-form";
import { Suspense } from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  );
}

async function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const authenticated = await getSession();

  if (!authenticated) {
    return (
      <main className="min-h-[60dvh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Admin</h1>
        <LoginForm loginAction={login} />
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
