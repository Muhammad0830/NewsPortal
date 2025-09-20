import { ResultSetHeader } from "mysql2";
import { query } from "../middlewares/helper";

export const createNews = async (news: any) => {
  try {
    const { title, description, image, category, status, redirectLink, slug } =
      news;

    const newsId = await query(
      `INSERT INTO news (title, description, image, category, status, redirectLink, slug) 
        VALUES (:title, :description, :image, :category, :status, :redirectLink, :slug)`,
      {
        title: JSON.stringify(title),
        description: JSON.stringify(description),
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
          type: content.type,
          content: JSON.stringify(content.content),
          order: content.order,
        }
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const publishNews = async (id: number) => {
  try {
    await query<any[]>("UPDATE news SET status = 'Published' WHERE id = ?", [
      id,
    ]);

    return id;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const unPublishNews = async (id: number) => {
  try {
    await query<any[]>("UPDATE news SET status = 'Unpublished' WHERE id = ?", [
      id,
    ]);

    return id;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const UpdateNews = async (news: any) => {
  try {
    const {
      id,
      title,
      description,
      image,
      category,
      status,
      redirectLink,
      slug,
    } = news;

    await query(
      `UPDATE news SET title = :title, description = :description, image = :image, category = :category, status = :status, redirectLink = :redirectLink, slug = :slug 
      WHERE id = :id`,
      {
        id: id,
        title: JSON.stringify(title),
        description: JSON.stringify(description),
        image: image,
        category: category,
        status: status,
        redirectLink: redirectLink,
        slug: slug,
      }
    );
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateContents = async (contents: any, newsId: string) => {
  try {
    await query(`DELETE FROM contents WHERE newsId = :newsId`, {
      newsId,
    });

    await createContents(contents, newsId);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteNews = async (id: number) => {
  try {
    await query(`DELETE FROM news WHERE id = :id`, {
      id,
    });

    await query(`DELETE FROM contents WHERE newsId = :id`, {
      id,
    });

    return id;
  } catch (error: any) {
    throw new Error(error);
  }
};
