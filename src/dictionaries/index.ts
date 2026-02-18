import "server-only";

export type Locale = "ko" | "en";

const dictionaries = {
  ko: () => import("./ko.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};

export const locales: Locale[] = ["ko", "en"];

export const defaultLocale: Locale = "ko";
