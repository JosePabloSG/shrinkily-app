'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { toast } from "react-hot-toast"
import { deleteTag } from "@/server/actions/tags"

interface DeleteTagAlertProps {
  TagId: string
}

export default function DeleteTagAlert({ TagId }: DeleteTagAlertProps) {
  const handleDelete = async () => {
    try {
      await deleteTag(TagId)
      toast.success('Tag deleted successfully')
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while deleting the tag')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this tag?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The tag will be permanently deleted, but any associated URLs will remain intact.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-medium">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/90 font-medium"
          >
            Delete Tag
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

