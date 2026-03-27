"use client"

import React from "react"
import { cn } from "@/lib/utils"

/* =========================================================
   TYPES
   ========================================================= */

export interface QuestionCardProps {
  id: string
  content: React.ReactNode

  // meta
  difficulty?: "easy" | "medium" | "hard"
  type?: string

  // state
  isSelected?: boolean
  isCorrect?: boolean
  isWrong?: boolean

  // actions
  onClick?: () => void

  className?: string
}

/* =========================================================
   STYLE TOKENS (global.css)

   Add these to your @/styles/global.css (under :root or theme scope)
   ========================================================= */

/*
:root {
  --card-bg: hsl(var(--background));
  --card-border: hsl(var(--border));
  --card-hover: hsl(var(--muted));

  --color-success: hsl(var(--success));
  --color-danger: hsl(var(--destructive));
  --color-primary: hsl(var(--primary));
}
*/

function getStateStyle(props: QuestionCardProps) {
  const { isSelected, isCorrect, isWrong } = props

  if (isCorrect) {
    return "border-[var(--color-success)] bg-[var(--color-success)]/10"
  }

  if (isWrong) {
    return "border-[var(--color-danger)] bg-[var(--color-danger)]/10"
  }

  if (isSelected) {
    return "border-[var(--color-primary)] bg-[var(--color-primary)]/10"
  }

  return "border-[var(--card-border)] bg-[var(--card-bg)]"
}

function getDifficultyBadge(difficulty?: string) {
  switch (difficulty) {
    case "easy":
      return "bg-green-100 text-green-700"
    case "medium":
      return "bg-yellow-100 text-yellow-700"
    case "hard":
      return "bg-red-100 text-red-700"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

/* =========================================================
   COMPONENT
   ========================================================= */

export function QuestionCard(props: QuestionCardProps) {
  const {
    id,
    content,
    difficulty,
    type,
    onClick,
    className,
  } = props

  return (
    <div
      role="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl border p-4 transition-all duration-200",
        "hover:shadow-md cursor-pointer",
        "flex flex-col gap-3",
        getStateStyle(props),
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground">
          Question #{id}
        </span>

        <div className="flex items-center gap-2">
          {type && (
            <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
              {type}
            </span>
          )}

          {difficulty && (
            <span
              className={cn(
                "text-xs px-2 py-1 rounded-md",
                getDifficultyBadge(difficulty)
              )}
            >
              {difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="text-sm leading-relaxed">
        {content}
      </div>
    </div>
  )
}

/* =========================================================
   USAGE EXAMPLE
   ========================================================= */

// <QuestionCard
//   id="1"
//   content={<p>What is 2 + 2?</p>}
//   difficulty="easy"
//   type="MCQ"
//   isSelected
//   onClick={() => console.log("clicked")}
// />
