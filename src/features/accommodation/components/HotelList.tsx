import { HotelItem } from "./HotelItem";
import type { Hotel } from "../types/hotel.type";
import { useState } from "react";
import { useAccommodation } from "../hooks/useAccommodation";
import { useWizard } from "@/features/trip-form/contexts/wizardContext";
import { useSegment } from "@/features/trip-form/contexts/segmentContext";

export const HotelList = () => {
  const {hotels} = useAccommodation();
  const { next } = useWizard();
  const {segment,updateField}=useSegment();
  const handleSelect = (hotel: Hotel) => {
    updateField("hotel", hotel);
    next();
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
          <HotelItem key={hotel.id} hotel={hotel} setSelected={handleSelect} />
        ))}
      </div>
    </div>
  );
};
