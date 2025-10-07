type Role = "admin" | "freelancer" | "client";

interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
}

const users: User[] = [
  { id: "1", email: "admin@test.com", password: "admin123", role: "admin" },
  {
    id: "2",
    email: "freelancer@test.com",
    password: "freelancer123",
    role: "freelancer",
  },
  { id: "3", email: "client@test.com", password: "client123", role: "client" },
];

export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email);
}

export function addUser(user: User): void {
  users.push(user);
}
