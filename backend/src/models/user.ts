import { query } from "../middlewares/helper";

export async function findUserByEmail(email: string, role: "admin" | "user") {
  const rows = await query("SELECT * FROM users WHERE email = ? AND role = ?", [
    email,
    role,
  ]);
  const arr = rows as any[];
  return arr[0] ?? null;
}

export async function findUserById(id: number) {
  const rows = await query("SELECT * FROM users WHERE id = ?", [id]);
  const arr = rows as any[];
  return arr[0] ?? null;
}

export async function createUser(
  email: string,
  passwordHash: string,
  name?: string,
  role: "admin" | "user" = "user"
) {
  const res: any = await query(
    "INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?)",
    [email, passwordHash, name ?? null, role]
  );
  return res.insertId as number;
}
