"use server";

import { auth } from "@/auth";
import { CreateUrlSchema, EditUrlSchema } from "@/schemas/url.schema";
import { z } from "zod";
import { db } from "../data-source";
import { revalidateDashboardUrls, UNAUTHETICATION_ERROR } from "./actions.config";

/**
 * Response for URL actions.
 */
interface UrlResponse {
  isLimit?: boolean;
  isError?: string;
  urlId?: string;
}

/**
 * Creates a new URL.
 * @param {z.infer<typeof CreateUrlSchema>} values - The values for the new URL.
 * @returns {Promise<UrlResponse>} The response containing the URL ID or an error.
 */
export const createUrl = async (
  values: z.infer<typeof CreateUrlSchema>
): Promise<UrlResponse> => {
  const user = await auth();

  if (!user) {
    return { isError: UNAUTHETICATION_ERROR };
  }

  const countUrls = await db.urls.count({
    where: {
      creatorId: user.user.id,
    },
  });

  const limit = user.user.limitUrl;
  if (countUrls >= limit) {
    return { isLimit: true };
  }

  const url = await db.urls.create({
    data: {
      url: values.url,
      shortUrl: values.shortUrl,
      creatorId: user.user.id,
    },
  });

  revalidateDashboardUrls();

  return { isLimit: false, urlId: url.id };
};

/**
 * Updates an existing URL.
 * @param {z.infer<typeof EditUrlSchema>} values - The values for the URL to update.
 * @returns {Promise<UrlResponse>} The response containing the URL ID or an error.
 */
export const updateUrl = async (values: z.infer<typeof EditUrlSchema>) => {
  const user = await auth();

  if (!user) {
    return { isError: UNAUTHETICATION_ERROR };
  }

  const url = await db.urls.update({
    where: {
      id: values.id,
    },
    data: {
      ...values,
    },
  });

  revalidateDashboardUrls();

  return { urlId: url.id };
};

/**
 * Deletes an existing URL.
 * @param {string} id - The ID of the URL to delete.
 * @returns {Promise<UrlResponse>} The response containing the URL ID or an error.
 */
export const deleteUrl = async (id: string) => {
  const user = await auth();

  if (!user) {
    return { isError: UNAUTHETICATION_ERROR };
  }

  await db.urls.delete({
    where: {
      id,
    },
  });

  revalidateDashboardUrls();

  return { urlId: id };
};

/**
 * Exports URLs created by the authenticated user.
 * @returns {Promise<Array<{ shortUrl: string }>> | { isError: string }} The list of URLs or an error.
 */
export const exportUrlsByUser = async () => {
  const user = await auth();

  if (!user) {
    return { isError: UNAUTHETICATION_ERROR };
  }

  const urls = await db.urls.findMany({
    where: {
      creatorId: user.user.id,
    },
  });

  return urls.map((url) => ({
    url: url.url,
  }));
};

export const verifyShortUrlIsAvailable = async (shortUrl: string) => {
  const response = await db.urls.findUnique({
    where: {
      shortUrl: shortUrl,
    },
  });

  if (response) {
    return false;
  }

  return true;
};
