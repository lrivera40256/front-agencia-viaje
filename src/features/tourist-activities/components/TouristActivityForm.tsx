import { Form } from "@/components/form/Form";
import { FormField } from "@/components/form/types";
import type { TouristActivity } from "@/features/tourist-activities/types/TouristActivity";

export function TouristActivityForm({ initial, onSubmit, onCancel, fields }: {
  initial?: TouristActivity;
  onSubmit: (r: TouristActivity) => Promise<void> | void;
  onCancel: () => void;
  fields: FormField[];
}) {
  const initialValues = initial || { name: "", description: "", city_id: 0, price: 0, is_active: true };

  return (
    <Form
      title={initial ? "Editar Actividad" : "Nueva Actividad"}
      fields={fields}
      initialValues={initialValues as any}
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitText={initial ? "Actualizar" : "Crear"}
    />
  );
}

export default TouristActivityForm;
