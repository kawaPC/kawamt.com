export type IEntry = {
  slug: string;
  entryUrl: string;
  date: string;
  description: string;
  ogImage?: string;
  formatDate: string;
  title?: string;
  contentSource: string;
};

export type IEntrySummary = {
  slug: string;
  date: string;
  formatDate: string;
  title?: string;
  introductionSource: string;
  isShort: boolean;
};
