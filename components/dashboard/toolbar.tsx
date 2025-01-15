'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreateUrl } from "@/components/urls/create-url"
import { CreateTag } from "@/components/tags/create-tag"
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
      <div className="flex flex-wrap gap-4">
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
            <span>Filter Tags</span>
          </Button>
        </TagFilter>
        {selectedTag && (
          <Button variant="outline" onClick={handleTagClear} className="flex items-center gap-2">
            <XIcon size={16} />
            <span>Clear Filter</span>
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        <CreateUrl tags={tags}>
          <Button className="bg-blue-violet-600 hover:bg-blue-violet-700">
            <PlusIcon size={16} />
            <span>Create URL</span>
          </Button>
        </CreateUrl>
        <CreateTag tagsCreated={tags}>
          <Button className="bg-blue-violet-600 hover:bg-blue-violet-700">
            <PlusIcon size={16} />
            <span>Create Tag</span>
          </Button>
        </CreateTag>
      </div>
    </div>
  )
}

