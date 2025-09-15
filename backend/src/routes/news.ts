import express from "express";
import pool from "../mysql/mysql";

const newsRouter = express.Router();

newsRouter.get("/", async (req: any, res: any) => {
  try {
    const [rows] = await pool.query<any[]>("SELECT * FROM news");

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

    const [rows] = await pool.query<any[]>(
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
          : row.content.value,
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
    const [rows] = await pool.query<any[]>("SELECT * FROM categories");

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

export { newsRouter };
