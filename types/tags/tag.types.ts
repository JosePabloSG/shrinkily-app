import type { Tags } from "@prisma/client";
import type { ReactNode } from "react";
import type { z } from "zod";
import type { CreateTagSchema } from "@/schemas/tag.schema";

export type CreateTagProps = {
  children: ReactNode;
  tagsCreated: Tags[];
};

export type TagFormData = z.infer<typeof CreateTagSchema>;
