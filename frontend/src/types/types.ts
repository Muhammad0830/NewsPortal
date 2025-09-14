export interface News {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  category: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  color: string;
  category: string;
}
