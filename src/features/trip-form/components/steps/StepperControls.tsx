import { useWizard } from "../../contexts/wizardContext";

// features/trip-form/components/StepperControls.tsx
export const StepperControls = () => {
  const { step, next, back } = useWizard();
  
  return (
    <div className="mt-6 flex justify-between">
      {step > 1 && (
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={back}
        >
          Atrás
        </button>
      )}

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={next}
      >
        Siguiente
      </button>
    </div>
  );
}
