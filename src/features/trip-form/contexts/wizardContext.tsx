import { createContext, ReactNode, useContext } from "react";
import { useTripWizard } from "../hooks/usetripWizard";
import { configuration } from "../types/configuration.type";

export interface wizardContextType {
  step: number;
  next: () => void;
  back: () => void;
  configuration: configuration [];
}

const WizardContext = createContext<wizardContextType | undefined>(undefined);
export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const {step, next, back,configuration} = useTripWizard();
  return (
    <WizardContext.Provider
      value={{ step, next, back,configuration }}
    >
      {children}
    </WizardContext.Provider>
  );
};
// Hook de acceso
export const useWizard = () => {
  const context = useContext(WizardContext);
  
  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
};