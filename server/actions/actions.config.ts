"use server";

import { revalidatePath } from "next/cache";

export const revalidateDashboardUrls = async () => revalidatePath("/dashboard/urls");

export const UNAUTHETICATION_ERROR =
  "You must be logged in to perform this action.";
export const URL_NOT_FOUND_ERROR = "URL not found";
export const TAG_NOT_FOUND_ERROR = "Tag not found";
