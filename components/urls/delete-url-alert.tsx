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
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { deleteUrl } from "@/server/actions/urls";
import toast from "react-hot-toast";

const DeleteUrlAlert = ({ UrlId }: {
  UrlId: string
}) => {
  const handleDelete = async () => {
    try {
      toast.success('URL deleted successfully')
      await deleteUrl(UrlId)
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while deleting the URL')
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gravel-500 hover:text-red-500 hover:bg-blue-violet-50"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the URL.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default DeleteUrlAlert;