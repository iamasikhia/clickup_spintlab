import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

import { readUsers, writeUsers } from "../../../lib/db";

type User = {
  id: string;
  email: string;
  password: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const users: User[] = await readUsers();

    const existingUser = users.find((user: User) => user.email === email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: uuidv4(),
      email,
      password: hashedPassword,
    };

    users.push(newUser);
    await writeUsers(users);

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
