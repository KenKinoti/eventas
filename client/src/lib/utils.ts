import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return date;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function generateQRCode(text: string): string {
  // In a real app, this would generate a QR code or use a QR code API
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
}

export const categoryIcons: Record<string, string> = {
  networking: "users",
  music: "music",
  business: "briefcase",
  arts: "palette",
  health: "heart",
  technology: "cpu",
  // Add more as needed
};
