"use client"

import { cloneElement, isValidElement } from "react"
import { cn } from "@/lib/utils"
import { useFormField } from "./form-field"

/* LABEL */
export function FormLabel({
  children,
  required,
  className,
}: {
  children: React.ReactNode
  required?: boolean
  className?: string
}) {
  const { id } = useFormField()

  return (
    <label
      htmlFor={id}
      className={cn(
        "text-[var(--field-label-size)]",
        "font-[var(--field-label-weight)]",
        "text-[var(--field-label-color)]",
        className
      )}
    >
      {children}
      {required && (
        <span className="ml-1 text-red-500">*</span>
      )}
    </label>
  )
}

/* CONTROL */
export function FormControl({
  children,
}: {
  children: React.ReactNode
}) {
  const { id, error, description } =
    useFormField()

  const descriptionId = description
    ? `${id}-description`
    : undefined

  const errorId = error
    ? `${id}-error`
    : undefined

  const describedBy = [descriptionId, errorId]
    .filter(Boolean)
    .join(" ")

  if (!isValidElement(children)) return children

  return cloneElement(children as any, {
    id,
    "aria-invalid": !!error,
    "aria-describedby": describedBy || undefined,
  })
}

/* DESCRIPTION */
export function FormDescription({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { id, error } = useFormField()

  if (error) return null

  return (
    <p
      id={`${id}-description`}
      className={cn(
        "text-[var(--field-description-size)]",
        "text-[var(--field-description-color)]",
        className
      )}
    >
      {children}
    </p>
  )
}

/* ERROR */
export function FormError({
  className,
}: {
  className?: string
}) {
  const { id, error } = useFormField()

  if (!error) return null

  return (
    <p
      id={`${id}-error`}
      role="alert"
      className={cn(
        "text-[var(--field-error-text-size)]",
        "font-[var(--field-error-weight)]",
        "text-[var(--field-error-color)]",
        className
      )}
    >
      {error}
    </p>
  )
}