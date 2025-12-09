import type { Quota } from "../types/travel-package.type";
import { useState } from "react";
import { getQuotasByAmount } from "../services/quotaService";

export function useQuota() {
  const [numCuotas, setNumCuotas] = useState(1);
  const [quotas, setQuotas] = useState<Quota[]>([]);

  const calculateQuotas = async (amount: number, travel_customer_id: number) => {
    console.log("Calculando cuotas para el monto:", amount, "y travel_customer_id:", travel_customer_id);
      const result = await getQuotasByAmount(travel_customer_id, amount);
      setQuotas(result);
      console.log(result);
  };

  return {
    numCuotas,
    quotas,
    calculateQuotas,
    setNumCuotas,
  };
}
