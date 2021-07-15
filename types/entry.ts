export type IEntry = {
  slug: string;
  date: string;
  formatDate: string;
  title: string;
  contentSource: string;
};

export type IEntrySummary = {
  slug: string;
  date: string;
  formatDate: string;
  title: string;
  introductionSource: string;
  isShort: boolean;
};
