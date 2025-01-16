'use client'

import { useState } from 'react'
import { Tags } from '@prisma/client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CreateTag } from "@/components/tags/create-tag"
import { Plus } from 'lucide-react'
import DeleteTagAlert from './delete-tag-alert'

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
      <DialogContent className="sm:max-w-[400px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold">Filter by Tag</DialogTitle>
          <DialogDescription>
            Select a tag to filter the list of items.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <CreateTag tagsCreated={tags}>
            <Button
              className="w-full mb-6 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium"
              size="lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create New Tag
            </Button>
          </CreateTag>
          {tags.length > 0 ? (
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-2 group"
                  >
                    <Button
                      onClick={() => handleSelect(tag.id)}
                      variant={selectedTag === tag.id ? "default" : "outline"}
                      className="flex-1 justify-start h-10 px-4 font-normal"
                    >
                      {tag.name}
                    </Button>
                    <DeleteTagAlert TagId={tag.id} />
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p className="mb-1">No tags available.</p>
              <p>Create a tag to start filtering.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

