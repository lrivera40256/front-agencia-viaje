import { useState } from "react";
import hotellmage from "@/assets/hotel.png";
import { Hotel } from "../types/hotel.type";
interface HotelItemProps {
    hotel: Hotel
    setSelected: (hotelId: number) => void;
}

export const HotelItem = ({ hotel, setSelected }: HotelItemProps) => {

    return (
        <div
            onClick={() => setSelected(hotel.id)}
            className={`
        rounded-xl overflow-hidden cursor-pointer transition-all
        bg-white border shadow-md hover:shadow-lg
      `}
        >
            {/* Imagen */}
            <div className="relative h-48 w-full">
                <img
                    src={hotellmage}
                    alt="hotel"
                    className="object-cover w-full h-full"
                />
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

