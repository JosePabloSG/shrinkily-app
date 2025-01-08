import Footer from "@/components/layout/footer/footer"
import { Navbar } from "@/components/layout/navbar"

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}