import { z } from "zod";

const nameRequiredMsg = "Please enter your name.";
const nameMaxLenMsg = "Your name cannot exceed 40 characters.";
const emailInvalidMsg = "Please provide a valid email address.";

export const UpdateProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: nameRequiredMsg })
    .max(40, { message: nameMaxLenMsg }),
  username: z.string().optional(),
  email: z.string().email({ message: emailInvalidMsg }),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
