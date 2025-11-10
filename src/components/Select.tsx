
import {  MapPin } from "lucide-react";
import  { ReactNode } from "react";
interface DataType{
  id: number;
  name: string;
}
interface SelectProps {
  title: string;
  data: DataType[];
  value: number ;
  icon: ReactNode
  onChange: (value: DataType) => void;
}

export const Select = ({ title,data,value,onChange,icon}: SelectProps) => {

  return (
    <div className="space-y-3 mb-4  ">
      <label className="text-sm font-semibold flex items-center gap-2 text-gray-700">
        {icon}
        {title}
      </label>

      <div className="relative w-fit"> 
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
          <MapPin size={14} />
        </div>

        <select
          className="
            appearance-none rounded-lg
            border border-gray-300 bg-white
            pl-7 pr-7 py-1.5
            text-sm
            shadow-sm transition-all duration-200
            focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            hover:border-gray-400
            text-gray-700
          "
          style={{ width: "180px" }}
          value={value}
          onChange={(e) => {
            const selectedId = Number(e.target.value);
            const selectedItem = data.find(item => item.id === selectedId);
            if (selectedItem) {
              onChange(selectedItem);
            }
          }}
        >
          <option value="" className="text-gray-400">
            Selecciona…
          </option>

          {data.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
          ▼
        </div>
      </div>
    </div>
  );
};
