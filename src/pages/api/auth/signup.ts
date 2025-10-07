import type { NextApiRequest, NextApiResponse } from "next";
import { addUser } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    password,
    role,
  };

  addUser(newUser);
  return res.status(201).json({ message: "User created successfully" });
}
