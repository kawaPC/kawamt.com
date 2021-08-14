import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import { formatSlashYYYYMMDD } from "./dayjsUtil";
import { IEntry } from "types/entry";
import { markdownToHtml } from "./transpiler";
import removeMarkdown from "remove-markdown";
import { APP_ROOT, COUNT_PER_PAGE } from "types/constants";
import "utils/arrayExtensions";
import { range } from "utils/arrayExtensions";

const ENTRIES_PATH = join(process.cwd(), "entry/");

type Entry = {
  data: {
    title?: string;
    date?: string;
    tags?: string[];
  };
  content: string;
};

function loadEntry(slug: string): Entry {
  const fullPath = join(ENTRIES_PATH, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return matter(fileContents);
}

function getEntrySlugs(): string[] {
  return fs
    .readdirSync(ENTRIES_PATH)
    .filter((path) => /\.md?$/.test(path))
    .map((filePath) => filePath.replace(/\.md?$/, ""));
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
  const ogImageRegex = content.match(/http.*(png|jpg)/);
  const ogImage = ogImageRegex ? ogImageRegex[0] : undefined;

  const [introduction, body] = content.split("***");
  const introductionSource = await markdownToHtml(introduction);
  const contentSource = await markdownToHtml(content);

  const entry = {
    slug,
    date,
    description,
    ogImage,
    title: data.title,
    tags: data.tags,
    formatDate: formatSlashYYYYMMDD(date),
    isShort: !body,
    introductionSource: introductionSource,
    contentSource: contentSource,
  };

  return JSON.parse(JSON.stringify(entry));
};

export const getEntries = async (
  page: number,
  tag?: string
): Promise<{ entries: IEntry[]; isLast: boolean }> => {
  const slugs = getEntrySlugs();

  const entriesPromise = slugs.map((slug) => getEntry(slug));

  const allEntries = await Promise.all(entriesPromise);
  const filteredEntries = tag
    ? allEntries.filter((entry) => entry.tags?.includes(tag))
    : allEntries;

  const end = COUNT_PER_PAGE * page;
  const start = end - COUNT_PER_PAGE;
  const total = filteredEntries.length;
  const isLast = total <= end;

  const entries = filteredEntries
    .sort((entry1, entry2) =>
      Date.parse(entry1.date) > Date.parse(entry2.date) ? -1 : 1
    )
    .slice(start, end);

  return { entries, isLast };
};

export function getAllEntrySlugs(): string[] {
  const slugs = getEntrySlugs();

  const slugAndDate = slugs.map((slug) => {
    const { data } = loadEntry(slug);
    const date = data.date || getDate(slug);
    return { date, slug };
  });

  return slugAndDate
    .sort((entry1, entry2) =>
      Date.parse(entry1.date) > Date.parse(entry2.date) ? -1 : 1
    )
    .map((entry) => entry.slug);
}

function getEntryTags(): { slug: string; tags: string[] }[] {
  const slugs = getEntrySlugs();

  return slugs.map((slug) => {
    const { data } = loadEntry(slug);

    return { slug: slug, tags: data.tags || [] };
  });
}

type EntryPerPagePath = {
  params: {
    page: string;
  };
};

export function getEntryPerPagePaths(): EntryPerPagePath[] {
  const slugs = getEntrySlugs();
  const pageCount = Math.ceil(slugs.length / COUNT_PER_PAGE);

  return range(1, pageCount).map((page) => ({
    params: {
      page: String(page),
    },
  }));
}

type TaggedEntryPath = {
  params: {
    tag: string;
  };
};

export function getTaggedEntryPaths(): TaggedEntryPath[] {
  const tags = getEntryTags()
    .flatMap((entry) => entry.tags)
    .uniq();

  return tags.map((tag) => ({
    params: {
      tag: tag,
    },
  }));
}

type TaggedEntryPerPagePath = {
  params: {
    tag: string;
    page: string;
  };
};

export function getTaggedEntryPerPagePaths(): TaggedEntryPerPagePath[] {
  const entries = getEntryTags();
  const tags = entries.flatMap((entry) => entry.tags).uniq();

  return tags.flatMap((tag) => {
    const total = entries.filter((entry) => entry.tags.includes(tag)).length;

    const pageCount = Math.ceil(total / COUNT_PER_PAGE);

    return range(1, pageCount).map((page) => ({
      params: {
        tag: tag,
        page: String(page),
      },
    }));
  });
}
