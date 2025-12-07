import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

export function dashboard() {
  // 📈 Histórico del dinero recolectado
  const historico = [
    { mes: "Enero", total: 2300000 },
    { mes: "Febrero", total: 1850000 },
    { mes: "Marzo", total: 3200000 },
    { mes: "Abril", total: 4100000 },
    { mes: "Mayo", total: 3800000 },
    { mes: "Junio", total: 4650000 },
    { mes: "Julio", total: 5200000 },
    { mes: "Agosto", total: 4800000 },
    { mes: "Septiembre", total: 5000000 },
    { mes: "Octubre", total: 6100000 },
    { mes: "Noviembre", total: 5700000 },
    { mes: "Diciembre", total: 6500000 },
  ];

  // 🏙️ Viajes por municipio
  const viajesPorMunicipio = [
    { municipio: "Bogotá", cantidad: 42 },
    { municipio: "Medellín", cantidad: 38 },
    { municipio: "Cali", cantidad: 27 },
    { municipio: "Cartagena", cantidad: 31 },
    { municipio: "Barranquilla", cantidad: 19 },
    { municipio: "Santa Marta", cantidad: 22 },
  ];

  // ✈️ Tipos de transporte (aéreo vs terrestre)
  const tiposTransporte = [
    { tipo: "Aéreo", porcentaje: 64 },
    { tipo: "Terrestre", porcentaje: 36 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen">
      {/* a. Diagrama de líneas */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Histórico de dinero recolectado</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historico}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* b. Diagrama de barras */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Viajes por municipio</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={viajesPorMunicipio}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="municipio" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" fill="#82ca9d" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* c. Diagrama circular */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Uso de transporte</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={tiposTransporte}
              dataKey="porcentaje"
              nameKey="tipo"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={(entry) => `${entry.tipo} (${entry.porcentaje}%)`}
            >
              {tiposTransporte.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default dashboard;

