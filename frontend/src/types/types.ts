export interface News {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  category: string;
  created_at: string;
  newsText: string;
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
