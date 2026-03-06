import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

function deepMerge(target: any, source: any) {
  const result = structuredClone(target);

  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = deepMerge(result[key] ?? {}, value);
    } else {
      result[key] = structuredClone(value);
    }
  }

  return result;
}

function deepMergeAll(...objects: any[]) {
  return objects.reduce((acc, obj) => deepMerge(acc, obj), {});
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const defaultMessages = (
    await import(`./messages/${routing.locales[0]}.json`)
  ).default;
  const localeMessages = (await import(`./messages/${locale}.json`)).default;
  const messages = deepMergeAll({}, defaultMessages, localeMessages);

  return {
    locale,
    messages,
  };
});
