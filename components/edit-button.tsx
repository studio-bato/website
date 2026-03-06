import Link from "next/link";
import { Pencil } from "lucide-react";
import { getSession } from "@/app/[locale]/admin/session";
import { Suspense } from "react";

export function EditButton({ url }: { url: string }) {
  return (
    <Suspense>
      <EditButtonSuspense url={url} />
    </Suspense>
  );
}

async function EditButtonSuspense({ url }: { url: string }) {
  const isAdmin = await getSession();
  if (!isAdmin) return null;

  return (
    <Link
      href={url}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <Pencil className="h-3.5 w-3.5" />
      Edit
    </Link>
  );
}
