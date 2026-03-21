"use client"

import { createContext, useContext, useId } from "react"

interface FormFieldContextValue {
  id: string
  error?: string
  description?: string
}

export const FormFieldContext =
  createContext<FormFieldContextValue | null>(null)

export function useFormField() {
  const context = useContext(FormFieldContext)

  if (!context) {
    throw new Error(
      "FormField components must be used inside <FormField>"
    )
  }

  return context
}

interface FormFieldProps {
  error?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function FormField({
  error,
  description,
  children,
  className,
}: FormFieldProps) {
  const id = useId()

  return (
    <FormFieldContext.Provider
      value={{ id, error, description }}
    >
      <div className={className}>{children}</div>
    </FormFieldContext.Provider>
  )
}