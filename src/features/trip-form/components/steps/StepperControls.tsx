import { useWizard } from "../../contexts/wizardContext";

export const StepperControls = () => {
  const { step, configuration } = useWizard();

  // Todas las acciones válidas para este step
  const buttons = configuration.filter((c) => c.steps.includes(step) && c.status);
  console.log(buttons)

  return (
    <div className="mt-6 flex justify-between">

      {buttons.map((c) => (
        <button
          key={c.label}
          className={
            c.label === "Atras"
              ? "px-4 py-2 bg-gray-200 rounded"
              : "px-4 py-2 bg-blue-600 text-white rounded"
          }
          onClick={c.action}
        >
          {c.label}
        </button>
      ))}

    </div>
  );
};
