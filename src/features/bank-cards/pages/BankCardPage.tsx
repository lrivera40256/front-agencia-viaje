import { useParams } from "react-router";
import { LoadingOverlay } from "@/components/Loader";
import { BankCardForm } from "@/features/bank-cards/components/BankCardForm";
import { BankCardTable } from "@/features/bank-cards/components/BankCardTable";
import useBankCard from "@/features/bank-cards/hooks/useBankCard";
import { FormField } from "@/components/form/types";

export default function BankCardPage() {
  const params = useParams();
  const customerId = params.customerId;
  const {
    cards,
    loading,
    showForm,
    cardToEdit,
    handleSubmit,
    handleAdd,
    handleDelete,
    handleEdit,
    handleSearch,
    setShowForm,
  } = useBankCard(customerId);

  const fields = [
    { name: "card_holder", label: "Titular", required: true, type: "text" },
    { name: "provider", label: "Proveedor", required: true, type: "text" },
    { name: "card_number", label: "Número de tarjeta", required: true, type: "text" },
    { name: "expiration_date", label: "Fecha expiración", required: true, type: "text" },
    { name: "cvv", label: "CVV", type: "text" },
    { name: "card_type", label: "Tipo de tarjeta", type: "select", options: [
            { value: "debit", label: "Débito" },
            { value: "credit", label: "Crédito" },
        ] },
    { name: "status", label: "Estado", type: "select", options: [
            { value: "active", label: "Activo" },
            { value: "inactive", label: "Inactivo" },
            { value: "blocked", label: "Bloqueado" },
        ] },
    { name: "customer_id", label: "Cliente (id)", type: "number", required: true },
  ] as FormField[];

  return (
    <div>
      {loading && <LoadingOverlay />}

      <BankCardTable
        cards={cards}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearch={handleSearch}
      />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-3 w-full max-w-xs my-12">
            <BankCardForm
              fields={fields}
              initial={cardToEdit as any}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
