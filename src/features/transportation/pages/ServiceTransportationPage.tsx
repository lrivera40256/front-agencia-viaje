import { LoadingOverlay } from "@/components/Loader";
import ServiceTransportationTable from "@/features/transportation/components/ServiceTransportationTable";
import ServiceTransportationForm from "@/features/transportation/components/ServiceTransportationForm";
import useServiceTransportation from "@/features/transportation/hooks/useServiceTransportation";
import { useJourney } from "@/features/journeys";
import { useVehicle } from "@/features/vehicle-management/hooks/useVehicle";

export default function ServiceTransportationPage() {
  const {
    items,
    loading,
    showForm,
    itemToEdit,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    setShowForm,
  } = useServiceTransportation();

  const {journeys} = useJourney()

  const { vehicles } = useVehicle();

  return (
    <div>
      {loading && <LoadingOverlay />}

      <ServiceTransportationTable
        items={items}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-3 w-full max-w-xs my-12">
            <ServiceTransportationForm
              initial={itemToEdit ?? undefined}
              onSubmit={async (v) => handleSubmit(v as any)}
              onCancel={() => setShowForm(false)}
              journeys={journeys}
              vehicles={vehicles}
            />
          </div>
        </div>
      )}
    </div>
  );
}
