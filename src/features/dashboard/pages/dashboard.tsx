import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import { DashboardService } from "../services/dashboardService";
import { set } from "date-fns";

export function dashboard() {
  // 📈 Histórico del dinero recolectado
  const [historyData, setHistoryData] = useState([]);
  const [typesVehiclesData, setTypesVehiclesData] = useState([]);
  const [topDestinationsData, setTopDestinationsData] = useState([]);
  const getData = async () => {
    const data = await DashboardService.getHistory();
    const typesVehicles = await DashboardService.getTypesVehicles();
    const topDestinations = await DashboardService.getTopDestinations();
    setHistoryData(data.data);
    setTypesVehiclesData(typesVehicles.data);
    setTopDestinationsData(topDestinations.data);
  }
  useEffect( () => {
    getData();
  }, []);



  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen">
      {/* a. Diagrama de líneas */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Histórico de dinero recolectado</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="total_travels"
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
          <BarChart data={topDestinationsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="municipio" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#82ca9d" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* c. Diagrama circular */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Uso de transporte</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={typesVehiclesData}
              dataKey="value"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={(entry) => `${entry.type}(${entry.value}%)`}
            >
              {typesVehiclesData.map((entry, index) => (
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

