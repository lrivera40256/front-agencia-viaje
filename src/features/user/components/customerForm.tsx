import { Form } from '@/components/form/Form';
import { FormField } from '@/components/form/types';
import { useCustomer } from '../context/customerContext';

export interface CustomerFormData {
  user_id: string;
}

export const CustomerForm = () => {
  const { customerToEdit, onSubmit, setShowForm, usersNoCustomer } = useCustomer();

  const fields: FormField[] = [
    {
      name: 'user_id',
      label: 'Usuario (correo)',
      required: true,
      type: 'select',
      options:
        usersNoCustomer?.map((u) => ({
          label: u.email,
          value: u._id,
        })) || [],
    },
  ];

  return (
    <Form
      fields={fields}
      initialValues={{
        user_id: customerToEdit?.user_id || "",
      }}
      onSubmit={onSubmit}
      onCancel={() => setShowForm(false)}
      title={customerToEdit ? "Editar cliente" : "Nuevo cliente"}
    />
  );
};

