import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import { formatSlashYYYYMMDD } from "./dayjsUtil";
import { IEntry, IEntrySummary } from "types/entry";
import { markdownToHtml } from "./transpiler";
import removeMarkdown from "remove-markdown";
import { APP_ROOT } from "types/constants";

const ENTRIES_PATH = join(process.cwd(), "entry/");

type Entry = {
  data: {
    title?: string;
    date?: string;
  };
  content: string;
};

function loadEntry(slug: string): Entry {
  const fullPath = join(ENTRIES_PATH, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return matter(fileContents);
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

export const getEntry = async (slug: string): Promise<IEntry> => {
  const { data, content } = loadEntry(slug);
  const date = data.date || getDate(slug);

  const plainText = removeMarkdown(content, { useImgAltText: false });
  const description = plainText.replace(/\n/g, "").substr(0, 120);
  const ogImageRegex = content.match(/http.*png|jpg/);
  const ogImage = ogImageRegex ? ogImageRegex[0] : undefined;

  const contentSource = await markdownToHtml(content);

  const entryUrl = `${APP_ROOT}/entry/${slug}`;

  return {
    slug,
    entryUrl,
    date,
    description,
    ogImage,
    formatDate: formatSlashYYYYMMDD(date),
    contentSource: contentSource,
    title: data.title,
  };
};

const getEntrySummary = async (filePath: string): Promise<IEntrySummary> => {
  const slug = filePath.replace(/\.md?$/, "");
  const { data, content } = loadEntry(slug);

  const [introduction, body] = content.split("***");
  const introductionSource = await markdownToHtml(introduction);

  const date = data.date || getDate(slug);

  return {
    slug,
    date,
    formatDate: formatSlashYYYYMMDD(date),
    introductionSource: introductionSource,
    isShort: !body,
    title: data.title,
  };
};

export const getAllEntrySummaries = async (): Promise<IEntrySummary[]> => {
  const filePaths = getEntryFilePaths();

  const entriesPromise = filePaths.map((filePath) => getEntrySummary(filePath));

  const entries = await Promise.all(entriesPromise);

  return entries.sort((entry1, entry2) =>
    Date.parse(entry1.date) > Date.parse(entry2.date) ? -1 : 1
  );
};

function getEntrySlugAndDate(filePath: string) {
  const slug = filePath.replace(/\.md?$/, "");

  const { data } = loadEntry(slug);

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
