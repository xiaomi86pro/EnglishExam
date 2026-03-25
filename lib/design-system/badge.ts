export type BadgeTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "purple";

export type BadgeVariant = "solid" | "subtle";

export type BadgeSize = "sm" | "md";

export interface BadgeStyle {
  solid: string;
  subtle: string;
}

export const BADGE_TONE_STYLES: Record<BadgeTone, BadgeStyle> = {
  neutral: {
    solid: "bg-gray-600 text-white",
    subtle: "bg-gray-100 text-gray-700 border-gray-200",
  },
  info: {
    solid: "bg-blue-600 text-white",
    subtle: "bg-blue-100 text-blue-700 border-blue-200",
  },
  success: {
    solid: "bg-emerald-600 text-white",
    subtle: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  warning: {
    solid: "bg-amber-500 text-white",
    subtle: "bg-amber-100 text-amber-700 border-amber-200",
  },
  danger: {
    solid: "bg-red-600 text-white",
    subtle: "bg-red-100 text-red-700 border-red-200",
  },
  purple: {
    solid: "bg-purple-600 text-white",
    subtle: "bg-purple-100 text-purple-700 border-purple-200",
  },
};

export const BADGE_SIZE_STYLES: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs rounded-md",
  md: "px-2.5 py-1 text-sm rounded-md",
};