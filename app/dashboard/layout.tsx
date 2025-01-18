import Sidebar from "@/components/layout/sidebar/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Desktop Layout */}
      <div className="hidden md:flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="grid grid-rows-[auto,1fr] h-screen md:hidden">
        <Sidebar />
        <main className="overflow-auto p-8 pt-20">
          {children}
        </main>
      </div>
    </div>
  )
}