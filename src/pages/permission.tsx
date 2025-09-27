import { useEffect, useState } from "react";
import { Permission } from "../models/Permission";
import { deletePermissionById, getPermissions, modifiedPermission } from "../services/permissionService";
import Table from "../components/Table";

const PermissionPage: React.FC = () => {
    const [permissions, setPermissions] =useState<Permission[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const loadData = async () => {
        const permissions = await getPermissions();
        setPermissions(permissions);
    }

    const addPermission = () => {
        setShowForm(true);
        console.log("Agregar permiso");
    };

    const handleDelete = async (permission:Permission) => {
        await deletePermissionById(permission._id);
        loadData();
    }
    
    const handleUpdate = async (permission:Permission) => {
        // Lógica para modificar permiso
        console.log("Modificando permiso");
        loadData();
    }

    useEffect(() =>{
        loadData();
    }, []);

    return (
        <Table 
        data={permissions} 
        titles={["Url", "Método", "Modelo"]} 
        tableName="Permisos" 
        actions={[
            {
                label:"Eliminar", 
                onClick:handleDelete,
                variant:"danger"}, 
            {
                onClick:handleUpdate, 
                label:"Modificar", 
                variant:"primary"
            }
            ]}
        onAdd={addPermission}
        emptyMessage={loading ? "Cargando..." : "No hay permisos"}
        className="mt-4"
        />      
    );
}
export default PermissionPage;