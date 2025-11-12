import { Table } from "@/components/table/Table"
import { Plan } from "../types/Plan.type";
import { usePlan } from "../contexts/PlanContex";

export const PlanTable = () => {
    const { plans, loading, addPlan,editPlan ,onDelete} = usePlan();
    console.log(plans);
    const actions = [
        { label: "Editar",variant: "primary" as const, onClick:editPlan  },
        { label: "Eliminar",variant: "danger" as const, onClick:onDelete  },
    ]
    
    return (
        <Table<Plan>
            tableName="Planes"
            titles={["Nombre", "Descripción", "Precio", "Duración (días)", "Tipo"]}
            data={plans}
            onAdd={addPlan}
            actions={actions}
            emptyMessage={loading ? "Cargando..." : "No hay planes"}

        />
    )
}