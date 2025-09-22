export interface News {
  id: number;
  title: { en: string; ru: string; uz: string };
  description: { en: string; ru: string; uz: string };
  url: string;
  image: string;
  category: string;
  created_at: string;
  status?: "Published" | "Unpublished";
  slug: string;
  contents: SecContent[];
  redirectLink?: string;
}

export interface NewsResponse {
  news: News[];
  page: number;
  limit: number;
  totalNews: number;
  totalPages: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  color: string;
  category: string;
}

export type ContentItem =
  | {
      type: "title" | "newsText";
      content: string;
      order: number;
    }
  | {
      type: "image";
      content: string[];
      order: number;
    }
  | {
      type: "link";
      content: {
        label: string;
        url: string;
      };
      order: number;
    };

export interface NewsData {
  mainTitle: { en: string; ru: string; uz: string };
  description: { en: string; ru: string; uz: string };
  slug: string;
  mainImage: string;
  contents: SecContent[];
  link: string;
}

export type User = {
  user: {
    id: number;
    email: string;
    name: string;
    image: string;
    role: "admin" | "user";
  };
};

export type SecContentItem =
  | string[]
  | {
      en: string;
      ru: string;
      uz: string;
    }
  | {
      label: {
        en: string;
        ru: string;
        uz: string;
      };
      url: string;
    };

export interface SecContent {
  type: "title" | "text" | "image" | "link";
  content: SecContentItem;
  order: number;
}

export interface ContentAdder {
  type: "title" | "text" | "image" | "link";
  label: string;
  icon: React.ReactNode;
}

export interface RequestNews {
  id?: number;
  title: { en: string; ru: string; uz: string };
  description: { en: string; ru: string; uz: string };
  image: string;
  category?: string;
  status?: "Published" | "Unpublished";
  slug: string;
  contents: SecContent[];
  redirectLink?: string;
}

export interface NewsResponse {
  id: number;
  mainTitle: string;
  title: string;
  description: string;
  url: string;
  mainImage: string;
  category: string;
  created_at: string;
  newsText: string;
  status?: "Published" | "Unpublished";
  slug: string;
  contents: SecContent[];
  redirectLink?: string;
}
