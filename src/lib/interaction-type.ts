export const InteractionType = {
  SITE_VISIT: "SITE_VISIT",
  ARTICLE_VIEW: "ARTICLE_VIEW",
  PROJECT_VIEW: "PROJECT_VIEW",
  CONTACT_FORM: "CONTACT_FORM",
  CONTACT_EMAIL: "CONTACT_EMAIL",
  CONTACT_PHONE: "CONTACT_PHONE",
} as const;

export type InteractionType = (typeof InteractionType)[keyof typeof InteractionType];
