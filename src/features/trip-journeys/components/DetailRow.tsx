import { ReactNode } from "react";

interface DetailRowProps {
  label: string;
  value: ReactNode;
  onClick?: () => void;
}

export const DetailRow = ({ label, value, onClick }: DetailRowProps) => {
  return (
    <div className="flex justify-between p-1 border-b border-gray-200 hover:bg-gray-100" onClick={onClick}>
      <span className="font-semibold text-gray-700">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
};