import React, { useState } from 'react';

export interface FormField {
	name: string;
	label: string;
	type?: string;
	placeholder?: string;
	options?: { value: string; label: string }[];
	required?: boolean;
}

export interface FormProps<T = any> {
	title: string;
	fields: FormField[];
	initialValues?: Partial<T>;
	onSubmit: (values: T) => Promise<void>;
	submitText?: string;
	onCancel?: () => void; // <-- nuevo
	cancelText?: string; // <-- nuevo
}

const Form = <T extends Record<string, any>>({
	title,
	fields,
	initialValues = {},
	onSubmit,
	submitText = 'Guardar',
	onCancel, // <-- nuevo
	cancelText = 'Cancelar', // <-- nuevo
}: FormProps<T>) => {
	const [values, setValues] = useState<Partial<T>>(initialValues);
	const [loading, setLoading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
		<div className="flex justify-center items-center bg-[#f0f4fa]">
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
						{field.type === 'select' && field.options ? (
							<select
								name={field.name}
								value={(values as any)[field.name] ?? ''}
								onChange={handleChange}
								required={field.required}
								className="w-full px-3 py-2 border rounded focus:outline-none focus:ring border-gray-300 focus:ring-blue-200"
							>
								<option value="">Seleccione una opción</option>
								{field.options.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						) : field.type === 'textarea' ? (
							<textarea
								name={field.name}
								placeholder={field.placeholder}
								value={(values as any)[field.name] ?? ''}
								onChange={handleChange}
								required={field.required}
								className="w-full px-3 py-2 border rounded focus:outline-none focus:ring border-gray-300 focus:ring-blue-200"
							/>
						) : (
							<input
								type={field.type || 'text'}
								name={field.name}
								placeholder={field.placeholder}
								value={(values as any)[field.name] ?? ''}
								onChange={handleChange}
								required={field.required}
								className="w-full px-3 py-2 border rounded focus:outline-none focus:ring border-gray-300 focus:ring-blue-200"
							/>
						)}
					</div>
				))}

				<div className="flex gap-2">
					{onCancel && (
						<button
							type="button"
							disabled={loading}
							onClick={onCancel}
							className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded font-semibold hover:bg-gray-300 transition"
						>
							{cancelText}
						</button>
					)}
					<button
						type="submit"
						disabled={loading}
						className={`${onCancel ? 'w-1/2' : 'w-full'} bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition`}
					>
						{loading ? 'Procesando...' : submitText}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Form;

// Ejemplo de uso:
// <Form
//   title="Crear usuario"
//   fields={[
//     { name: "nombre", label: "Nombre" },
//     { name: "email", label: "Email", type: "email" },
//     { name: "rol", label: "Rol", type: "select", options: [
//         { value: "admin", label: "Administrador" },
//         { value: "user", label: "Usuario" },
//       ]
//     },
//     { name: "descripcion", label: "Descripción", type: "textarea" },
//   ]}
//   initialValues={{ nombre: "", email: "", rol: "", descripcion: "" }}
//   onSubmit={async (values) => { /* lógica de submit */ }}
//   submitText="Crear"
// />

// Otro ejemplo con diferentes tipos de campos:
// const fields: FormField[] = [
//     { name: "nombre", label: "Nombre" },
//     { name: "departamento", label: "Departamento", type: "select", options: departamentos },
//     { name: "email", label: "Email", type: "email" },
//   ];

//   return (
//     <Form
//       title="Crear usuario"
//       fields={fields}
//       initialValues={{ nombre: "", departamento: "", email: "" }}
//       onSubmit={async (values) => {
//         // lógica de submit
//       }}
//       submitText="Crear"
//     />
//   );
