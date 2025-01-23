import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { loadMessages } from "./request.config";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
  };
});
