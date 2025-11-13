import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Customer } from "../types/customer.type";
import { CustomerService } from "../services";


export interface customerContextType {
    customers: Customer[];
    loading: boolean;
    addCustomer: () => void;
    editCustomer: (customer: Customer) => void;
    onSubmit: (customer: Customer) => Promise<void>;
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


    const addCustomer = () => {
        setCustomerToEdit(null);
        setShowForm(true);
    };
    const editCustomer = (customer: Customer) => {
        const customerToEdit = customers?.find((c) => c.id === customer.id);
        setCustomerToEdit({ ...customerToEdit, birth_date: customerToEdit?.birth_date.toString().slice(0, 10) });
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
    const onSubmit = async (customer: Customer) => {
        try {
            console.log("Submitting customer:", customer);
            
            setLoading(true);
            if (customer.id) {
                await CustomerService.updateCustomer(customer.id, { ...customer , birth_date: customer.birth_date.toString().slice(0, 10)});
            } else {
                await CustomerService.createCustomer(customer);
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
        console.log("Holaaa");
        fetchCustomers();
    }, []);
    return (
        <CustomerContext.Provider
            value={{ customers, loading, addCustomer, editCustomer, onSubmit, customerToEdit, showForm, setShowForm, onDelete, fetchCustomers }}
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