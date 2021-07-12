import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import { formatKanjiYYYYMMDD } from "./dayjsUtil";
import { IArticle } from "types/article";
import { serialize } from "next-mdx-remote/serialize";

const ARTICLES_PATH = join(process.cwd(), "articles/");

type Article = {
  data: {
    [key: string]: string;
  };
  content: string;
};

export function getArticle(slug: string): Article {
  const fullPath = join(ARTICLES_PATH, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { data, content };
}

function getArticleFilePaths(): string[] {
  return fs.readdirSync(ARTICLES_PATH).filter((path) => /\.md?$/.test(path));
}

function getDate(slug?: string): string {
  if (!slug) {
    return "";
  }
  const regex = slug.match(/\d{4}-\d{2}-\d{2}/);
  return regex ? regex[0] : "";
}

const getArticleSummary = async (filePath: string): Promise<IArticle> => {
  const slug = filePath.replace(/\.md?$/, "");
  const { data, content } = getArticle(slug);

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

export const getAllArticleSummaries = async (): Promise<IArticle[]> => {
  const filePaths = getArticleFilePaths();

  const articlesPromise = filePaths.map((filePath) =>
    getArticleSummary(filePath)
  );

  const articles = await Promise.all(articlesPromise);

  return articles;
};

function getArticleSlugAndDate(filePath: string) {
  const slug = filePath.replace(/\.md?$/, "");

  const { data } = getArticle(slug);

  const date = data.date || getDate(slug);

  return { slug, date };
}

export function getAllArticleSlugs(): string[] {
  const filePaths = getArticleFilePaths();
  const slugs = filePaths
    .map((filePath) => getArticleSlugAndDate(filePath))
    .sort((article1, article2) =>
      Date.parse(article1.date) > Date.parse(article2.date) ? -1 : 1
    )
    .map((article) => article.slug);
  return slugs;
}
