import { useEffect, useState } from "react";
import type { Permission } from "../models/Permission";
import { deletePermissionById, getPermissions } from "../services/permissionService";
import Table from "../components/Table";

const permissionPage: React.FC = () => {
    const [permissions, setPermissions] =useState<Permission[]>([])
    const loadData = async () => {
        const permissions = await getPermissions();
        setPermissions(permissions);
    }

    const handleDelete = async (permission:Permission) => {
        await deletePermissionById(permission._id);
        loadData();
    }
    
    useEffect(() =>{
        loadData();
    }, []);
    return (
        <Table data={permissions} titles={["Url", "Método", "Modelo"]} tableName="Permisos" actions={[{onClick:handleDelete,label:"delete"}]} />
    );
}
export default permissionPage;