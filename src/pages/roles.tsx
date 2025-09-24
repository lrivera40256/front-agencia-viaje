import { useEffect, useState } from "react";
import { getRoles } from "../services/roleService";
import type { Role } from "../models/Role";
import Table from "../components/Table";

const RolePage: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const loadData = async () => {
        const roles = await getRoles();
        setRoles(roles);
    }
    useEffect(() => {
        loadData();
    }, []);
    return (
        <Table data={roles} titles={["Nombre", "Descripción"]} tableName="Roles" />
    );
};
export default RolePage;
