// Encapsula la lógica del “expandir / colapsar”

import { useState } from "react";

export const useSegmentToggle = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return { openId, toggle };
};
