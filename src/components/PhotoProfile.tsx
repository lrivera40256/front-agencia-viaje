import { Avatar, AvatarImage } from "./ui/avatar";
import { Camera } from "lucide-react";
import { ReactNode, useRef } from "react";

interface PhotoProfileProps {
    name: string,
    photoUrl: string,
    children?:ReactNode
    handleClick: () => void
}
export const PhotoProfile = ({ name, photoUrl, children,handleClick }: PhotoProfileProps) => {
    return (
        <div
            className="relative group cursor-pointer select-none"
            onClick={handleClick}
            role="button"
            tabIndex={0}

        >
            <Avatar className="h-24 w-24 md:h-32 md:w-32 ring-4 ring-white/20 shadow-xl cursor-pointer overflow-hidden">
                <AvatarImage
                    src={photoUrl}
                    alt={name}
                    className="object-cover"
                />
            </Avatar>
            <div className="pointer-events-none opacity-0 group-hover:opacity-60 transition-all duration-300 absolute inset-0 flex flex-col items-center justify-center  text-black text-sm backdrop-blur-sm rounded-full">
                <div className="flex flex-col items-center gap-2">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm transform transition-transform duration-300 group-hover:scale-110">
                        <Camera className="h-5 w-5" />
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 text-xs">Cambiar foto</span>
                </div>
            </div>
            {children}
            
        </div>

    )
}