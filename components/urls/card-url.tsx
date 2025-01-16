"use client"

import { useState } from "react"
import { Tags, Urls, UrlTags } from "@prisma/client"
import { formatDistanceToNow } from "date-fns"
import { ExternalLink, Clock, MousePointerClickIcon as Click, Tag, Copy, Check, Edit } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import DeleteUrlAlert from "./delete-url-alert"

interface Props {
  urlInfo: Urls
  urlsTags: UrlTags[]
  tagsInfo: Tags[]
}

const CardUrl = ({ urlInfo, urlsTags, tagsInfo }: Props) => {
  const [isCopied, setIsCopied] = useState(false)
  const formattedDate = formatDistanceToNow(new Date(urlInfo.createdAt), { addSuffix: true })
  const formattedLastClicked = urlInfo.lastClicked
    ? formatDistanceToNow(new Date(urlInfo.lastClicked), { addSuffix: true })
    : 'Never'

  const relevantTags = tagsInfo.filter(tag =>
    urlsTags.some(urlTag => urlTag.tagId === tag.id)
  )

  const handleCopy = async () => {
    await navigator.clipboard.writeText(urlInfo.url)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleRedirect = () => {
    window.open(urlInfo.url, '_blank')
  }

  return (
    <Card className="w-full h-full flex flex-col bg-white border-gravel-100 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="space-y-4 flex-grow p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <button
              onClick={handleRedirect}
              className="text-sm font-medium text-blue-violet-600 hover:text-blue-violet-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-violet-400 focus-visible:ring-offset-2 w-full text-left transition-colors duration-200"
            >
              {urlInfo.shortUrl}
            </button>
            <button
              onClick={handleRedirect}
              className="text-sm font-medium mt-1.5 leading-none truncate w-full text-left text-gravel-700 hover:text-gravel-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-violet-400 focus-visible:ring-offset-2 transition-colors duration-200"
              title={urlInfo.url}
            >
              {urlInfo.url}
            </button>
          </div>
          <div className="flex gap-1.5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gravel-500 hover:text-blue-violet-600 hover:bg-blue-violet-50"
                    onClick={handleCopy}
                  >
                    {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isCopied ? 'Copied!' : 'Copy URL'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gravel-500 hover:text-blue-violet-600 hover:bg-blue-violet-50"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gravel-500 hover:text-blue-violet-600 hover:bg-blue-violet-50"
              onClick={handleRedirect}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <DeleteUrlAlert UrlId={urlInfo.id} />
          </div>
        </div>
        <Separator className="bg-gravel-100" />
        <CardContent className="p-0">
          <div className="flex items-center gap-4 text-sm text-gravel-600 flex-wrap">
            <div className="flex justify-center items-center">
              <Clock className="mr-1.5 h-4 w-4" />
              {formattedDate}
            </div>
            <Separator orientation="vertical" className="h-4 bg-gravel-200" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center cursor-help">
                    <Click className="mr-1.5 h-4 w-4" />
                    {urlInfo.clicks} clicks
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Last clicked: {formattedLastClicked}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {relevantTags.length > 0 && (
              <>
                <Separator orientation="vertical" className="h-4 bg-gravel-200" />
                <div className="flex items-center gap-2 flex-wrap">
                  {relevantTags.map(tag => (
                    <Badge
                      key={tag.id}
                      variant="secondary"
                      className="flex items-center bg-dull-lavender-50 text-dull-lavender-700 hover:bg-dull-lavender-100 border border-dull-lavender-200 transition-colors duration-200"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  )
}

export default CardUrl

