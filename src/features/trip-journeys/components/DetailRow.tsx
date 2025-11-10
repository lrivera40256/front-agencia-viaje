import { ReactNode } from "react";

interface DetailRowProps {
  label: string;
  value: ReactNode;
}

export const DetailRow = ({ label, value }: DetailRowProps) => {
  return (
    <div className="flex justify-between p-1 border-b border-gray-200">
      <span className="font-semibold text-gray-700">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
};