import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export type ClickUpTask = {
  id: string;
  name: string;
  status: { status: string };
  date_created: string;
}

export type GenerationParams = {
  title: string;
  time: number;
  rate: number;
  logs: number;
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

export async function getSmartBilling(params: GenerationParams): Promise<string> {
  const query = new URLSearchParams({
    title: params.title,
    time: params.time.toString(),
    rate: params.rate.toString(),
    logs: params.logs.toString(),
  })
  
  const response = await fetch(`/api/smart-billing?${query.toString()}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to generate contextual description.");
  }

  const data = await response.json();

  return data.description ?? "";
}