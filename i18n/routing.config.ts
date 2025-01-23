export const SUPPORTED_LOCALES = ["en", "es"];

export function getDefaultLocale() {
  if (typeof window !== "undefined") {
    const browserLang = navigator.language.split("-")[0];
    return SUPPORTED_LOCALES.includes(browserLang) ? browserLang : "en";
  }
  return "en";
}

export const routingConfig = {
  locales: SUPPORTED_LOCALES,
  defaultLocale: getDefaultLocale(),
};
