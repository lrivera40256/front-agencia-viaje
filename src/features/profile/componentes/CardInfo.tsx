import { PhotoProfile } from "@/components/PhotoProfile"
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { useRef } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { InfoCard } from "../types/card.types";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useProfile } from "../contexts/ProfileContext";

export const Content = ({ properties }: { properties: InfoCard[] }) => {
    return (
        <CardContent className="pt-6 space-y-4">
            {properties.map((field, index) => (
                <div className="space-y-1" key={index}>
                    <Label className="text-muted-foreground text-sm block text-left">
                        {field.label}
                    </Label>
                    {field.editable ? (
                        <Input
                            value={field.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                    ) : (
                        <p className="text-foreground font-semibold text-lg text-left">
                            {field.value}
                        </p>
                    )}

                </div>
            ))}
        </CardContent>
    );
};


export const Header = ({ name, email, type, isEditing, handlePhotoChange }: { name: string, email: string, type: "local" | "oauth", isEditing: boolean, handlePhotoChange: (file: File) => void }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { profile } = useProfile();
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <PhotoProfile
                name={profile.user?.name}
                photoUrl={profile.photo.url}
                handleClick={() => { fileInputRef.current?.click(); }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            handlePhotoChange(e.target.files[0]);
                        }
                        
                    }}
                />
            </PhotoProfile>

            <div className="flex-1 text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {name}
                </h1>
                <p className="text-white/90 text-lg mb-4">{email}</p>
                {!isEditing && (
                    <div className="flex gap-3">
                        <Button
                            onClick={() => (true)}
                            className="bg-white text-primary hover:bg-white/90 shadow-lg"
                            disabled={false}
                        >
                            <Edit2 className="mr-2 h-4 w-4" />
                            Editar Perfil
                        </Button>

                    </div>
                )}
                <p className="mt-3 text-xs text-white/70">
                    Tipo de cuenta: {type === 'oauth' ? 'OAuth' : 'Local'}
                </p>
            </div>
        </div>

    )
}

