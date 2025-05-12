"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Loader2Icon, LinkIcon, RefreshCwIcon, TagIcon, Sparkles } from 'lucide-react';
import { Input } from "../ui/input";
import { Alert } from "../ui/alert";
import { createUrl } from "@/server/actions/urls";
import { AddTagToUrl } from "@/server/actions/tags";
import { CreateUrlSchema } from "@/schemas/url.schema";
import { useTagSelection } from "@/hooks/useTagSelection";
import { useState, useEffect, useRef } from "react";
import { CreateLinkProps, UrlFormData } from "@/types/urls/url.types";
import { generateRandomShortUrl, validateUrlDifference } from "@/server/utils/url-utilis";
import SelectTagsLink from "./select-tags";
import { isShortUrlAvailable } from "@/server/queries";
import { useTranslations } from "next-intl";

export function CreateUrl({ children, shortUrl: initialShortUrl, tags }: CreateLinkProps) {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const userEditedShortUrl = useRef(false);
  const { selectedTags, toggleTag, removeTag, clearTags } = useTagSelection();
  const t = useTranslations('create-url');

  const form = useForm<UrlFormData>({
    resolver: zodResolver(CreateUrlSchema),
    defaultValues: {
      url: "",
      shortUrl: initialShortUrl || ""
    }
  });

  // Detecta si el usuario edita manualmente el shortUrl
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "shortUrl") {
        userEditedShortUrl.current = true;
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Sugiere shortUrl automáticamente al ingresar una URL
  const watchedUrl = form.watch("url");
  useEffect(() => {
    if (!watchedUrl || userEditedShortUrl.current) return;
    setIsSuggesting(true);
    fetch("/api/shorturl-suggestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: watchedUrl }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.suggestion) {
          form.setValue("shortUrl", data.suggestion, { shouldDirty: true });
        }
      })
      .catch(() => { })
      .finally(() => setIsSuggesting(false));
  }, [watchedUrl, form]);

  const handleSubmit = async (values: UrlFormData) => {
    if (!validateUrlDifference(values.shortUrl, values.url)) {
      setError(t('UrlErrorMessage'));
      return;
    }

    const performSubmission = async () => {
      try {
        const shortUrlExists = await isShortUrlAvailable(values.shortUrl);
        if (!shortUrlExists) {
          toast.error(t('ShortUrlExistsError'));
          return;
        }

        const result = await createUrl(values);
        if (result.isError && result.isLimit) {
          toast.error(t('LimitReachedError'));
          return;
        }

        if (selectedTags.length > 0 && result.urlId) {
          await Promise.all(
            selectedTags.map(tagId => AddTagToUrl(result.urlId!, tagId))
          );
        }

        toast.success(t('SuccessMessage'));
        handleReset();
      } catch (error) {
        console.error("Error creating URL:", error);
        toast.error(t('UnexpectedError'));
      } finally {
        setError(null);
      }
    };

    startTransition(() => {
      performSubmission();
    });
  };

  const handleReset = () => {
    form.reset({ url: "", shortUrl: "" });
    clearTags();
    setIsDialogOpen(false);
  };

  const handleGenerateRandomShortUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsRandomizing(true);
    form.setValue("shortUrl", generateRandomShortUrl());

    setTimeout(() => {
      setIsRandomizing(false);
    }, 500);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-semibold">{t('DialogTitle')}</DialogTitle>
          <DialogDescription>
            {t('DialogDescription')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">{t('DestinationUrlLabel')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          {...field}
                          value={field.value || ""}
                          autoComplete="off"
                          placeholder={t('DestinationUrlPlaceholder')}
                          disabled={isPending}
                          className="pl-10"
                        />
                      </div>
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
                    <FormLabel className="text-sm font-medium flex items-center">
                      {t('ShortLinkLabel')}
                      {!isSuggesting && !userEditedShortUrl.current && field.value && (
                        <span className="ml-2 text-xs text-blue-500 flex items-center">
                          <Sparkles size={16} className="mr-1 animate-pulse" />
                          Sugerido por IA (puedes editarlo)
                        </span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder={t('ShortLinkPlaceholder')}
                          disabled={isPending}
                          className="pr-24"
                        />
                        {isSuggesting && (
                          <span className="absolute right-20 flex items-center animate-pulse">
                            <Sparkles size={18} className="text-blue-400" />
                            <span className="ml-1 text-xs text-blue-400 font-semibold">IA</span>
                          </span>
                        )}
                        <Button
                          onClick={handleGenerateRandomShortUrl}
                          variant="outline"
                          className="absolute right-0 h-full rounded-l-none px-3 transition-transform duration-500"
                        >
                          <RefreshCwIcon
                            size={16}
                            className={`mr-2 transition-transform duration-500 ${isRandomizing ? 'rotate-180' : ''}`}
                          />
                          <span className="text-xs">{t('RandomizeButton')}</span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <Alert variant="destructive">{error}</Alert>}
              {tags.length > 0 ? (
                <SelectTagsLink
                  selectedTags={selectedTags}
                  onSelectTag={toggleTag}
                  onDeleteTag={removeTag}
                  tags={tags}
                />
              ) : (
                <div className="flex items-center justify-center space-x-2 rounded-md border border-neutral-200 py-3 text-sm dark:border-neutral-800">
                  <TagIcon size={16} />
                  <p className="font-medium">{t('NoTagsMessage')}</p>
                </div>
              )}
            </div>
            <DialogFooter className="sm:space-x-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  disabled={isPending}
                  className="mt-2 sm:mt-0"
                >
                  {t('CancelButton')}
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={isPending}
                variant="primary"
              >
                {isPending ? (
                  <>
                    <Loader2Icon size={16} className="mr-2 animate-spin" />
                    <span>{t('CreatingButton')}</span>
                  </>
                ) : (
                  <>
                    <LinkIcon size={16} className="mr-2" />
                    <span>{t('CreateButton')}</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateUrl;