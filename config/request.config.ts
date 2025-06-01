export const sections = [
  "home",
  "layout",
  "feature-page",
  "docs-page",
  "about-page",
  "contact-page",
  "user-form",
  "export-urls-card",
  "delete-account-card",
  "signin-page",
  "create-url",
  "toolbar",
  "tag-filter",
  "create-tag",
  "delete-tag",
  "update-url",
  "qr-code",
  "delete-url-alert",
  "card-url",
  "popover-content-mobile",
  "qr-code-editor",
  "color-tab",
  "size-tab",
  "logo-tab",
  "save-tab",
  "testimonials",
  "contact"
] as const;

export type MessageSection = (typeof sections)[number];

export async function loadMessages(locale: string) {
  const messagesArray = await Promise.all(
    sections.map(async (section) => [
      section,
      (await import(`../messages/${locale}/${section}.json`)).default,
    ])
  );

  return Object.fromEntries(messagesArray);
}
