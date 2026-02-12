import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center align-center text-muted-foreground">
      <h2>Page not found :/</h2>
      <Link
        href="/"
        className="my-8 inline-flex items-center gap-1.5 text-md text-muted-foreground hover:text-foreground transition-colors border px-4 py-2 rounded-xl "
      >
        Go Home
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
