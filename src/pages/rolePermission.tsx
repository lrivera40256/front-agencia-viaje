import { useEffect, useState } from "react";
import { deleteRolePermissionById, getRolePermission } from "../services/rolePermissionService"
import type { RolePermission } from "../models/RolePermission";
import Table from "../components/Table";
import Form from "@/components/Form";
import { log } from "console";

const rolePermissionPage: React.FC = () => {
const [rolesPermissions, setRolesPermissions] = useState<Object[]>([]);
const [loading, setLoading] = useState(false);
const [showForm, setShowForm] = useState(false);

    const loadData = async () => {
        const rolesPermissions = await getRolePermission();

        try {
            const data = rolesPermissions.map( rp => ({
            ...rp,
            role: rp.role.name,
            permission: rp.permission.url,
            }));
            setRolesPermissions(data);
        } catch (error) {
            throw error;
        }
    };
        
    const handleDelete = async (rolePermission:RolePermission) => {
        await deleteRolePermissionById(rolePermission._id);
        loadData();
    }

    const addRolePermission = () => {
        setShowForm(true);
        console.log("Agregar rol - permiso");
    };
       
    useEffect(() =>{
        loadData();
    }, []);
    return (
        <>
        <Table 
            tableName="Roles - Permisos" 
            titles={["Rol", "Permiso"]} 
            data={rolesPermissions}
            onAdd={addRolePermission}
            actions={[
                {
                    label:"Eliminar", 
                    onClick:handleDelete,
                    variant:"danger"
                }
            ]}
            emptyMessage={loading ? "Cargando..." : "No hay roles"}
            className="mt-4"
        />
        {/* {showForm && ( 
            <Form
            title="Crear rol - permiso"
            fields={[
                { name: "roleId", label: "Permiso id" },
                { name: "permissionId", label: "Rol id" },
            ]}
            initialValues={{ roleId: "", permissuonId: "" }}
            onSubmit={async (values) => {
                console.log(values);
            }}
            submitText="Crear"
            />
        )} */}
        </>
    )
}
export default rolePermissionPage;