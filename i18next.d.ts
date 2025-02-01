import "i18next";

import type translation from "./src/core/localize/locales/en.json";

interface I18nNamespaces {
  translation: typeof translation;
}

declare module "i18next" {
  interface CustomTypeOptions {
    // returnNull: false
    // defaultNS: 'translation'
    resources: I18nNamespaces;
  }
}
