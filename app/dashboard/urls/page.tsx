import { Suspense } from 'react'
import { getUrlsWithTagsByUser } from "@/server/queries"
import CardUrl from "@/components/urls/card-url"
import { Toolbar } from "@/components/dashboard/toolbar"

const DashboardUrls = async ({ searchParams }: { searchParams: { shortUrl?: string; tags?: string } }) => {
  const data = await getUrlsWithTagsByUser()
  if (!data || !data.urls) {
    return <div>Error loading data</div>
  }

  const shortUrlFilter = searchParams.shortUrl?.toLowerCase()
  const tagFilter = searchParams.tags?.split(',').filter(Boolean)

  const filteredUrls = data.urls.filter((url) => {
    const matchesShortUrl = !shortUrlFilter || url.shortUrl.toLowerCase().includes(shortUrlFilter)
    const matchesTags = !tagFilter || tagFilter.length === 0 || tagFilter.every(tagId => url.tags.some(tag => tag.tagId === tagId))
    return matchesShortUrl && matchesTags
  })

  return (
    <div>
      <Suspense fallback={<div>Loading toolbar...</div>}>
        <Toolbar tags={data.tags} />
      </Suspense>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-2">
        {filteredUrls.map((url) => (
          <CardUrl
            key={url.id}
            urlInfo={url}
            urlsTags={url.tags}
            tagsInfo={data.tags}
          />
        ))}
      </div>
    </div>
  )
}

export default DashboardUrls

