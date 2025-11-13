export type DocumentType = 'CC' | 'TI' | 'CE' | 'PAS';

export interface User {
	id?: number;
	name: string;
	email: string;
	phone: string;
	identification_number: string;
	document_type: DocumentType;
	birth_date: string; // Format: yyyy-MM-dd
	createdAt?: string;
	updatedAt?: string;
}

export default User;
