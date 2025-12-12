import { Link } from "@inertiajs/react";
import * as React from "react";

interface Article {
  title: string;
  slug: string;
  url: string;
  content_html?: string;
}

interface Category {
  title: string;
  slug: string;
  url: string;
  audience: string;
  articles: Article[];
}

interface ArticleShowProps {
  article: Article;
  related_categories: Category[];
}

export default function ArticleShow({ article, related_categories }: ArticleShowProps) {
  return (
    <section className="p-4 md:p-8">
      <div className="flex flex-col-reverse max-w-7xl md:flex-row gap-8 md:gap-16">
        {/* Categories sidebar */}
        <div className="md:pt-8 md:pr-8">
          <h3 className="font-semibold mb-4">Categories</h3>
          <ul className="space-y-4 list-none pl-0!">
            {related_categories.map((category) => (
              <li key={category.slug}>
                <Link href={category.url}>{category.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 bg-[rgb(var(--filled))] border border-[rgb(var(--parent-color)/var(--border-alpha))] p-8 rounded-sm grow">
          <h2 className="text-3xl font-bold mb-6">{article.title}</h2>

          {article.content_html && (
            <div
              className="scoped-tailwind-preflight prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: article.content_html }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
