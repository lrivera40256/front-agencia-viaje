import { Form } from "@/components/form/Form";
import { FormField } from "@/components/form/types";
import type { BankCard } from "@/features/bank-cards/types/BankCard";

export function BankCardForm({ initial, onSubmit, onCancel, fields }: {
  initial?: BankCard;
  onSubmit: (r: BankCard) => Promise<void> | void;
  onCancel: () => void;
  fields: FormField[];
}) {
  const initialValues = initial || {
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

  return (
    <Form
      title={initial ? "Editar Tarjeta" : "Nueva Tarjeta"}
      fields={fields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitText={initial ? "Actualizar" : "Crear"}
    />
  );
}

export default BankCardForm;
