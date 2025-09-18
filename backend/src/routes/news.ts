import express from "express";
import { query } from "../middlewares/helper";

import {
  createContents,
  createNews,
  publishNews,
  unPublishNews,
} from "../models/news";

const newsRouter = express.Router();

newsRouter.get("/", async (req: any, res: any) => {
  try {
    const rows = await query<any[]>("SELECT * FROM news");

    if (rows.length === 0) {
      res.status(404).json({ error: "No news found" });
    }

    res.status(200).json(rows);
  } catch (error: any) {
    if (res.status) {
      res.status(500).json({ error: error.message });
    } else {
      throw new Error(error.message);
    }
  }
});

newsRouter.get("/each/:id", async (req: any, res: any) => {
  try {
    const newsId = req.params.id;

    const rows = await query<any[]>(
      `SELECT n.id, n.title, n.newsText, n.image, n.created_at, n.category, n.description,
              c.type, c.content, c.\`order\`
       FROM news n
       JOIN contents c ON n.id = c.newsId
       WHERE n.id = ?
       ORDER BY c.\`order\``,
      [newsId]
    );

    if ((rows as any[]).length === 0) {
      return res.status(404).json({ message: "News not found" });
    }

    const base = rows[0];

    const contents = rows.map((row) => ({
      type: row.type,
      content:
        row.type === "image"
          ? row.content
          : row.type === "link"
          ? { label: row.content.label, url: row.content.url }
          : row.content,
      order: row.order,
    }));

    const result = {
      id: base.id,
      mainTitle: base.title,
      mainNewsText: base.newsText,
      mainImage: base.image,
      description: base.description,
      category: base.category,
      createdAt: base.createdAt,
      contents: contents,
    };

    res.status(200).json(result);
  } catch (err: any) {
    if (res.status) {
      res.status(500).json({ error: err.message });
    } else {
      throw new Error(err.message);
    }
  }
});

newsRouter.get("/categories", async (req: any, res: any) => {
  try {
    const rows = await query<any[]>("SELECT * FROM categories");

    if (rows.length === 0) {
      res.status(404).json({ error: "No news found" });
    }

    res.status(200).json(rows);
  } catch (error: any) {
    if (res.status) {
      res.status(500).json({ error: error.message });
    } else {
      throw new Error(error.message);
    }
  }
});

newsRouter.post("/create", async (req: any, res: any) => {
  try {
    const { title, description, image, redirectLink, slug, contents } =
      req.body;

    if (!image || !slug || !title || !description || !contents || !redirectLink)
      return res.status(400).json({ error: "Invalid request" });

    const category = req.body.category || "noCategory";
    const status = req.body.status || "Unpublished";

    const newsId = await createNews({
      title,
      description,
      image,
      category,
      status,
      redirectLink,
      slug,
      contents,
    });

    if (!newsId)
      return res.status(400).json({ error: "database insert error" });

    await createContents(contents, newsId);

    return res.status(201).json({ newsId });
  } catch (error: any) {
    if (res.status) {
      res.status(500).json({ error: error.message });
    } else {
      throw new Error(error.message);
    }
  }
});

newsRouter.put("/publish", async (req: any, res: any) => {
  try {
    const { id } = req.body;

    const newsId = await publishNews(id);

    res.status(200).json({ newsId });
  } catch (error: any) {
    if (res.status) {
      res.status(500).json({ error: error.message });
    } else {
      throw new Error(error.message);
    }
  }
});

newsRouter.put("/unpublish", async (req: any, res: any) => {
  try {
    const { id } = req.body;
    console.log('id', id)

    const newsId = await unPublishNews(id);

    res.status(200).json({ newsId });
  } catch (error: any) {
    if (res.status) {
      res.status(500).json({ error: error.message });
    } else {
      throw new Error(error.message);
    }
  }
});

export { newsRouter };
