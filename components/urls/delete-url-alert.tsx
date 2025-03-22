import { useTranslations } from "next-intl";
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
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { deleteUrl } from "@/server/actions/urls";
import toast from "react-hot-toast";

const DeleteUrlAlert = ({ UrlId }: { UrlId: string }) => {
  const t = useTranslations('delete-url-alert');

  const handleDelete = async () => {
    try {
      await deleteUrl(UrlId);
      toast.success(t("deleteSuccess"));
    } catch (error) {
      console.error(error);
      toast.error(t("deleteError"));
    }
  };

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
          <AlertDialogTitle>{t("deleteConfirmationTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("deleteConfirmationDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleDelete}>
            {t("delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUrlAlert;
