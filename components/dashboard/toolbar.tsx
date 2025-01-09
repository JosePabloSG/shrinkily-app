'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreateUrl } from "@/components/urls/create-url"
import { CreateTag } from "@/components/tags/create-tag"
import { PlusIcon, SearchIcon } from 'lucide-react'
import { Tags } from '@prisma/client'

interface ToolbarProps {
  tags: Tags[]
}

export function Toolbar({ tags }: ToolbarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [shortUrl, setShortUrl] = useState(searchParams.get('shortUrl') || '')

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (shortUrl) params.set('shortUrl', shortUrl)
    else params.delete('shortUrl')
    router.push(`?${params.toString()}`)
  }, [shortUrl, router, searchParams])

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex gap-4">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <Input
            placeholder="Search by Short URL"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>
      <div className="flex gap-4">
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

