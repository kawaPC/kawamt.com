export type IEntry = {
  slug: string;
  date: string;
  description: string;
  ogImageName?: string;
  formatDate: string;
  title?: string;
  tags?: string[];
  introductionSource: string;
  contentSource: string;
  isShort: boolean;
};
