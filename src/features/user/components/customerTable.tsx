import { Table } from "@/components/table/Table"
import { useCustomer } from "../context/customerContext";
import { Customer } from "../types/customer.type";
import { useNavigate } from "react-router";


export const CustomerTable = () => {
    const { customers, loading, addCustomer, editCustomer, onDelete } = useCustomer();
    const navigate = useNavigate();
    const onCardsClick = (c: Customer) => {
        // navigate to bank cards page for this customer
        navigate(`/tarjetas/${c.id}`);
    }
    const actions = [
        { label: "Editar",variant: "primary" as const, onClick:editCustomer  },
        { label: "Eliminar",variant: "danger" as const, onClick:onDelete  },
        { label: "Tarjetas", variant: "neutral" as const, onClick: onCardsClick },
    ]
    if (!customers) {
        return null;
    }
    return (
        <Table<Customer>
            tableName="Clientes"
            titles={["Nombre", "Email", "Teléfono", "Número de identificación","Tipo de documento","Fecha de nacimiento"]}
            data={customers}
            onAdd={addCustomer}
            actions={actions}
            emptyMessage={loading ? "Cargando..." : "No hay clientes"}

        />
    )
}