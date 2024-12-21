import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
const monthNames = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May.",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day}. ${month} ${year}`;
}

export function formatDateTime(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${day}. ${month} ${year} ${hours}:${minutes} ${period}`;
}
