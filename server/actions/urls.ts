import { auth } from "@/auth";
import { CreateUrlSchema, EditUrlSchema } from "@/schemas/url.schema";
import { z } from "zod";
import { db } from "../data-source";
import { revalidatePath } from "next/cache";

interface UrlResponse {
  isLimit?: boolean;
  isError?: string;
  urlId?: string;
}
export const createUrl = async (
  values: z.infer<typeof CreateUrlSchema>
): Promise<UrlResponse> => {
  const user = await auth();

  if (!user) {
    return { isError: "User not found" };
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
      ...values,
      creatorId: user.user.id,
    },
  });

  revalidatePath("/dashboard/urls");

  return { isLimit: false, urlId: url.id };
};

export const updateUrl = async (values: z.infer<typeof EditUrlSchema>) => {
  const user = await auth();

  if (!user) {
    return { isError: "User not found" };
  }

  const url = await db.urls.update({
    where: {
      id: values.id,
    },
    data: {
      ...values,
    },
  });

  revalidatePath("/dashboard/urls");

  return { urlId: url.id };
};

export const deleteUrl = async (id: string) => {
  const user = await auth();

  if (!user) {
    return { isError: "User not found" };
  }

  await db.urls.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/urls");

  return { urlId: id };
};

export const exportUrlsByUser = async () => {
  const user = await auth();

  if (!user) {
    return { isError: "User not found" };
  }

  const urls = await db.urls.findMany({
    where: {
      creatorId: user.user.id,
    },
  });

  return urls.map((url) => ({
    shortUrl: url.shortUrl,
  }));
};
