import { Form } from "@/components/form/Form";
import { FormField } from "@/components/form/types";
import { useCustomer } from "../context/customerContext";

export const CustomerForm = () => {
    const { customerToEdit,onSubmit,setShowForm  } = useCustomer();
    const fields = [
        { name: "name", label: "Nombre", required: true, type: "text" },
        { name: "email", label: "Email", type: "email", required: true },
    ] as FormField[];
    return (
        <Form
            title={customerToEdit ? "Editar cliente" : "Nuevo cliente"}
            fields={fields}
            initialValues={customerToEdit ? { name: customerToEdit.user.name, email: customerToEdit.user.email } : { name: "", email: "" }}
            onSubmit={onSubmit} 
            onCancel={() =>setShowForm(false)}
            submitText={customerToEdit ? "Actualizar" : "Crear"}
        />
    )   
}