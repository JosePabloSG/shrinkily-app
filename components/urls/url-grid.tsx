'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import CardUrl from "@/components/urls/card-url"
import { Tags, Urls, UrlTags } from "@prisma/client"
import CardUrlSkeleton from '../skeletons/card-url-skeleton'

interface UrlGridProps {
  urls: (Urls & { tags: UrlTags[] })[]
  tags: Tags[]
}

export function UrlGrid({ urls, tags }: UrlGridProps) {
  const searchParams = useSearchParams()
  const [filteredUrls, setFilteredUrls] = useState(urls)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const filterUrls = () => {
      setIsLoading(true)
      const shortUrl = searchParams.get('shortUrl')
      const tag = searchParams.get('tag')

      const filtered = urls.filter((url) => {
        const matchesShortUrl = !shortUrl || url.shortUrl.includes(shortUrl)
        const matchesTags = !tag || url.tags.some(urlTag => urlTag.tagId === tag)
        return matchesShortUrl && matchesTags
      })

      setFilteredUrls(filtered)
      setIsLoading(false)
    }

    filterUrls()
  }, [urls, searchParams])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <CardUrlSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredUrls.map((url) => (
        <CardUrl
          key={url.id}
          urlInfo={url}
          urlsTags={url.tags}
          tagsInfo={tags}
        />
      ))}
    </div>
  )
}

