// WizardLayout.tsx
import { motion, AnimatePresence } from "framer-motion";

export const WizardLayout = ({ step, children }: any) => (
  <div className="relative">
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.35 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </div>
);
