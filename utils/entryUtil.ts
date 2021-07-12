import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import { formatKanjiYYYYMMDD } from "./dayjsUtil";
import { IEntry } from "types/entry";
import { serialize } from "next-mdx-remote/serialize";

const ENTRIES_PATH = join(process.cwd(), "entry/");

type Entry = {
  data: {
    [key: string]: string;
  };
  content: string;
};

export function getEntry(slug: string): Entry {
  const fullPath = join(ENTRIES_PATH, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { data, content };
}

function getEntryFilePaths(): string[] {
  return fs.readdirSync(ENTRIES_PATH).filter((path) => /\.md?$/.test(path));
}

function getDate(slug?: string): string {
  if (!slug) {
    return "";
  }
  const regex = slug.match(/\d{4}-\d{2}-\d{2}/);
  return regex ? regex[0] : "";
}

const getEntrySummary = async (filePath: string): Promise<IEntry> => {
  const slug = filePath.replace(/\.md?$/, "");
  const { data, content } = getEntry(slug);

  const [introduction, body] = content.split("***");
  const mdxIntroducion = await serialize(introduction, { scope: data });

  const date = data.date || getDate(slug);

  return {
    slug,
    date,
    dateJa: formatKanjiYYYYMMDD(date),
    introductionSource: mdxIntroducion,
    isShort: !body,
    title: data.title,
  };
};

export const getAllEntrySummaries = async (): Promise<IEntry[]> => {
  const filePaths = getEntryFilePaths();

  const entriesPromise = filePaths.map((filePath) =>
    getEntrySummary(filePath)
  );

  const entries = await Promise.all(entriesPromise);

  return entries;
};

function getEntrySlugAndDate(filePath: string) {
  const slug = filePath.replace(/\.md?$/, "");

  const { data } = getEntry(slug);

  const date = data.date || getDate(slug);

  return { slug, date };
}

export function getAllEntrySlugs(): string[] {
  const filePaths = getEntryFilePaths();
  const slugs = filePaths
    .map((filePath) => getEntrySlugAndDate(filePath))
    .sort((entry1, entry2) =>
      Date.parse(entry1.date) > Date.parse(entry2.date) ? -1 : 1
    )
    .map((entry) => entry.slug);
  return slugs;
}
