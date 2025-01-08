/**
 * Get all urls with all tags by authenticated user
 */

import { auth } from "@/auth";
import { cache } from "react";
import { db } from "../data-source";

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

export const verifyShortUrlIsAvailable = cache(async (shortUrl: string) => {
  const response = await db.urls.findUnique({
    where: {
      shortUrl: shortUrl,
    },
  });

  if (response) {
    return false;
  }

  return true;
});
