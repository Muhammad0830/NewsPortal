import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import * as UserModel from "../models/user";
import * as RTModel from "../models/refreshToken";

const authRouter = express.Router();

const COOKIE_NAME = "refreshToken";
const REFRESH_EXPIRES_MS = 1000 * 60 * 60 * 24 * 7;

authRouter.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password, name } = req.body as {
      email: string;
      password: string;
      name: string;
    };

    const role = "user"; //signup is possible only for users --- admins are created at adminPage

    try {
      const existing = await UserModel.findUserByEmail(email, role);
      if (existing)
        return res.status(409).json({ message: "Email already in use" });

      const passwordHash = await bcrypt.hash(password, 10);
      const userId = await UserModel.createUser(
        email,
        passwordHash,
        name,
        role
      );

      const accessToken = createAccessToken({ userId, email, role });
      const refreshToken = createRefreshToken({ userId, email, role });

      const expiresAt = new Date(Date.now() + REFRESH_EXPIRES_MS)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      await RTModel.saveRefreshToken(userId, refreshToken, expiresAt);

      res.cookie(COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: REFRESH_EXPIRES_MS,
      });

      return res
        .status(201)
        .json({ accessToken, user: { id: userId, email, name } });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

authRouter.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body as {
      email: string;
      password: string;
      role: "admin" | "user";
    };

    const role: "admin" | "user" = req.body.role || "user";

    try {
      const user = await UserModel.findUserByEmail(email, role);
      if (!user)
        return res.status(401).json({ message: "Invalid credentials" });

      const ok = await bcrypt.compare(password, user.password_hash);
      if (!ok) return res.status(401).json({ message: "Invalid credentials" });

      const accessToken = createAccessToken({ userId: user.id, email, role });
      const refreshToken = createRefreshToken({ userId: user.id, email, role });

      const expiresAt = new Date(Date.now() + REFRESH_EXPIRES_MS)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      await RTModel.saveRefreshToken(user.id, refreshToken, expiresAt);

      res.cookie(COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: REFRESH_EXPIRES_MS,
      });

      return res.json({
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

authRouter.post("/refresh", async (req: any, res: any) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(401).json({ message: "No refresh token" });

    let payload: any;
    try {
      payload = verifyRefreshToken(token) as any;
    } catch (e) {
      return res
        .status(401)
        .json({ message: "Invalid or expired refresh token" });
    }

    const dbToken = await RTModel.findRefreshToken(token);
    if (!dbToken)
      return res.status(401).json({ message: "Refresh token revoked" });

    await RTModel.deleteRefreshToken(token);

    const newAccessToken = createAccessToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });
    const newRefreshToken = createRefreshToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });
    const expiresAt = new Date(Date.now() + REFRESH_EXPIRES_MS)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    await RTModel.saveRefreshToken(payload.userId, newRefreshToken, expiresAt);

    res.cookie(COOKIE_NAME, newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: REFRESH_EXPIRES_MS,
    });

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

authRouter.post("/logout", async (req: any, res: any) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (token) {
      await RTModel.deleteRefreshToken(token);
    }
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default authRouter;
