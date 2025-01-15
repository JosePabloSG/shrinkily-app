import { Suspense } from 'react'
import { getUrlsWithTagsByUser } from "@/server/queries"
import CardUrl from "@/components/urls/card-url"
import { Toolbar } from "@/components/dashboard/toolbar"

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

const DashboardUrls = async ({ searchParams }: Props) => {
  const data = await getUrlsWithTagsByUser()

  if (!data || !data.urls) {
    return <div>Error loading data</div>
  }

  const params = await searchParams
  const shortUrl = params.shortUrl
  const tag = params.tag

  console.log("Search Params received:", { shortUrl, tag })

  const filteredUrls = data.urls.filter((url) => {
    const matchesShortUrl = !shortUrl || url.shortUrl.includes(shortUrl)
    const matchesTags = !tag || url.tags.some(urlTag => urlTag.tagId === tag)
    return matchesShortUrl && matchesTags
  })

  console.log("Filtered URLs:", {
    filterParams: { shortUrl, tag },
    count: filteredUrls.length,
    urls: filteredUrls.map(url => ({
      id: url.id,
      shortUrl: url.shortUrl,
      tags: url.tags.map(t => t.tagId)
    }))
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading toolbar...</div>}>
        <Toolbar tags={data.tags} />
      </Suspense>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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

