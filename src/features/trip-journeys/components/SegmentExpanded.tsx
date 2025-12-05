import React, { useState } from "react";
import { DetailRow } from "./DetailRow";
import { Segment } from "../../trip-form/types/segment.types";
import { useWizard } from "@/features/trip-form/contexts/wizardContext";

interface SegmentExpandedProps {
  segment: Segment;
}

type PendingEdit = {
  label: string;
  step: number;
} | null;

export const SegmentExpanded = ({ segment }: SegmentExpandedProps) => {
  const { setStep } = useWizard();
  const [pendingEdit, setPendingEdit] = useState<PendingEdit>(null);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const confirmEdit = (label: string, step: number) => {
    // show confirm modal explaining consequence
    setPendingEdit({ label, step });
  };

  const proceedEdit = () => {
    if (!pendingEdit) return;
    setStep(pendingEdit.step);
    setPendingEdit(null);
  };
  const changeStep = (step: number) => {

    setStep(step);
  };
  const cancelEdit = () => setPendingEdit(null);

  return (
    <>
      <div className="bg-blue-50 p-4 rounded-md shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailRow onClick={() => setStep(1)} label="Fecha de salida" value={formatDate(segment.dateFrom)} />
          <DetailRow onClick={() => setStep(1)} label="Fecha de regreso" value={formatDate(segment.dateTo)} />
          <DetailRow
            onClick={() => setStep(2)}
            label="Departamento origen "
            value={segment.departamentFrom.name}
          />
          {/* editar departamento destino => mostrar confirmación */}
          <DetailRow
            onClick={() => confirmEdit("Departamento destino", 2)}
            label="Departamento destino "
            value={segment.departamentTo.name}
          />

          <DetailRow
            onClick={() => setStep(2)}
            label="Ciudad origen "
            value={segment.cityFrom.name}
          />

          {/* editar ciudad destino => mostrar confirmación */}
          <DetailRow
            onClick={() => confirmEdit("Ciudad destino", 2)}
            label="Ciudad destino "
            value={segment.cityTo.name}
          />

          <DetailRow onClick={() => setStep(3)} label="Hotel " value={segment.hotel.name} />
          <DetailRow onClick={() => setStep(4)} label="Habitación " value={segment.rooms.map(room => room.room_number).join(", ")} />
        </div>
      </div>

      {/* Confirm modal (UI only) */}
      {pendingEdit && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-edit-title"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={cancelEdit}
          />

          <div className="relative z-10 w-full max-w-lg mx-4">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h3 id="confirm-edit-title" className="text-lg font-semibold text-gray-800">
                  Editar {pendingEdit.label}
                </h3>
                <p className="mt-3 text-sm text-gray-600">
                  Si editas {pendingEdit.label.toLowerCase()}, se perderán los trayectos
                  siguientes a este segmento. ¿Deseas continuar y editar {pendingEdit.label.toLowerCase()}?
                </p>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                  >
                    Cancelar
                  </button>

                  <button
                    type="button"
                    onClick={proceedEdit}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Continuar y editar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SegmentExpanded;

function useTripSegment(): { create: any; } {
  throw new Error("Function not implemented.");
}
