export type IEntry = {
  slug: string;
  date: string;
  formatDate: string;
  title: string | null;
  contentSource: string;
};

export type IEntrySummary = {
  slug: string;
  date: string;
  formatDate: string;
  title: string | null;
  introductionSource: string;
  isShort: boolean;
};
