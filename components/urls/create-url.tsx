"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Loader2Icon, LinkIcon, RefreshCwIcon, TagIcon } from 'lucide-react';
import { Input } from "../ui/input";
import { Alert } from "../ui/alert";
import { createUrl, verifyShortUrlIsAvailable } from "@/server/actions/urls";
import { AddTagToUrl } from "@/server/actions/tags";
import { CreateUrlSchema } from "@/schemas/url.schema";
import { useTagSelection } from "@/hooks/useTagSelection";
import { useState } from "react";
import { CreateLinkProps, UrlFormData } from "@/types/urls/url.types";
import { generateRandomShortUrl, validateUrlDifference } from "@/server/utils/url-utilis";
import SelectTagsLink from "./select-tags";

export function CreateUrl({ children, shortUrl: initialShortUrl, tags }: CreateLinkProps) {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { selectedTags, toggleTag, removeTag, clearTags } = useTagSelection();

  const form = useForm<UrlFormData>({
    resolver: zodResolver(CreateUrlSchema),
    defaultValues: {
      url: "",
      shortUrl: initialShortUrl || ""
    }
  });

  const handleSubmit = async (values: UrlFormData) => {
    if (!validateUrlDifference(values.shortUrl, values.url)) {
      setError("The URL and the shortUrl cannot be the same");
      return;
    }

    const performSubmission = async () => {
      try {
        const shortUrlExists = await verifyShortUrlIsAvailable(values.shortUrl);
        if (!shortUrlExists) {
          toast.error("The shortUrl already exists. Write another or generate a random shortUrl.");
          return;
        }

        const result = await createUrl(values);
        if (result.isError && result.isLimit) {
          toast.error("You have reached the limit of links you can create. Please delete some links to create new ones.");
          return;
        }

        if (selectedTags.length > 0 && result.urlId) {
          await Promise.all(
            selectedTags.map(tagId => AddTagToUrl(result.urlId!, tagId))
          );
        }

        toast.success("Link created successfully");
        handleReset();
      } catch (error) {
        console.error("Error creating URL:", error);
        toast.error("An unexpected error has occurred. Please try again later.");
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
    form.setValue("shortUrl", generateRandomShortUrl());
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-semibold">Create New Link</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Destination URL</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          {...field}
                          value={field.value || ""}
                          autoComplete="off"
                          placeholder="https://"
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
                    <FormLabel className="text-sm font-medium">Short Link</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="mylink"
                          disabled={isPending}
                          className="pr-24"
                        />
                        <Button
                          onClick={handleGenerateRandomShortUrl}
                          variant="outline"
                          className="absolute right-0 h-full rounded-l-none px-3"
                        >
                          <RefreshCwIcon size={16} className="mr-2" />
                          <span className="text-xs">Randomize</span>
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
                  <p className="font-medium">You don't have any tags created.</p>
                </div>
              )}
            </div>
            <DialogFooter className="mt-6 flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending} className="min-w-[100px]">
                {isPending ? (
                  <>
                    <Loader2Icon size={16} className="mr-2 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <LinkIcon size={16} className="mr-2" />
                    <span>Create Link</span>
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

