import { Form } from "@/components/form/Form";
import { FormField } from "@/components/form/types";
import type { BankCard } from "@/features/bank-cards/types/BankCard";

export function BankCardForm({ initial, onSubmit, onCancel, fields }: {
  initial?: BankCard;
  onSubmit: (r: BankCard) => Promise<void> | void;
  onCancel: () => void;
  fields: FormField[];
}) {
  const defaultValues = {
    card_type: 'debit',
    provider: '',
    card_number: '',
    card_holder: '',
    expiration_date: '',
    cvv: '',
    status: 'active',
    is_default: false,
    customer_id: 0,
  } as any;

  const initialValues = initial ? { ...defaultValues, ...initial } : defaultValues;

  return (
    <Form
      title={initial?.id ? "Editar Tarjeta" : "Nueva Tarjeta"}
      fields={fields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitText={initial?.id ? "Actualizar" : "Crear"}
    />
  );
}

export default BankCardForm;
