"use client"
import React, { useState } from "react"
import { FormFieldItem } from "./FormField"
import type { FormProps } from "./types"

export function Form<T extends Record<string, any>>({
  title,
  fields,
  initialValues = {},
  onSubmit,
  onCancel,
  submitText = "Guardar",
  cancelText = "Cancelar",
  loading: externalLoading,
  renderField,
}: FormProps<T>) {
  const [values, setValues] = useState<Partial<T>>(initialValues)
  const [loading, setLoading] = useState(false)

  const handleChange = (name: string, value: any) => {
    console.log(name,value);
    
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting form with values:", values);
    
    setLoading(true)
    await onSubmit(values as T)
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-full sm:max-w-md mx-auto max-h-[70vh] overflow-auto"
    >
      <h2 className="text-xl font-bold mb-4 text-center text-gray-700">{title}</h2>

      {fields.map((f) => (
        <div key={f.name} className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">{f.label}</label>
          {renderField
            ? renderField(f, (values as any)[f.name], handleChange)
            : (
              <FormFieldItem
                field={f}
                value={(values as any)[f.name]}
                onChange={(name, value, event) => {
                  f.onChange?.(event)

                  handleChange(name, value)
                }}
              />
            )}
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading || externalLoading}
            className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded font-semibold hover:bg-gray-300 transition"
          >
            {cancelText}
          </button>
        )}
        <button
          type="submit"
          disabled={loading || externalLoading}
          className={`${onCancel ? "w-1/2" : "w-full"} bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition`}
        >
          {loading || externalLoading ? "Procesando..." : submitText}
        </button>
      </div>
    </form>
  )
}
