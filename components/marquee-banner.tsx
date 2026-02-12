export function MarqueeBanner() {
  return (
    <div className="border-y border-border py-5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-muted-foreground">
          <span>15+ Artists</span>
          <span className="hidden sm:inline text-border">{"/"}</span>
          <span>20+ Releases</span>
          <span className="hidden sm:inline text-border">{"/"}</span>
          <span>Est. 2018</span>
        </div>
      </div>
    </div>
  );
}
