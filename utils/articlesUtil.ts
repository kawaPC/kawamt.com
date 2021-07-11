import { join } from "path";
import fs from "fs";
import matter from "gray-matter";

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

type Items = {
  [key: string]: string;
};

function getPostFilePaths(): string[] {
  return fs.readdirSync(ARTICLES_PATH).filter((path) => /\.md?$/.test(path));
}

function getArticleItems(filePath: string, fields: string[] = []): Items {
  const slug = filePath.replace(/\.md?$/, "");
  const { data, content } = getArticle(slug);

  const items: Items = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllArticles(fields: string[] = []): Items[] {
  const filePaths = getPostFilePaths();
  const articles = filePaths
    .map((filePath) => getArticleItems(filePath, fields))
    .sort((post1, post2) =>
      Date.parse(post1.date) > Date.parse(post2.date) ? -1 : 1
    );
  return articles;
}
