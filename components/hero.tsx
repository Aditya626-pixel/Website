"use client"

import { motion } from "framer-motion"

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24"
    >
      {/* subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          A Scroll Essay · Issue 001
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          className="mt-8 text-balance font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
        >
          The anatomy of a{" "}
          <span className="italic text-[var(--accent-ink)]">thinking</span>{" "}
          machine.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Scroll, and watch a single point of light fall through the layers of a
          neural network — becoming, in the end, something we call intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll to begin
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-px bg-foreground/40"
          />
        </motion.div>
      </div>

      {/* footer meta */}
      <div className="absolute bottom-6 left-0 right-0 z-10 mx-auto flex max-w-6xl items-end justify-between px-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        <span>Est. 6 min read</span>
        <span className="hidden md:block">Written with curiosity</span>
        <span>2026 / 05</span>
      </div>
    </section>
  )
}
