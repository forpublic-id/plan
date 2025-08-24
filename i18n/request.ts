import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Can be imported from a shared config
const locales = ["id", "en"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Import messages statically for debugging
  let messages;
  if (locale === "id") {
    messages = await import("./messages/id.json");
  } else if (locale === "en") {
    messages = await import("./messages/en.json");
  } else {
    notFound();
  }

  return {
    locale: locale as string,
    messages: messages.default,
  };
});
