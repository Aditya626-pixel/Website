"use client"

export function SiteNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#top" className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-foreground" />
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-foreground">
            Synapse / 001
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#story"
            className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            The Story
          </a>
          <a
            href="#closing"
            className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Epilogue
          </a>
          <a
            href="#"
            className="font-mono text-xs uppercase tracking-[0.18em] text-foreground"
          >
            Read Paper →
          </a>
        </nav>
      </div>
    </header>
  )
}
