"use client"

import { motion } from "framer-motion"

export function Closing() {
  return (
    <section
      id="closing"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32"
    >
      <div className="mx-auto w-full max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          Epilogue
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-8 text-balance font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl"
        >
          Intelligence isn&apos;t a thing.{" "}
          <span className="italic text-[var(--accent-ink)]">
            It&apos;s a direction.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Every model you&apos;ve ever used began as a hum of random numbers and
          ended, after countless gentle corrections, as something startlingly
          close to understanding. The story keeps writing itself — one gradient
          at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-14 flex flex-col items-center gap-6"
        >
          <a
            href="#top"
            className="group inline-flex items-center gap-3 rounded-full border border-foreground/15 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <span>Read again</span>
            <span className="transition-transform group-hover:-translate-y-0.5">
              ↑
            </span>
          </a>
        </motion.div>
      </div>

      <footer className="mt-32 flex w-full max-w-6xl items-center justify-between border-t border-foreground/10 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        <span>Synapse Journal</span>
        <span className="hidden md:block">A scroll essay on AI</span>
        <span>© 2026</span>
      </footer>
    </section>
  )
}
