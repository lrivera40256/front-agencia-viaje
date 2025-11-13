import { Form } from "@/components/form/Form";
import { FormField } from "@/components/form/types";    
import type { ServiceTransportation } from "@/features/transportation/types/ServiceTransportation";

interface Props {
  initial?: Partial<ServiceTransportation> | null;
  onSubmit: (v: ServiceTransportation) => Promise<void> | void;
  onCancel: () => void;
}

const formatDateInput = (iso?: string) => (iso ? new Date(iso).toISOString().slice(0, 10) : "");
const toISO = (d?: string) => (d ? new Date(d).toISOString() : "");

export function ServiceTransportationForm({ initial, onSubmit, onCancel }: Props) {
  const fields = [
    { name: "startDate", label: "Fecha inicio", type: "date", required: true },
    { name: "endDate", label: "Fecha fin", type: "date", required: true },
    { name: "cost", label: "Costo", type: "text", required: true },
    { name: "transportation_id", label: "ID transporte", type: "text", required: true },
    { name: "journey_id", label: "ID trayecto", type: "text", required: true },
  ] as FormField[];

  const initialValues: any = initial
    ? {
        ...initial,
        startDate: formatDateInput(initial.start_date),
        endDate: formatDateInput(initial.end_date),
      }
    : {
        startDate: formatDateInput(new Date().toISOString()),
        endDate: formatDateInput(new Date().toISOString()),
        cost: 0,
        transportation_id: undefined,
        journey_id: undefined,
      };

  const submit = async (values: any) => {
    const payload: ServiceTransportation = {
      ...(initial || {}),
      ...values,
      startDate: formatDateInput(values.startDate),
      endDate: formatDateInput(values.endDate),
      cost: Number(values.cost) || 0,
    } as ServiceTransportation;
    await onSubmit(payload);
  };

  return (
    <Form<ServiceTransportation>
      title={initial?.id ? "Editar servicio" : "Nuevo servicio"}
      fields={fields}
      initialValues={initialValues}
      onSubmit={submit as any}
      onCancel={onCancel}
      submitText={initial?.id ? "Actualizar" : "Crear"}
    />
  );
}

export default ServiceTransportationForm;
