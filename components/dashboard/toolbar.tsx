'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreateUrl } from "@/components/urls/create-url"
import { PlusIcon, SearchIcon, FilterIcon, XIcon } from 'lucide-react'
import { Tags } from '@prisma/client'
import { TagFilter } from '../tags/tag-filter'

interface ToolbarProps {
  tags: Tags[]
}

export function Toolbar({ tags }: ToolbarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [shortUrl, setShortUrl] = useState(searchParams.get('shortUrl') || '')
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '')

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (shortUrl) params.set('shortUrl', shortUrl)
    else params.delete('shortUrl')
    if (selectedTag) params.set('tag', selectedTag)
    else params.delete('tag')
    router.push(`?${params.toString()}`)
  }, [shortUrl, selectedTag, router, searchParams])

  const handleTagSelect = (tagId: string) => {
    setSelectedTag(tagId)
  }

  const handleTagClear = () => {
    setSelectedTag('')
  }

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex justify-end">
          <CreateUrl tags={tags}>
            <Button variant={'primary'}>
              <PlusIcon size={16} className="mr-2" />
              <span>Create URL</span>
            </Button>
          </CreateUrl>
        </div>
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <Input
            placeholder="Search by Short URL"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <TagFilter tags={tags} onSelect={handleTagSelect} selectedTag={selectedTag}>
          <Button variant="outline" className="flex items-center gap-2">
            <FilterIcon size={16} />
            <span className="hidden sm:inline">Filter Tags</span>
          </Button>
        </TagFilter>
        {selectedTag && (
          <Button variant="outline" onClick={handleTagClear} className="flex items-center gap-2">
            <XIcon size={16} />
            <span className="hidden sm:inline">Clear Filter</span>
          </Button>
        )}
      </div>

    </div>
  )
}

