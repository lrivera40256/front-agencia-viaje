import React from "react"
import type { FormField } from "./types"

interface Props {
  field: FormField
  value: any
  onChange: (name: string, value: any, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

export function FormFieldItem({ field, value, onChange }: Props) {
  const base = "w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200 border-gray-300"

  const handleChange = (e: React.ChangeEvent<any>) => {
    onChange(field.name, e.target.value, e)
  }

  switch (field.type) {
    case "select":
      return (
        <select
          name={field.name}
          value={value ?? ""}
          onChange={handleChange}
          required={field.required}
          className={base}
        >
          <option value="">Seleccione una opción</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )

    case "textarea":
      return (
        <textarea
          name={field.name}
          placeholder={field.placeholder}
          value={value ?? ""}
          onChange={handleChange}
          required={field.required}
          className={base}
        />
      )

    default:
      return (
        <input
          type={field.type || "text"}
          name={field.name}
          placeholder={field.placeholder}
          value={value ?? ""}
          onChange={handleChange}
          required={field.required}
          className={base}
        />
      )
  }
}
