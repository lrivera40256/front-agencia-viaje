export interface Option {
	value: string;
	label: string;
}

export type FieldType = 'text' | 'email' | 'password' | 'textarea' | 'select';

export interface FormField {
	name: string;
	label: string;
	type?: FieldType;
	placeholder?: string;
	options?: Option[];
	required?: boolean;
	onChange?: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => void;
}

export interface FormProps<T> {
	title: string;
	fields: readonly FormField[];
	initialValues?: Partial<T>;
	onSubmit: (values: T) => Promise<void> | void;
	onCancel?: () => void;
	submitText?: string;
	cancelText?: string;
	loading?: boolean;
	renderField?: (
		field: FormField,
		value: any,
		handleChange: (name: string, value: any) => void
	) => React.ReactNode;
}
