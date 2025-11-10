import { HotelItem } from "./HotelItem";
import type { Hotel } from "../types/hotel.type";
import { useState } from "react";
import { useAccommodation } from "../hooks/useAccommodation";

export const HotelList = () => {
  const {hotels} = useAccommodation();
  
  const [selected, setSelected] = useState<number>();  
  if (selected) {
    console.log("Hotel seleccionado ID:", selected);
    return (
      <div>Hotel Seleccionado ID: {selected}</div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-6
        "
      >
        {hotels?.map((hotel) => (
          <HotelItem key={hotel.id} hotel={hotel} selected={selected === hotel.id} setSelected={setSelected} />
        ))}
      </div>
    </div>
  );
};
