// features/trip-form/components/StepWrapper.tsx
import { motion } from "framer-motion";
import { ReactNode } from "react";

export const StepWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="p-4 bg-white shadow rounded-xl"
  >
    {children}
  </motion.div>
);
