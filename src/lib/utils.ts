import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type ClickUpTask = {
  id: string;
  name: string;
  status: { status: string };
  date_created: string;
};

export async function getClickUpTasks(): Promise<ClickUpTask[]> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch("/api/clickup/tasks", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch ClickUp task");
  }

  const data = await response.json();

  return data.tasks ?? data;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatSeconds = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const hh = h.toString().padStart(2, "0");
  const mm = m.toString().padStart(2, "0");
  const ss = s.toString().padStart(2, "0");

  return `${hh}:${mm}:${ss}`;
};
