export interface User {
    name: string;
    email: string;
}

export interface Customer extends User {
    id: number;
    user_id: string;
    created_at: string;
    updated_at: string;
    
}



export interface CustomerFormData {
    name: string;
    email: string;
}