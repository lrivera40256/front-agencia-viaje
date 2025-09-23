import React, { useState, useEffect } from "react";
import Table from "../components/Table";

const Demo: React.FC = () => {
    //Aquí es la lógica
    const titles = ["id","nombre","email"]

    const users = [
        { id: 1, name: "Ana", email: "ana@example.com" },
        { id: 2, name: "Carlos", email: "carlos@example.com" },
    ];

    const actions = [
        {
            label: "Editar",
            onClick: (row: Record<string, any>) => {
            console.log("Editando: " + row.name);
            },
        },
        {
            label: "Eliminar",
            onClick: (row: Record<string, any>) => {
            console.log("Eliminando: " + row.email);
            },
        },
    ];

    //Es el html
    return <div>
        <Table tableName={"Usuarios"} titles={titles} data={users} actions={actions}></Table> 
    </div>
}
export default Demo;