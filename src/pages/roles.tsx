import { useEffect, useState } from 'react';
import { createRole, deleteRole, getRoles, updateRole } from '../services/roleService';
import type { Role } from '../models/Role';
import Table, { TableAction } from '../components/Table';
import { Trash2, Plus } from 'lucide-react';
import Form, { FormField } from '@/components/Form';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { createUserRole, deleteUserRole, getRolesByUserId, getRolesToAddUser } from '@/services/userRoleService';

const RolePage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isEditRole, setIsEditRole] = useState<boolean>(false);
  const [roleToEdit, setRoleToEdit] = useState<Role>({ name: '', description: '' });
  const { id } = useParams<{ id: string }>();
  const [rolesToAdd, setRolesToAdd] = useState<{ value: string; label: string }[]>([]);
  const userFields: FormField[] = [
    {
      name: 'name',
      label: 'Nombre',
      placeholder: 'Ingresa el nombre',
    },
    {
      name: 'description',
      label: 'Descripción',
      placeholder: 'Ingresa la descripción',
    },
  ];
  const loadData = async () => {
    setLoading(true);
    if (id) {
      try {
        const data = await getRolesByUserId(id);
        setRoles(data);
      } catch (error) {
        toast.error('Error al cargar los roles del usuario');
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const data = await getRoles();
        setRoles(data);
      } finally {
        setLoading(false);
      }
    }
  }
  const loadRolesToAdd = async () => {
    setLoading(true);
    try {
      const data = await getRolesToAddUser(id);
      console.log(data);


      const roles = data.map((r) => ({
        value: r._id,
        label: r.name,
      }));
      setRolesToAdd(roles);
    } catch (error) {
      toast.error('Error al cargar los roles para agregar');
    } finally {
      setLoading(false);
    }
  }

  const deleteRoleById = async (row: Role) => {
    if (!confirm(`Eliminar rol "${row.name}"?`)) return;
    if (id) {
      try {
        await deleteUserRole(id, row._id);
        toast.success('Rol eliminado del usuario exitosamente');
      } catch (error) {
        toast.error('Error al eliminar rol del usuario');
      } finally {
        loadData();
        loadRolesToAdd();
      }
    } else {
      try {
        await deleteRole(row._id);
        toast.success('Rol eliminado exitosamente');
        loadData();
      } catch (error) {
        toast.error('Error al eliminar rol');
      }
    }
  };
  const validateForm = (values: Role) => {
    if (!values.name || values.name.trim() === '' || values.description.trim() === '') {
      toast.error('Todos los campos son obligatorios');
      return false;
    }
    return true;
  };
  const editRole = (role: Role) => {
    setIsEditRole(true);
    setShowForm(true);
    setRoleToEdit(role);
  };
  const addRole = () => setShowForm(true);

  const onSubmit = async (role: Role) => {
    if (!validateForm(role)) return;
    if (isEditRole) {
      await updateRole(role);
      toast.success('Rol actualizado exitosamente');
    } else {
      try {
        await createRole(role);
        toast.success('Rol creado exitosamente');
      } catch (error) {
        toast.error('Error al crear rol');
      }
    }
    setRoleToEdit({ name: '', description: '' });
    setShowForm(false);
    setIsEditRole(false);
    loadData();
  };
  const fieldToAddRole: FormField[] = [
    {
      name: 'role',
      label: 'Rol',
      placeholder: 'Selecciona un rol',
      type: 'select',
      options: rolesToAdd,
    }
  ]
  const addRoleToUser = async (values) => {
    try {
      await createUserRole(id, values.role);
      toast.success('Rol agregado al usuario exitosamente');

    } catch (error) {
      toast.error('Error al agregar rol al usuario');
    } finally {
      setShowForm(false);
      loadData();
      loadRolesToAdd();

    }
  };
  useEffect(() => {
    loadData();
    if (id) loadRolesToAdd();
  }, []);
  function getActions(): TableAction[] {
    const actions: TableAction[] = [
      {
        label: 'Editar',
        onClick: editRole,
        variant: 'primary',
      },
      {
        label: 'Eliminar',
        onClick: deleteRoleById,
        variant: 'danger',
      }

    ];
    if (id) {
      actions.shift();
    }
    return actions;

  }

  return (
    <div>
      <Table
        tableName="Roles"
        titles={['Nombre', 'Descripción']}
        data={roles}
        onAdd={addRole}
        actions={getActions()}
        emptyMessage={loading ? 'Cargando...' : 'No hay roles'}
        className="mt-4"
      />
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-3 w-full max-w-xs my-12">
            <Form
              onCancel={() => {
                setShowForm(false);
                setIsEditRole(false);
                setRoleToEdit({ name: '', description: '' });
              }}
              title={id ? "Agregar Rol" : "Crear Rol"}
              fields={id ? fieldToAddRole : userFields}
              onSubmit={id ? addRoleToUser : onSubmit}
              initialValues={id ? { role: "" } : roleToEdit}
              submitText={isEditRole ? 'Actualizar' : 'Crear'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RolePage;
