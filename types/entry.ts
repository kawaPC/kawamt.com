export type IEntry = {
  slug: string;
  entryUrl: string;
  date: string;
  description: string;
  ogImage?: string;
  formatDate: string;
  title?: string;
  tags?: string[];
  introductionSource: string;
  contentSource: string;
  isShort: boolean;
};
