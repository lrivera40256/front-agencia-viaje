import { useEffect, useState } from "react";
import { deleteRolePermissionById, getRolePermission } from "../services/rolePermissionService"
import type { RolePermission } from "../models/RolePermission";
import Table from "../components/Table";
import Form from "../components/Form";
import { getPermissions } from "../services/permissionService";
import { getRoles } from "@/services/roleService";

const rolePermissionPage: React.FC = () => {
const [rolesPermissions, setRolesPermissions] = useState<Object[]>([]);
const [permissions, setPermissions] = useState<{value:string, label:string}[]>([]);
const [roles, setRoles] = useState<{value:string, label:string}[]>([]);
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

    const loadPermissions = async () => {
        const permissions = await getPermissions();
        try {
            const data = permissions.map( p => ({
                value: p._id,
                label: `${p.method}: ${p.url}`
            }));
            setPermissions(data);
        } catch (error) {
            throw error;
        }
    }

    const loadRoles = async () => {
        const roles = await getRoles();
        try {
            const data = roles.map( r => ({
                value: r._id,
                label: r.name
            }))
            setRoles(data)
        } catch (error) {
            throw error
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

    useEffect(() => {
        if (showForm){
            loadPermissions();
            loadRoles();
        }
    },[showForm]);
    
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
            emptyMessage={loading ? "Cargando..." : "No hay role-permiso"}
            className="mt-4"
        />
        {showForm && (
            <Form
            title="Crear rol - permiso"
            fields={[
                { 
                    name: "role", 
                    label: "Permiso", 
                    type: "select", 
                    options:permissions
                },
                { 
                    name: "permission", 
                    label: "Rol", 
                    type: "select",
                    options:roles
                },
            ]}
            initialValues={{ roleId: "", permissionId: "" }}
            onSubmit={async (values) => {
                console.log(values.permissionId);
                console.log(values.roleId);
            }}
            submitText="Crear"
            />
        )}
        </>
    )
}
export default rolePermissionPage;