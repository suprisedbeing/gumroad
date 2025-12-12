import { Link } from "@inertiajs/react";
import * as React from "react";

import { Icon } from "$app/components/Icons";
import { PageHeader } from "$app/components/ui/PageHeader";

interface Article {
  title: string;
  slug: string;
  url: string;
}

interface Category {
  title: string;
  slug: string;
  url: string;
  audience: string;
  articles: Article[];
}

interface CategoryShowProps {
  category: Category;
  related_categories: Category[];
}

export default function CategoryShow({ category, related_categories }: CategoryShowProps) {
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
      <div className="p-4 md:p-8">
        <div className="mb-8">
          <Link href="/help" className="button">
            ← Back to Help Center
          </Link>
        </div>

      <h1 className="mb-8 text-3xl font-bold">{category.title}</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {category.articles.map((article) => (
          <Link
            key={article.slug}
            href={article.url}
            className="button filled flex h-full items-center justify-center p-8 text-center"
          >
            {article.title}
          </Link>
        ))}
      </div>

      {related_categories.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold">Related Categories</h2>
          <div className="flex flex-wrap gap-4">
            {related_categories.map((cat) => (
              <Link key={cat.slug} href={cat.url} className="button">
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      )}
      </div>
    </>
  );
}
