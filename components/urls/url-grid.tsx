'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import CardUrl from "@/components/urls/card-url"
import { Tags, Urls, UrlTags } from "@prisma/client"
import CardUrlSkeleton from '../skeletons/card-url-skeleton'
import { LinkIcon, PlusIcon } from 'lucide-react'
import CreateUrl from './create-url'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'

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

  if (filteredUrls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px] rounded-lg border-2 border-dashed border-gray-200 bg-white">
        <div className="rounded-full bg-gray-50 p-4 mb-4">
          <LinkIcon className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No URLs yet</h3>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">
          Create your first shortened URL to start tracking clicks and managing your links.
        </p>
        <CreateUrl tags={tags}>
          <Button variant={'primary'}>
            <PlusIcon size={16} className="mr-2" />
            <span>Create URL</span>
          </Button>
        </CreateUrl>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="wait">
        {filteredUrls.map((url, index) => (
          <motion.div
            key={url.id}
            layout
            initial={{ opacity: 0, x: 40, y: 40, scale: 1.1 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, y: -40, scale: 0.95 }}
            transition={{ 
              duration: 0.4,
              ease: [0.2, 0, 0.3, 1],
              delay: index * 0.05
            }}
          >
            <CardUrl
              urlInfo={url}
              urlsTags={url.tags}
              tagsInfo={tags}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

