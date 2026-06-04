import { Hero } from "@/components/hero"
import { ScrollStory } from "@/components/scroll-story"
import { Closing } from "@/components/closing"
import { SiteNav } from "@/components/site-nav"
import { ScrollOrb } from "@/components/scroll-orb"

export default function Page() {
  return (
    <main className="relative bg-background text-foreground">
      <ScrollOrb />
      <SiteNav />
      <Hero />
      <ScrollStory />
      <Closing />
    </main>
  )
}
