import z from "zod";

/**
 * Schemas for tags and profile updates (messages revised)
 */
const tagNameMsg = "Please provide a valid tag name.";
const tagMaxLenMsg = "Tag name cannot exceed 15 characters.";

export const CreateTagSchema = z.object({
  name: z
    .string()
    .min(1, { message: tagNameMsg })
    .max(15, { message: tagMaxLenMsg }),
});

export type CreateTagInput = z.infer<typeof CreateTagSchema>;
