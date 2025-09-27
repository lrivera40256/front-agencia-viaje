import { useEffect, useState } from "react";
import {
  getUserRole,
  deleteUserRoleById,
  createUserRole,
} from "../services/userRoleService";
import { getUsers } from "../services/userService";
import { getRoles } from "../services/roleService";
import Table from "../components/Table";
import Form, { FormField } from "../components/Form";

type SelectOption = { value: string; label: string };

type UserRoleRow = {
  _id: string;
  usuario: string;
  rol: string;
};

const UserRolePage: React.FC = () => {
  const [rows, setRows] = useState<UserRoleRow[]>([]);
  const [userOptions, setUserOptions] = useState<SelectOption[]>([]);
  const [roleOptions, setRoleOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Lista para la tabla (siempre)
  const loadUserRoles = async () => {
    setLoading(true);
    try {
      const list = await getUserRole();
      const data: UserRoleRow[] = list.map((ur: any) => ({
        _id: ur._id,
        usuario:
          typeof ur.user === "string"
            ? ur.user
            : ur.user?.name ?? "(Usuario no disponible)",
        rol:
          typeof ur.role === "string"
            ? ur.role
            : ur.role?.name ?? "(Rol no disponible)",
      }));
      setRows(data);
    } finally {
      setLoading(false);
    }
  };

  const loadUserOptions = async () => {
    const users = await getUsers();
    setUserOptions(users.map((u: any) => ({ value: u._id, label: u.name })));
  };
  const loadRoleOptions = async () => {
    const roles = await getRoles();
    setRoleOptions(roles.map((r: any) => ({ value: r._id, label: r.name })));
  };

  const handleDelete = async (row: any) => {
    await deleteUserRoleById(row._id);
    loadUserRoles();
  };

  const openForm = async () => {
    setShowForm(true);
  };
  const closeForm = () => setShowForm(false);

  useEffect(() => {
    loadUserRoles();
  }, []);

  // Cuando se abre el modal, cargar opciones
  useEffect(() => {
    if (showForm) {
      Promise.all([loadUserOptions(), loadRoleOptions()]).catch(() => {});
    }
  }, [showForm]);

  const fields: FormField[] = [
    {
      name: "user",
      label: "Usuario",
      type: "select",
      options: userOptions,
      required: true,
    },
    {
      name: "role",
      label: "Rol",
      type: "select",
      options: roleOptions,
      required: true,
    },
  ];

  return (
    <div>
      <Table
        tableName="Asignación de Roles"
        titles={["Usuario", "Rol"]}
        data={rows}
        onAdd={openForm}
        actions={[
          { label: "Eliminar", onClick: handleDelete, variant: "danger" },
        ]}
        emptyMessage={loading ? "Cargando..." : "No hay asignaciones de roles"}
        className="mt-4"
      />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-3 w-full max-w-xs my-12">
            {userOptions.length === 0 || roleOptions.length === 0 ? (
              <p className="p-4 text-center text-sm text-gray-500">
                Cargando opciones…
              </p>
            ) : (
              <Form
                key="create-user-role"
                title="Asignar rol a usuario"
                fields={fields}
                initialValues={{ user: "", role: "" }}
                onSubmit={async (values: any) => {
                  await createUserRole(values.user, values.role); // servicio espera (id_user, id_role)
                  closeForm();
                  loadUserRoles();
                }}
                onCancel={closeForm}
                submitText="Asignar"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRolePage;
