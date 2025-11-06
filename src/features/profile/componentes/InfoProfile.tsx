import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "../contexts/ProfileContext";
import { InfoCard } from "../types/card.types";
import { Content, Header } from "./CardInfo";
import { IdCard, Mail } from "lucide-react";

export const InfoProfile = () => {
    const { profile } = useProfile();

    const handleEdit = (newPhone: String) => {
        console.log("falta implementacion");
    }

    const personalInfo: InfoCard[] =
        [
            { label: "Nombre Completo", value: profile.user.name, editable: false },
            { label: "Teléfono", value: profile.phone, editable: true, handleChange: handleEdit },
        ]

    const contactInfo: InfoCard[] = [
        { label: "Correo Electrónico", value: profile.user.email, editable: false },
        // { label: "Contraseña", value: "********", editable: false },
    ];
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white shadow rounded-xl">

                <CardHeader className="bg-muted/50">
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <IdCard className="h-5 w-5 text-primary" />
                        Información Personal
                    </CardTitle>
                </CardHeader>
                <Content properties={personalInfo} />

            </Card>
            <Card className="bg-white shadow rounded-xl">

                <CardHeader className="bg-muted/50">
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <Mail className="h-5 w-5 text-primary" />
                        Información de Contacto
                    </CardTitle>
                </CardHeader>
                <Content properties={contactInfo} />
            </Card>
          
        </div>
    );


}