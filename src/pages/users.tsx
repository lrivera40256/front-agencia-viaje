import { useEffect, useState } from "react";
import type { User } from "../models/User";
import {
  getUsers,
  deleteUserById,
  createUser,
  updateUser,
} from "../services/userService";
import Form, { FormField } from "../components/Form";
import Table from "../components/Table";

const userFields: FormField[] = [
  { name: "name", label: "Nombre", placeholder: "Ingresa el nombre" },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "correo@ejemplo.com",
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "********",
  },
];

const initialValues: Partial<User> = {
  name: "",
  email: "",
  password: "",
};

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const closeForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
      console.log(data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (user: User) => {
    if (!confirm(`¿Eliminar usuario "${user.name}"?`)) return;
    setDeletingId(user._id);
    try {
      await deleteUserById(user._id);
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddUser = () => {
    setShowForm(true);
  };

  const handleUpdateUser = (row: any) => {
    setEditingUser({
      _id: row._id,
      name: row.nombre ?? row.name ?? "",
      email: row.email ?? "",
      password: "",
    });
    setShowForm(true);
  };

  const handleSubmit = async (values: User) => {
    if (editingUser) {
      const { password, ...payload } = values as any;
      await updateUser({ _id: editingUser._id, ...payload });
    } else {
      await createUser(values);
    }
    closeForm();
    loadData();
  };

  const formFields = editingUser
    ? userFields.filter((f) => f.name !== "password")
    : userFields;

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Table
        tableName="Usuarios"
        titles={["Nombre", "Email"]}
        data={users.map((u) => ({
          _id: u._id,
          nombre: u.name,
          email: u.email,
        }))}
        onAdd={handleAddUser}
        actions={[
          { label: "Eliminar", onClick: handleDelete, variant: "danger" },
          { label: "Modificar", onClick: handleUpdateUser, variant: "primary" },
        ]}
        emptyMessage={loading ? "Cargando..." : "No hay usuarios"}
        className="mt-4"
      />
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-3 w-full max-w-xs my-12">
            <Form
              title={editingUser ? "Modificar usuario" : "Crear usuario"}
              fields={formFields}
              initialValues={
                editingUser
                  ? {
                      name: editingUser.name,
                      email: editingUser.email,
                    }
                  : initialValues
              }
              onSubmit={handleSubmit}
              submitText={editingUser ? "Guardar cambios" : "Crear"}
            />
            <button
              className="mt-1 w-full py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold"
              onClick={closeForm}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
