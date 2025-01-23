import { Suspense } from 'react'
import { getUrlsWithTagsByUser } from "@/server/queries"
import { UrlGrid } from "@/components/urls/url-grid"
import { Toolbar } from "@/components/dashboard/toolbar"

const DashboardUrls = async () => {
  const data = await getUrlsWithTagsByUser()

  if (!data || !data.urls) {
    return <div>Error loading data</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading toolbar...</div>}>
        <Toolbar tags={data.tags} />
      </Suspense>
      <UrlGrid urls={data.urls} tags={data.tags} />
    </div>
  )
}

export default DashboardUrls

