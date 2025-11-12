import { createContext, ReactNode, useContext } from "react";
import { Plan } from "../types/Plan.type";
import { usePlan as up } from "../hooks/usePlan";

export interface planContextType {
    plans: Plan[];
    loading: boolean;
    addPlan: () => void;
    editPlan: (plan: Plan) => void;
    onSubmit: (plan: Plan) => Promise<void>;
    planToEdit: Plan | null;
    showForm: boolean;
    setShowForm: (show: boolean) => void;   
    onDelete: (plan: Plan) => Promise<void>;    
}
const PlanContext = createContext<planContextType | undefined>(undefined);
export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const { plans, loading, addPlan, editPlan, onSubmit, planToEdit, showForm, setShowForm, onDelete } = up();
  return (
    <PlanContext.Provider
      value={{ plans, loading, addPlan, editPlan, onSubmit, planToEdit, showForm, setShowForm, onDelete }}
    >
      {children}
    </PlanContext.Provider>
  );
};
// Hook de acceso
export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};