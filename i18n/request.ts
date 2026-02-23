import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const locales = ["fr", "en", "de"];

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  // const cookieLocale = undefined;
  const locale =
    cookieLocale && locales.includes(cookieLocale) ? cookieLocale : "fr";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
