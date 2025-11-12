import { createContext, ReactNode, useContext } from "react";
import { useTripWizard } from "../hooks/usetripWizard";
import { configuration } from "../types/configuration.type";

export interface wizardContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  next: () => void;
  back: () => void;
  configuration: configuration [];
  setOnlyTheseActive: (index:number[]) => void;
}

const WizardContext = createContext<wizardContextType | undefined>(undefined);
export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const {step, setStep ,next, back,configuration, setOnlyTheseActive} = useTripWizard();
  return (
    <WizardContext.Provider
      value={{ step, setStep, next, back,configuration, setOnlyTheseActive}}
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