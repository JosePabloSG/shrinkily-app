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

/**
 * CreateTag component for creating and managing tags
 * @param props - Component properties including children and existing tags
 */
export function CreateTag({ children, tagsCreated }: CreateTagProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<TagFormData>({
    resolver: zodResolver(CreateTagSchema),
    defaultValues: {
      name: "",
    },
  });

  /**
   * Handles the form submission process
   * @param values - Form values containing the tag name
   */
  const handleSubmit = async (values: TagFormData) => {
    try {
      setIsLoading(true);

      // Check if tag already exists
      if (tagsCreated.some((tag: Tags) => tag.name === values.name)) {
        toast.error("The tag already exists. Please use a different name.");
        return;
      }

      const result = await createTag(values);

      if (!result) {
        toast.error("An unexpected error occurred. Please try again later.");
        return;
      }

      toast.success("Tag created successfully");
      handleReset();
    } catch (error) {
      console.error("Error creating tag:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setError(null);
      setIsLoading(false);
    }
  };

  /**
   * Resets the form and dialog state
   */
  const handleReset = () => {
    form.reset();
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Create new tag</DialogTitle>
          <DialogDescription>
            Create a new tag to organize your links.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag name:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        autoComplete="off"
                        placeholder="Enter tag name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <Alert>{error}</Alert>}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" disabled={isLoading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant={'primary'} disabled={isLoading}>
                {isLoading ? (
                  <LoaderIcon size={16} className="mr-2 animate-spin" />
                ) : (
                  <Tag size={16} className="mr-2" />
                )}
                <span>{isLoading ? "Creating..." : "Create Tag"}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}