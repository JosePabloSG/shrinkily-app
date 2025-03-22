"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { createTag } from "@/server/actions/tags";
import { CreateTagSchema } from "@/schemas/tag.schema";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { LoaderIcon, Tag } from "lucide-react";
import { Tags } from "@prisma/client";
import { CreateTagProps, TagFormData } from "@/types/tags/tag.types";
import { useTranslations } from "next-intl";

export function CreateTag({ children, tagsCreated }: CreateTagProps) {
  const t = useTranslations('create-tag');
  const [isPending, setIsPending] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<TagFormData>({
    resolver: zodResolver(CreateTagSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (values: TagFormData) => {
    try {
      setIsPending(true);

      if (tagsCreated.some((tag: Tags) => tag.name === values.name)) {
        toast.error(t("tagExistsError"));
        return;
      }

      const result = await createTag(values);

      if (!result) {
        toast.error(t("unexpectedError"));
        return;
      }

      toast.success(t("successMessage"));
      handleReset();
    } catch (error) {
      console.error("Error creating tag:", error);
      toast.error(t("unexpectedError"));
    } finally {
      setError(null);
      setIsPending(false);
    }
  };

  const handleReset = () => {
    form.reset();
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>{t("createTagTitle")}</DialogTitle>
          <DialogDescription>{t("createTagDescription")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("tagName")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        autoComplete="off"
                        placeholder={t("tagPlaceholder")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <Alert>{error}</Alert>}
            </div>
            <DialogFooter className="sm:space-x-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  disabled={isPending}
                  className="mt-2 sm:mt-0"
                >
                  {t("cancel")}
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isPending} variant="primary">
                {isPending ? (
                  <LoaderIcon size={16} className="mr-2 animate-spin" />
                ) : (
                  <Tag size={16} className="mr-2" />
                )}
                <span>{isPending ? t("creating") : t("createTagButton")}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
