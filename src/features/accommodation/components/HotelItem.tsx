import { useState } from "react";
import hotellmage from "@/assets/hotel.png";
import { Hotel } from "../types/hotel.type";
interface HotelItemProps {
    hotel: Hotel
    selected: boolean;
    setSelected: (hotelId: number) => void;
}

export const HotelItem = ({ hotel, selected, setSelected }: HotelItemProps) => {


  return (
    <div
      onClick={() => setSelected(hotel.id)}
      className={`
        rounded-xl overflow-hidden cursor-pointer transition-all
        bg-white border shadow-md hover:shadow-lg
        ${selected ? "border-blue-500 shadow-blue-300" : "border-gray-200"}
      `}
    >
      {/* Imagen */}
      <div className="relative h-48 w-full">
        <img
          src={hotellmage}
          alt="hotel"
          className="object-cover w-full h-full"
        />

        {/* etiqueta seleccionado */}
        {selected && (
          <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
            Seleccionado
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5 text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">{hotel.name}</h3>

        <p className="text-yellow-500 text-sm">
          {Array.from({ length: hotel.stars })
            .map(() => "★")
            .join(" ")}
        </p>

        <p className="text-gray-600 text-sm">{hotel.amenities}</p>
      </div>
    </div>
  );
};

