import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const locales = ["en", "fr", "de"];

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

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  // const cookieLocale = undefined;
  const locale =
    cookieLocale && locales.includes(cookieLocale) ? cookieLocale : "fr";

  const defaultMessages = (await import(`../messages/${locales[0]}.json`))
    .default;
  const localeMessages = (await import(`../messages/${locale}.json`)).default;
  const messages = deepMergeAll({}, defaultMessages, localeMessages);

  return {
    locale,
    messages,
  };
});
