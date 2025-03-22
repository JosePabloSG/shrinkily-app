"use client";

import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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
import { EditUrlSchema } from "@/schemas/url.schema";
import { updateUrl } from "@/server/actions/urls";
import { Urls } from "@prisma/client";
import { Loader2 } from "lucide-react";

interface Props {
  children: ReactNode;
  url: Urls;
}

export function UpdateUrl({ children, url }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const t = useTranslations('update-url');

  const form = useForm<z.infer<typeof EditUrlSchema>>({
    resolver: zodResolver(EditUrlSchema),
    defaultValues: {
      id: url.id,
      url: url.url,
      shortUrl: url.shortUrl,
    },
  });

  const onSubmit = async (values: z.infer<typeof EditUrlSchema>) => {
    try {
      setIsPending(true);
      const response = await updateUrl(values);

      if (response.isError) {
        toast.error(response.isError);
        return;
      }

      toast.success(t("updateSuccess"));
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(t("updateError"));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("editUrlTitle")}</DialogTitle>
          <DialogDescription>{t("editUrlDescription")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("destinationUrl")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="https://example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("shortUrl")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="my-custom-url"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={isPending} variant="primary">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("saveChanges")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
