import { Link } from "@inertiajs/react";
import * as React from "react";
import { Icon } from "$app/components/Icons";
import { PageHeader } from "$app/components/ui/PageHeader";

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
    <>
      <PageHeader
        title="Help Center"
        actions={
          <Link href="/help" className="button" aria-label="Search" title="Search">
            <Icon name="solid-search" />
          </Link>
        }
      />
      <section className="p-4 md:p-8">
        <div className="flex flex-col-reverse max-w-7xl md:flex-row gap-8 md:gap-16">
          {/* Categories sidebar */}
          <div className="md:pt-8 md:pr-8">
            <h3 className="mb-4 font-semibold">Categories</h3>
            <ul className="list-none space-y-4 pl-0!">
              {related_categories.map((category) => (
                <li key={category.slug}>
                  <Link href={category.url}>{category.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grow rounded-sm border border-[rgb(var(--parent-color)/var(--border-alpha))] bg-[rgb(var(--filled))] p-8 flex-1">
            <h2 className="mb-6 text-3xl font-bold">{article.title}</h2>

            {article.content_html && (
              <div
                className="scoped-tailwind-preflight prose dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: article.content_html || "" }}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
