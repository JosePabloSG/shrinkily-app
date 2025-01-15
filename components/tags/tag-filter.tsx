'use client'

import { useState } from 'react'
import { Tags } from '@prisma/client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CreateTag } from "@/components/tags/create-tag"
import { PlusIcon } from 'lucide-react'

interface TagFilterProps {
  tags: Tags[]
  onSelect: (tagId: string) => void
  selectedTag: string
  children: React.ReactNode
}

export function TagFilter({ tags, onSelect, selectedTag, children }: TagFilterProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (tagId: string) => {
    onSelect(tagId)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter by Tag</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <CreateTag tagsCreated={tags}>
            <Button className="w-full mb-4 bg-blue-violet-600 hover:bg-blue-violet-700">
              <PlusIcon size={16} className="mr-2" />
              <span>Create New Tag</span>
            </Button>
          </CreateTag>
          {tags.length > 0 ? (
            <ScrollArea className="h-[300px] pr-4">
              <div className="grid grid-cols-2 gap-4">
                {tags.map((tag) => (
                  <Button
                    key={tag.id}
                    onClick={() => handleSelect(tag.id)}
                    variant={selectedTag === tag.id ? "default" : "outline"}
                    className="justify-start"
                  >
                    {tag.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-4">
              <p>No tags available.</p>
              <p>Create a tag to start filtering.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

