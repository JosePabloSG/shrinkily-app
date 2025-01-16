"use server";

import { auth } from "@/auth";
import { CreateTagSchema } from "@/schemas/tag.schema";
import { z } from "zod";
import { db } from "../data-source";
import { revalidatePath } from "next/cache";

/**
 * Revalidates the dashboard URLs cache.
 */
const revalidateDashboardUrls = () => revalidatePath("/dashboard/urls");

/**
 * Error message when user is not authenticated.
 * Error message when URL is not found.
 * Error message when tag is not found.
 */
const UNAUTHETICATION_ERROR = "User not found";
const URL_NOT_FOUND_ERROR = "URL not found";
const TAG_NOT_FOUND_ERROR = "Tag not found";

/**
 * Creates a new tag.
 * @param {z.infer<typeof CreateTagSchema>} values - The values for the new tag.
 * @returns {Promise<UrlResponse>} The response containing the URL ID or an error.
 */
export const createTag = async (values: z.infer<typeof CreateTagSchema>) => {
  const user = await auth();

  if (!user) {
    return { isError: UNAUTHETICATION_ERROR };
  }

  const result = await db.tags.create({
    data: {
      ...values,
      creatorId: user.user.id,
    },
  });

  revalidateDashboardUrls();
  return result;
};

/**
 * Deletes a tag.
 * @param {string} tagId - The tag ID.
 * @returns {Promise<UrlResponse>} The response containing the URL ID or an error.
 */
export const deleteTag = async (tagId: string) => {
  const user = await auth();

  if (!user) {
    return { isError: UNAUTHETICATION_ERROR };
  }

  await db.tags.delete({
    where: {
      id: tagId,
    },
  });

  revalidateDashboardUrls();
  return { isError: false };
};

/**
 * Add a tag to a URL.
 * @param {string} urlId - The URL ID.
 * @param {string} tagId - The tag ID.
 * @returns {Promise<UrlResponse>} The response containing the URL ID or an error.
 */
export const AddTagToUrl = async (urlId: string, tagId: string) => {
  const user = await auth();

  if (!user) {
    return { isError: UNAUTHETICATION_ERROR };
  }

  const url = await db.urls.findUnique({
    where: {
      id: urlId,
    },
  });

  if (!url) {
    return { isError: URL_NOT_FOUND_ERROR };
  }

  const tag = await db.tags.findUnique({
    where: {
      id: tagId,
    },
  });

  if (!tag) {
    return { isError: TAG_NOT_FOUND_ERROR };
  }

  await db.urlTags.create({
    data: {
      urlId,
      tagId,
    },
  });

  revalidateDashboardUrls();
  return { isError: false };
};
