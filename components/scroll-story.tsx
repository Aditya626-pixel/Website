"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"

const chapters = [
  {
    id: "01",
    eyebrow: "Chapter 01 — Input",
    title: "It begins with a number.",
    body:
      "A pixel. A token. A heartbeat. Whatever the world hands us, the network sees only numbers — values flowing into a row of waiting neurons, indifferent and bright.",
  },
  {
    id: "02",
    eyebrow: "Chapter 02 — Weights",
    title: "Connections are opinions.",
    body:
      "Every line between neurons carries a weight: a quiet bias, a learned conviction. Strong connections amplify. Weak ones whisper. Together, they decide what matters.",
  },
  {
    id: "03",
    eyebrow: "Chapter 03 — Hidden Layer",
    title: "Somewhere in the middle, meaning forms.",
    body:
      "Deep inside, the signal twists through nonlinear gates. Edges become shapes. Shapes become objects. Sounds become syllables. Patterns rise from noise like islands.",
  },
  {
    id: "04",
    eyebrow: "Chapter 04 — Activation",
    title: "Some neurons fire. Most stay quiet.",
    body:
      "Activation is a kind of attention — a decision about what to forward and what to forget. The model is not remembering everything. It is choosing.",
  },
  {
    id: "05",
    eyebrow: "Chapter 05 — Output",
    title: "And then, a guess.",
    body:
      "At the far end of the network, a single answer crystallizes. A label. A word. A prediction. It is wrong, at first, almost always — and that is exactly the point.",
  },
  {
    id: "06",
    eyebrow: "Chapter 06 — Learning",
    title: "Error is the teacher.",
    body:
      "The gap between guess and truth flows backward through every weight, nudging each one a little. Repeat ten million times. That, in the end, is how a machine learns to think.",
  },
]

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <section id="story" ref={containerRef} className="relative bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
        {/* Sticky visual */}
        <div className="sticky top-0 hidden h-screen w-full md:block">
          <NetworkVisual progress={scrollYProgress} />
        </div>

        {/* Mobile visual: pinned but smaller */}
        <div className="sticky top-0 z-0 h-[60vh] w-full md:hidden">
          <NetworkVisual progress={scrollYProgress} />
        </div>

        {/* Chapters generate the scroll length */}
        <div className="relative z-10 -mt-[60vh] flex flex-col md:mt-0">
          {chapters.map((c, i) => (
            <Chapter key={c.id} {...c} index={i} total={chapters.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Chapter({
  eyebrow,
  title,
  body,
  index,
}: {
  eyebrow: string
  title: string
  body: string
  index: number
  total: number
}) {
  return (
    <article className="pointer-events-auto flex min-h-screen items-center px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-md"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="mt-5 text-balance font-serif text-3xl leading-tight tracking-tight md:text-5xl">
          {title}
        </h2>
        <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {body}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-12 bg-foreground/30" />
        </div>
      </motion.div>
    </article>
  )
}

/* ---------------- The animated network visual ---------------- */

const LAYERS = [
  { x: 0.18, count: 5 },
  { x: 0.38, count: 7 },
  { x: 0.58, count: 7 },
  { x: 0.78, count: 4 },
]

function NetworkVisual({ progress }: { progress: MotionValue<number> }) {
  // The traveling "thought" — moves left → right across layers as you scroll
  const dotX = useTransform(progress, [0, 1], ["12%", "84%"])
  // Vertical wander to feel alive
  const dotY = useTransform(
    progress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["50%", "38%", "62%", "44%", "56%", "50%"],
  )
  const dotScale = useTransform(
    progress,
    [0, 0.15, 0.5, 0.85, 1],
    [0.6, 1, 1.4, 1.1, 0.9],
  )
  const labelOpacity = useTransform(progress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
  const stageLabel = useTransform(progress, (p) => {
    if (p < 0.16) return "INPUT"
    if (p < 0.34) return "WEIGHTS"
    if (p < 0.52) return "HIDDEN"
    if (p < 0.68) return "ACTIVATION"
    if (p < 0.86) return "OUTPUT"
    return "LEARNING"
  })

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* SVG network */}
      <svg
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {/* connections */}
        {LAYERS.slice(0, -1).flatMap((layer, li) =>
          Array.from({ length: layer.count }).flatMap((_, i) =>
            Array.from({ length: LAYERS[li + 1].count }).map((__, j) => {
              const x1 = layer.x * 1000
              const y1 = nodeY(i, layer.count)
              const x2 = LAYERS[li + 1].x * 1000
              const y2 = nodeY(j, LAYERS[li + 1].count)
              return (
                <line
                  key={`${li}-${i}-${j}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth={0.6}
                  className="text-foreground/20"
                />
              )
            }),
          ),
        )}

        {/* nodes */}
        {LAYERS.flatMap((layer, li) =>
          Array.from({ length: layer.count }).map((_, i) => (
            <NodeCircle
              key={`n-${li}-${i}`}
              cx={layer.x * 1000}
              cy={nodeY(i, layer.count)}
              progress={progress}
              layerIndex={li}
              totalLayers={LAYERS.length}
            />
          )),
        )}
      </svg>

      {/* the traveling thought */}
      <motion.div
        style={{ left: dotX, top: dotY, scale: dotScale }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative">
          <div className="absolute inset-0 -m-8 rounded-full bg-[var(--accent-ink)] opacity-30 blur-2xl" />
          <div className="absolute inset-0 -m-4 rounded-full bg-[var(--accent-ink)] opacity-50 blur-md" />
          <div className="relative h-3 w-3 rounded-full bg-[var(--accent-ink)] shadow-[0_0_24px_4px_var(--accent-ink)]" />
        </div>
      </motion.div>

      {/* stage label */}
      <motion.div
        style={{ opacity: labelOpacity }}
        className="absolute bottom-10 left-10 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        <div>Signal Stage</div>
        <motion.div className="mt-1 text-foreground">{stageLabel}</motion.div>
      </motion.div>

      {/* progress bar */}
      <div className="absolute bottom-10 right-10 hidden w-40 md:block">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Forward Pass
        </div>
        <div className="mt-2 h-px w-full bg-foreground/15">
          <motion.div
            style={{ scaleX: progress, transformOrigin: "0% 50%" }}
            className="h-px w-full bg-foreground"
          />
        </div>
      </div>
    </div>
  )
}

function nodeY(i: number, count: number) {
  const top = 120
  const bottom = 580
  if (count === 1) return (top + bottom) / 2
  return top + (i * (bottom - top)) / (count - 1)
}

function NodeCircle({
  cx,
  cy,
  progress,
  layerIndex,
  totalLayers,
}: {
  cx: number
  cy: number
  progress: MotionValue<number>
  layerIndex: number
  totalLayers: number
}) {
  // Each layer "lights up" when the thought passes through it
  const layerStart = layerIndex / totalLayers
  const layerEnd = (layerIndex + 1) / totalLayers
  const opacity = useTransform(
    progress,
    [
      Math.max(0, layerStart - 0.05),
      layerStart + 0.02,
      layerEnd,
      Math.min(1, layerEnd + 0.15),
    ],
    [0.25, 1, 1, 0.35],
  )
  const r = useTransform(
    progress,
    [layerStart - 0.05, layerStart + 0.03, layerEnd],
    [4, 7, 5],
  )

  return (
    <>
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        style={{ opacity }}
        className="fill-foreground"
      />
      <circle
        cx={cx}
        cy={cy}
        r={11}
        className="fill-none stroke-foreground/20"
        strokeWidth={0.5}
      />
    </>
  )
}
