import { Tags } from "@prisma/client";
import { ReactNode } from "react";
import { z } from "zod";
import { CreateUrlSchema } from "@/schemas/url.schema";

export type CreateLinkProps = {
  children: ReactNode;
  shortUrl?: string;
  tags: Tags[];
};

export type UrlFormData = z.infer<typeof CreateUrlSchema>;

export type SubmissionResult = {
  isError: boolean;
  isLimit?: boolean;
  urlId?: string;
};
