import { Link, usePage } from "@inertiajs/react";
import * as React from "react";

import { Button, NavigationButton } from "$app/components/Button";
import { UnauthenticatedNewTicketModal } from "$app/components/support/UnauthenticatedNewTicketModal";
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

interface ArticlesIndexProps {
  categories: Category[];
  recaptcha_site_key?: string | null;
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");

const renderHighlightedText = (text: string, searchTerm: string): React.ReactNode => {
  if (!searchTerm) return text;

  const escaped = escapeRegExp(searchTerm);
  const regex = new RegExp(`(${escaped})`, "giu");

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: text.replace(regex, (match) => `<mark class="highlight rounded-xs bg-pink">${match}</mark>`),
      }}
    />
  );
};

const CategoryArticles = ({ category, searchTerm }: { category: Category; searchTerm: string }) => {
  if (category.articles.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="mb-4 font-semibold">{category.title}</h2>
      <div
        className="w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        style={{ display: "grid", gridAutoRows: "160px" }}
      >
        {category.articles.map((article) => (
          <Link
            key={article.slug}
            href={article.url}
            className="button filled box-border! flex! h-full! w-full! items-center! justify-center! p-12! text-center text-xl!"
          >
            {renderHighlightedText(article.title, searchTerm)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function ArticlesIndex({ categories, recaptcha_site_key }: ArticlesIndexProps) {
  const { current_user } = usePage().props;
  console.log("ArticlesIndex props:", { current_user, recaptcha_site_key });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isUnauthenticatedNewTicketOpen, setIsUnauthenticatedNewTicketOpen] = React.useState(false);

  const filteredCategories = searchTerm
    ? categories.map((category) => ({
        ...category,
        articles: category.articles.filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase())),
      }))
    : categories;

  return (
    <>
      <PageHeader
        title="Help Center"
        actions={
          <>
            <NavigationButton
              color="accent"
              outline
              href="https://github.com/antiwork/gumroad/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 98 96"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                  fill="currentColor"
                />
              </svg>
              Report a bug
            </NavigationButton>
            {!current_user ? (
              <Button color="accent" onClick={() => setIsUnauthenticatedNewTicketOpen(true)}>
                Contact support
              </Button>
            ) : (
              <Button color="accent" onClick={() => (window.location.href = "/support?new_ticket=true")}>
                New ticket
              </Button>
            )}
          </>
        }
      />
      {!current_user && (
        <UnauthenticatedNewTicketModal
          open={isUnauthenticatedNewTicketOpen}
          onClose={() => setIsUnauthenticatedNewTicketOpen(false)}
          onCreated={() => setIsUnauthenticatedNewTicketOpen(false)}
          recaptchaSiteKey={recaptcha_site_key ?? null}
        />
      )}
      <section className="p-4 md:p-8">
        <input
        type="text"
        autoFocus
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search articles..."
        className="w-full"
      />
      <div className="mt-12 space-y-12">
        {filteredCategories.map((category) => (
          <CategoryArticles key={category.slug} category={category} searchTerm={searchTerm} />
        ))}
      </div>
      </section>
    </>
  );
}
