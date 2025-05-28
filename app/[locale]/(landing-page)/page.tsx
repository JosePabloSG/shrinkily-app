import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Docs from "@/components/sections/docs";
import Features from "@/components/sections/features";
import Hero from "@/components/sections/hero";

export default function Page() {
  return (
    <>
      <Hero />
      <Features />
      <Docs />
      <About />
      <Contact />
    </>
  )
}