import { ResultSetHeader } from "mysql2";
import { query } from "../middlewares/helper";

export const createNews = async (news: any) => {
  try {
    const {
      title,
      description,
      image,
      category,
      status,
      redirectLink,
      slug,
      contents,
    } = news;

    const newsId = await query(
      `INSERT INTO news (title, description, image, category, status, redirectLink, slug) 
        VALUES (:title, :description, :image, :category, :status, :redirectLink, :slug)`,
      {
        title: title,
        description: description,
        image: image,
        category: category,
        status: status,
        redirectLink: redirectLink,
        slug: slug,
      }
    );

    if ("insertId" in newsId) {
      return newsId.insertId as string;
    }

    return "";
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createContents = async (contents: any, newsId: string) => {
  try {
    for (const content of contents) {
      await query(
        "INSERT INTO contents (newsId, type, content, `order`) VALUES (:newsId, :type, :content, :order)",
        {
          newsId,
          type: content.type === "text" ? "newsText" : content.type,
          content: JSON.stringify(content.content),
          order: content.order,
        }
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
