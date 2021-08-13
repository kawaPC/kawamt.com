export type IEntry = {
  slug: string;
  entryUrl: string;
  date: string;
  description: string;
  ogImage?: string;
  formatDate: string;
  title?: string;
  tags?: string[];
  contentSource: string;
};

export type IEntrySummary = {
  slug: string;
  date: string;
  formatDate: string;
  title?: string;
  tags?: string[];
  description: string;
  introductionSource: string;
  contentSource: string;
  isShort: boolean;
};
