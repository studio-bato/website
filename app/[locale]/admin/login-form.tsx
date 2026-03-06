"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type LoginResult = { success: boolean } | undefined;

export function LoginForm({
  loginAction,
}: {
  loginAction: (formData: FormData) => Promise<{ success: boolean }>;
}) {
  const [state, action, pending] = useActionState<LoginResult, FormData>(
    (_, formData) => loginAction(formData),
    undefined
  );

  return (
    <form action={action} className="flex flex-col items-center gap-2 mt-4">
      <div className="flex items-center gap-2">
        <Input
          type="password"
          name="password"
          placeholder="Enter password to access admin"
        />
        <Button type="submit" disabled={pending}>
          Login
        </Button>
      </div>
      {state && !state.success && (
        <p className="text-sm text-destructive">Incorrect password.</p>
      )}
    </form>
  );
}
