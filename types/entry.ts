import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type IEntry = {
  slug: string;
  date: string;
  dateJa: string;
  title: string;
  introductionSource: MDXRemoteSerializeResult;
  isShort: boolean;
};
