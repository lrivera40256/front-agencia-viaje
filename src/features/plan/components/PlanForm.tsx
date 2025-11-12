import { Form } from "@/components/form/Form"
import { FormField } from "@/components/form/types"
import { usePlan } from "../contexts/PlanContex";

export const PlanForm = () => {
    const { planToEdit,onSubmit,setShowForm  } = usePlan();
    const fields = [
        { name: "name", label: "Nombre", required: true, type: "text" },
        { name: "description", label: "Descripción", type: "textarea", required: true },
        { name: "price", label: "Precio", required: true, type: "number" },
        { name: "duration_days", label: "Duración (días)", required: true, type: "number" },
        { name: "is_active", label: "Estado", required: true, type: "select", options: [
            { value: "true", label: "Activo" },
            { value: "false", label: "Inactivo" },
        ] },
    ] as FormField[];
    return (
        <Form
            title={planToEdit ? "Editar plan" : "Nuevo plan"}
            fields={fields}
            initialValues={planToEdit || { name: "", description: "" }}
            onSubmit={onSubmit}
            onCancel={() =>setShowForm(false)}
            submitText={planToEdit ? "Actualizar" : "Crear"}
        />
    )
}