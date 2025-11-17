export interface User {
    name: string;
    email: string;
}

export interface Customer {
    id: number;
    user_id: string;
    created_at: string;
    updated_at: string;
    user: User;
}

export interface CustomerFormData {
    name: string;
    email: string;
}