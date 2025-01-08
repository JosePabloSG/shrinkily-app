import z from "zod";

const invalidUrlMsg = "Enter a valid URL (include http:// or https://).";
const restrictedUrlMsg = "URL cannot point to a restricted domain.";
const noWhitespacesMsg = "URL must not contain spaces.";
const shortUrlLengthMsg = "Short URL must contain at least 4 characters.";
const shortUrlCharsMsg =
  "Short URL may only include letters, numbers, '_' and '-'.";
const shortUrlSuffixMsg = "Short URL must not end with '&c'.";

export const UrlSchema = z.object({
  id: z.number(),
  url: z.string(),
  shortUrl: z.string(),
  tagId: z.number().optional(),
});

export const CreateUrlSchema = z.object({
  url: z
    .string()
    .min(1, { message: "A valid URL is required." })
    .url({ message: invalidUrlMsg })
    .regex(/^(?!.*(?:http|https):\/\/(?:slug|slugr)\.vercel\.app).*$/, {
      message: restrictedUrlMsg,
    })
    .regex(/^\S+$/, { message: noWhitespacesMsg }),
  shortUrl: z
    .string()
    .min(4, { message: shortUrlLengthMsg })
    .regex(/^[a-zA-Z0-9_-]*$/, { message: shortUrlCharsMsg })
    .regex(/^(?!.*&c$)/, { message: shortUrlSuffixMsg }),
});

export const EditUrlSchema = z.object({
  id: z.string(),
  url: z
    .string()
    .min(1, { message: "A valid URL is required." })
    .regex(/^(?!.*(?:http|https):\/\/(?:slug|slugr)\.vercel\.app).*$/, {
      message: restrictedUrlMsg,
    })
    .regex(/^\S+$/, { message: noWhitespacesMsg }),
  shortUrl: z
    .string()
    .min(4, { message: shortUrlLengthMsg })
    .regex(/^[a-zA-Z0-9_-]*$/, { message: shortUrlCharsMsg })
    .regex(/^(?!.*&c$)/, { message: shortUrlSuffixMsg }),
});

export type UrlSchemaType = z.infer<typeof UrlSchema>;
export type CreateUrlInput = z.infer<typeof CreateUrlSchema>;
export type EditUrlInput = z.infer<typeof EditUrlSchema>;
