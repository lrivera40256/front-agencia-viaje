import { Form } from "@/components/form/Form";
import { FormField } from "@/components/form/types";
import type { TouristActivity } from "@/features/tourist-activities/types/TouristActivity";

export function TouristActivityForm({ initial, onSubmit, onCancel, fields }: {
  initial?: TouristActivity;
  onSubmit: (r: TouristActivity) => Promise<void> | void;
  onCancel: () => void;
  fields: FormField[];
}) {
  const initialValues = initial || { name: "", description: "", city_id: 0, price: 0, is_active: true, departament_id: "" };

  const handleSubmit = (formData: any) => {
    const activityData: TouristActivity = {
      ...initial,
      name: formData.name,
      description: formData.description,
      city_id: parseInt(formData.city_id),
      price: parseFloat(formData.price),
      is_active: formData.is_active,
    };
    onSubmit(activityData);
  };

  return (
    <Form
      title={initial ? "Editar Actividad" : "Nueva Actividad"}
      fields={fields}
      initialValues={initialValues as any}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitText={initial ? "Actualizar" : "Crear"}
    />
  );
}

export default TouristActivityForm;
