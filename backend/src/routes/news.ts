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
