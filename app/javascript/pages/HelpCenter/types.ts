export interface Article {
  title: string;
  slug: string;
  url: string;
  content_html?: string;
}

export interface Category {
  title: string;
  slug: string;
  url: string;
  audience: string;
  articles: Article[];
}
