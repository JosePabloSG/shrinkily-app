export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-dull-lavender-50">
      {/* Top crescent */}
      <div className="h-32 md:h-48 bg-dull-lavender-300 rounded-b-[100%] w-full" />

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative z-10">
        {children}
      </main>

      {/* Bottom crescent */}
      <div className="h-32 md:h-48 bg-dull-lavender-300 rounded-t-[100%] w-full mt-auto" />
    </div>
  )
}