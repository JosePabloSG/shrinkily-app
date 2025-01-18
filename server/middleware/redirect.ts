"use server";

import { db } from "../data-source";

export interface UrlFromServerResult {
  error: boolean;
  message: string;
  createdBy?: string;
  redirect404?: boolean;
  url?: string;
  rateLimited?: boolean;
}

export const urlFromServer = async (
  shortUrl: string
): Promise<UrlFromServerResult> => {
  try {
    const link = await db.urls.findUnique({
      where: { shortUrl },
    });

    if (!link) {
      return {
        error: false,
        message: "URL not found",
        redirect404: true,
      };
    }

    await db.urls.update({
      where: { id: link.id },
      data: {
        clicks: { increment: 1 },
        lastClicked: new Date(),
      },
    });

    return {
      error: false,
      message: "Success",
      createdBy: link.creatorId,
      url: link.url,
    };
  } catch {
    return {
      error: true,
      message: "Internal server error",
    };
  }
};
