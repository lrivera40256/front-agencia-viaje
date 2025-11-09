import { Input } from "@/components/ui/input";

interface DatePickerProps {
  startDate: Date;
  endDate: Date;
  updateStartDate: (date: Date) => void;
  updateEndDate: (date: Date) => void;
}

export const DatePicker = ({
  startDate,
  endDate,
  updateStartDate,
  updateEndDate
}: DatePickerProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

      {/* Fecha de inicio */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Fecha de inicio
        </label>

        <Input
          type="date"
          className="h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          value={startDate ? startDate.toISOString().slice(0, 10) : ""}
          onChange={(e) => updateStartDate(new Date(e.target.value))}
        />
      </div>

      {/* Fecha de fin */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Fecha de fin
        </label>

        <Input
          type="date"
          className="h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          value={endDate ? endDate.toISOString().slice(0, 10) : ""}
          onChange={(e) => updateEndDate(new Date(e.target.value))}
        />
      </div>

    </div>
  );
};
