import { Departament } from "@/models/departaments";
import { DepartamentService } from "@/services/departamentService";
import { useEffect, useState } from "react";

const useDepartament = () => {
    // Hook logic here
    const [departaments, setDepartaments] = useState<Departament[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const getDepartaments = async () => {
        setLoading(true);
        try {
            const data = await DepartamentService.getAllDepartaments();
            setDepartaments(data);
        } catch (error) {
            console.error("Error fetching departaments:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getDepartaments();
    }, []);
    return { departaments, loading };
};