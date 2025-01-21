import Image from "next/image"
import { Suspense } from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-dull-lavender-50 relative">
      {/* Background images with loading state */}
      <Suspense fallback={<div className="absolute inset-0 bg-dull-lavender-50" />}>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/blob-scene-desktop.svg"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="hidden md:block"
            priority
          />
          <Image
            src="/images/blob-scene-mobile.svg"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="block md:hidden"
            priority
          />
        </div>
      </Suspense>

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </main>
    </div>
  )
}

