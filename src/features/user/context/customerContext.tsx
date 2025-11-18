import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Customer, CustomerFormData } from "../types/customer.type";
import { CustomerService } from "../services";
import { User } from "@/features/users/types/User";


export interface customerContextType {
    customers: Customer[];
    usersNoCustomer: User[]
    loading: boolean;
    addCustomer: () => void;
    editCustomer: (customer: Customer) => void;
    onSubmit: (customerData: CustomerFormData) => Promise<void>;
    customerToEdit: Customer | null;
    showForm: boolean;
    setShowForm: (show: boolean) => void;
    onDelete: (customer: Customer) => Promise<void>;
    fetchCustomers: () => Promise<void>;
}
const CustomerContext = createContext<customerContextType | undefined>(undefined);
export const CustomerProvider = ({ children }: { children: ReactNode }) => {
    const [customers, setCustomers] = useState<Customer[] | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [customerToEdit, setCustomerToEdit] = useState<Customer | null>(null);
    const [usersNoCustomer, setUsersNoCustomer] = useState<User[]>([]);

    const fetchUsersNoCustomer = async () => {
        try {
            setLoading(true);
            const data = await CustomerService.getUserNoCustomer();
            setUsersNoCustomer(data)
        } catch (error) {
            console.error("Error fetching user no customer", error);
        } finally {
            setLoading(false);
        }
    }

    const addCustomer = () => {
        setCustomerToEdit(null);
        setShowForm(true);
    };
    const editCustomer = (customer: Customer) => {
        const customerToEdit = customers?.find((c) => c.id === customer.id);
        if (customerToEdit) {
            setCustomerToEdit(customerToEdit);
        }
        setShowForm(true);
    }
    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const data = await CustomerService.getCustomers();
            setCustomers(data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            setLoading(false);
        }
    };
    const onDelete = async (customer: Customer) => {
        try {
            setLoading(true);
            await CustomerService.deleteCustomer(customer.id!);
            fetchCustomers();
        } catch (error) {
            console.log("Error fetching customer", error);
        } finally {
            setLoading(false);
        }
    };
    const onSubmit = async (customerData: CustomerFormData) => {
        try {
            console.log("Submitting customer:", customerData);
            
            setLoading(true);
            if (customerToEdit?.id) {
                await CustomerService.updateCustomer(customerToEdit.id, customerData);
            } else {
                await CustomerService.createCustomer(customerData);
            }
            fetchCustomers();
            setShowForm(false);
        } catch (error) {
            console.error("Error submitting customer:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        if (!showForm) return
        fetchUsersNoCustomer()
    }, [showForm]);
    return (
        <CustomerContext.Provider
            value={{ customers, loading, addCustomer, editCustomer, onSubmit, customerToEdit, showForm, setShowForm, onDelete, fetchCustomers, usersNoCustomer }}
        >
            {children}
        </CustomerContext.Provider>
    );
};
// Hook de acceso
export const useCustomer = () => {
    const context = useContext(CustomerContext);
    if (!context) {
        throw new Error("useCustomer must be used within a CustomerProvider");
    }
    return context;
};