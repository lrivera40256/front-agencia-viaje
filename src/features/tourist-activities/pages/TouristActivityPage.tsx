import { TouristActivityTable } from "@/features/tourist-activities/components/TouristActivityTable";
import { useTouristActivity } from "@/features/tourist-activities/hooks/useTouristActivity";
import { LoadingOverlay } from "@/components/Loader";
import { FormField } from "@/components/form/types";
import { TouristActivityForm } from "@/features/tourist-activities/components/TouristActivityForm";

export default function TouristActivityPage() {
  const {
    activities,
    loading,
    showForm,
    activityToEdit,
    handleSubmit,
    handleAdd,
    handleDelete,
    handleEdit,
    handleSearch,
    setShowForm,
    departments,
    cities,
    loadCitiesByDepartment,
  } = useTouristActivity();

  const fields = [
    { name: "name", label: "Nombre", required: true, type: "text" },
    { name: "description", label: "Descripción", type: "textarea" },
    {
      name: "departament_id",
      label: "Departamento",
      type: "select",
      required: true,
      options: departments?.map((dept) => ({
        label: dept.name,
        value: dept.id?.toString() || "",
      })),
      onChange: (e) => loadCitiesByDepartment(parseInt(e.target.value)),
    },
    {
      name: "city_id",
      label: "Ciudad",
      type: "select",
      required: true,
      options: cities?.map((city) => ({
        label: city.name,
        value: city.id?.toString() || "",
      })) || [],
    },
    { name: "price", label: "Precio", type: "number" },
    { name: "is_active", label: "Activo", type: "checkbox" },
  ] as FormField[];

  return (
    <div>
      {loading && <LoadingOverlay />}

      <TouristActivityTable
        activities={activities}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearch={handleSearch}
      />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-3 w-full max-w-xs my-12">
            <TouristActivityForm
              fields={fields}
              initial={activityToEdit as any}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
