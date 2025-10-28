import { RoleTable } from "../components/RoleTable";
import { RoleForm } from "../components/RoleForm";
import { useRolesManager } from "../hooks/useRolesManager";
import { LoadingOverlay } from "@/components/Loader";

export default function RolePage() {
  const {
    roles,
    loading,
    tableName,
    mode,
    showForm,
    roleToEdit,
    fields,
    handleSubmit,
    handleAdd,
    handleDelete,
    handleEdit,
    handleSearch,
    setShowForm,
  } = useRolesManager();

  return (
    <div>
      {loading && <LoadingOverlay />}

      <RoleTable
        tableName={tableName}
        roles={roles}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearch={mode === "global" ? handleSearch : undefined}
      />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-3 w-full max-w-xs my-12">
            <RoleForm
              fields={fields}
              initial={roleToEdit}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
