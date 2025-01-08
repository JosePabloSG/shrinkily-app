import Sidebar from "@/components/layout/sidebar/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 md:ml-64 overflow-auto">
        {children}
      </main>
    </div>
  )
}