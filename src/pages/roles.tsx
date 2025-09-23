import { useState } from "react";
import { getRoles } from "../services/roleService";
import type { Role } from "../models/Role";

const RolePage: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const loadData = async () => {
        const roles = await getRoles();
        setRoles(roles);
    }
    return (<div>Componente de roles</div>);
};
export default RolePage;
