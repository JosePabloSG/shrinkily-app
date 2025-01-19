"use server";

import { auth } from "@/auth";
import { cache } from "react";
import { db } from "../data-source";

/**
 * Gets all URLs with their tags by the user.
 * @returns {Promise<null | { urls: any; tags: any; limit: number }>} The URLs with their tags and the limit.
 */

export const getUrlsWithTagsByUser = cache(async () => {
  const user = await auth();

  if (!user) {
    return null;
  }

  const urlsData = await db.urls.findMany({
    where: {
      creatorId: user.user.id,
    },
    include: {
      tags: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const tagsData = await db.tags.findMany({
    where: {
      creatorId: user.user.id,
    },
  });

  return {
    urls: urlsData,
    tags: tagsData,
    limit: user.user.limitUrl,
  };
});

/**
 * Gets a URL by its ID.
 * @param {string} urlId - The URL ID.
 * @returns {Promise<any>} The URL data.
 */

export const isShortUrlAvailable = async (shortUrl: string) => {
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
