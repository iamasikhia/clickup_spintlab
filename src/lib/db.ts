// src/lib/db.ts
export type Role = "admin" | "freelancer" | "client";

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
}

// Sample in-memory user DB for MVP
const users: User[] = [
  { id: "1", email: "admin@test.com", password: "admin123", role: "admin" },
  { id: "2", email: "freelancer@test.com", password: "freelancer123", role: "freelancer" },
  { id: "3", email: "client@test.com", password: "client123", role: "client" },
];

// Biome-friendly function to find user by email
export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

// Optional: export all users for admin panel
export function getAllUsers(): User[] {
  return [...users];
}
