import Sidebar from "@/components/layout/sidebar/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 md:ml-64 pt-20 md:pt-8">
        {children}
      </main>
    </div>
  )
}

