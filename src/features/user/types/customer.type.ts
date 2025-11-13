export interface Customer {
    id?: number;
    name: string;
    email: string;
    phone: string;
    identification_number: string;
    document_type: string;
    birth_date: Date | string;
}