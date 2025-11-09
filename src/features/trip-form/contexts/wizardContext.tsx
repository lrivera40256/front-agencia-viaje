import { createContext, ReactNode, useContext } from "react";
import { useTripWizard } from "../hooks/usetripWizard";

export interface wizardContextType {
  step: number;
  next: () => void;
  back: () => void;
}

const WizardContext = createContext<wizardContextType | undefined>(undefined);
export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const {step, next, back} = useTripWizard();
  return (
    <WizardContext.Provider
      value={{ step, next, back }}
    >
      {children}
    </WizardContext.Provider>
  );
};
// Hook de acceso
export const useWizard = () => {
  const context = useContext(WizardContext);
  console.log(context);
  
  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
};