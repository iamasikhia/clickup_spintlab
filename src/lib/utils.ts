import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export type ClickUpTask = {
  id: string;
  name: string;
  status: { status: string };
  date_created: string;
}

export async function getClickUpTasks(): Promise<ClickUpTask[]> {
  const token = typeof window !== "undefined"
  ? localStorage.getItem("accessToken")
  : null;

  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch("/api/clickup/tasks", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch ClickUp task");
  }

  const data = await response.json()

  return data.tasks ?? data;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* export async function AIGeneration(): Promise<ClickUpTask[]> {
  const token = typeof window !== "undefined"
  ? localStorage.getItem("accessToken")
  : null;

  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch("/api/clickup/tasks", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch ClickUp task");
  }

  const data = await response.json()

  return data.tasks ?? data;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} */