export interface News {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  category: string;
  created_at: string;
  newsText: string;
  status: "published" | "unpublished";
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
  mainTitle: string;
  mainNewsText: string;
  mainImage: string;
  contents: ContentItem[];
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
