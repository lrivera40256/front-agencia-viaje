import { useEffect, useState } from "react";
import { deleteRole, getRoles } from "../services/roleService";
import type { Role } from "../models/Role";
import Table from "../components/Table";
import { Trash2, Plus } from "lucide-react";

const RolePage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getRoles();
      setRoles(data);
    } finally {
      setLoading(false);
    }
  };

  const deleteRoleById = async (row: Role) => {
    if (!confirm(`Eliminar rol "${row.name}"?`)) return;
    setDeletingId(row._id);
    try {
      await deleteRole(row._id);
      setRoles(prev => prev.filter(r => r._id !== row._id)); // optimista
    } finally {
      setDeletingId(null);
    }
  };

  const addRole = () => {
    // abrir modal / navegación a formulario
    console.log("Agregar rol");
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Table
      tableName="Roles"
      titles={["Nombre", "Descripción"]}
      data={roles.map(r => ({
        _id: r._id,
        name: r.name,
        description: r.description || "—",
        // puedes agregar campos adicionales si quieres que se muestren
      }))}
      onAdd={addRole}
      actions={[
        {
          label: "Eliminar",
          // Si tu Table actual espera 'label' como string fija, deja simplemente "Eliminar"
          // y quita la lógica condicional; o adapta Table para aceptar función.
          onClick: deleteRoleById,
          variant: "danger",
        },
      ]}
      emptyMessage={loading ? "Cargando..." : "No hay roles"}
      className="mt-4"
    />
  );
};

export default RolePage;