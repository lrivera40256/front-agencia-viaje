import { getPermissionsForCheck } from "@/services/rolePermissionService";
import { PermissionsByModel } from "@/types/permisions";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const tablePermission : React.FC = () => {
    const [permissionsCheck, setPermissionsCheck] = useState<PermissionsByModel>()
    const { idRole } = useParams<{ idRole: string }>();

    const loadData = async() => {
        try {
            const data = await getPermissionsForCheck(idRole)
            setPermissionsCheck(data)
            console.log(permissionsCheck);
            
        } catch (error) {
            toast.error('Eror al cargar')
        }
    }
    return (
        <div>
            Aqui tabla
        </div>
    );
};
export default tablePermission