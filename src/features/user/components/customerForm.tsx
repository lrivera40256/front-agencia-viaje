import { Form } from "@/components/form/Form";
import { FormField } from "@/components/form/types";
import { useCustomer } from "../context/customerContext";

export const CustomerForm = () => {
    const { customerToEdit,onSubmit,setShowForm  } = useCustomer();
    const fields = [
        { name: "name", label: "Nombre", required: true, type: "text" },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Teléfono", required: true, type: "text" },
        { name: "identification_number", label: "Número de identificación", required: true, type: "text" },
        { name: "document_type", label: "Tipo de documento", required: true, type: "select", options: [
            { value: "CC", label: "Cédula de Ciudadanía" },
            { value: "TI", label: "Tarjeta de Identidad" },
            { value: "CE", label: "Cédula de Extranjería" },
        ] },
        { name: "birth_date", label: "Fecha de nacimiento", required: true, type: "date" },
    ] as FormField[];
    return (
        <Form
            title={customerToEdit ? "Editar cliente" : "Nuevo cliente"}
            fields={fields}
            initialValues={customerToEdit || { name: "",email:"",phone:"",identification_number:"",document_type:"",birth_date:new Date() }}
            onSubmit={onSubmit} 
            onCancel={() =>setShowForm(false)}
            submitText={customerToEdit ? "Actualizar" : "Crear"}
        />
    )   
}