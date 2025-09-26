import React, { useState } from "react";

export interface FormField {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

export interface FormProps<T = any> {
  title: string;
  fields: FormField[];
  initialValues?: Partial<T>;
  onSubmit: (values: T) => Promise<void>;
  submitText?: string;
}

const Form = <T extends Record<string, any>>({
  title,
  fields,
  initialValues = {},
  onSubmit,
  submitText = "Guardar",
}: FormProps<T>) => {
  const [values, setValues] = useState<Partial<T>>(initialValues);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(values as T);
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f4fa]">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">{title}</h2>
        {fields.map((field) => (
          <div key={field.name} className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={field.placeholder}
                value={values[field.name] ?? ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring border-gray-300 focus:ring-blue-200"
              />
            ) : (
              <input
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder}
                value={values[field.name] ?? ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring border-gray-300 focus:ring-blue-200"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition mb-2"
        >
          {loading ? "Procesando..." : submitText}
        </button>
      </form>
    </div>
  );
};

export default Form;

// <Form
//   title="Crear usuario"
//   fields={[
//     { name: "nombre", label: "Nombre" },
//     { name: "email", label: "Email", type: "email" },
//     { name: "descripcion", label: "Descripción", type: "textarea" },
//   ]}
//   initialValues={{ nombre: "", email: "" }}
//   onSubmit={async (values) => { /* lógica de submit */ }}
//   submitText="Crear"
// />