import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Docs from "@/components/sections/docs";
import Features from "@/components/sections/features";
import Hero from "@/components/sections/hero";

export default function Page() {
  return (
    <div className="space-y-32">
      <section id="home">
        <Hero />
      </section>

      <section id="features" className="scroll-mt-20">
        <Features />
      </section>

      <section id="docs" className="scroll-mt-20">
        <Docs />
      </section>

      <section id="about" className="scroll-mt-20">
        <About />
      </section>

      <section id="contact" className="scroll-mt-20">
        <Contact />
      </section>
    </div>
  )
}