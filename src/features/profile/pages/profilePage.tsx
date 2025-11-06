import { Card } from "@/components/ui/card";
import { useProfile } from "../contexts/ProfileContext";
import { Header } from "../componentes/CardInfo";
import { InfoProfile } from "../componentes/InfoProfile";
import { LoadingOverlay } from "@/components/Loader";


const  ProfilePage = () => {
    const { profile, isLoading, editPhoto } = useProfile();
    if (isLoading) {
        return <LoadingOverlay />;
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <div>
                    <Card className="mb-6 overflow-hidden border-primary/20">
                        <div className="bg-gradient-to-r from-primary to-accent p-6 md:p-8">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                <Header
                                    name={profile.user?.name}
                                    email={profile.user?.email}
                                    type={profile.user?.isOauth ? "oauth" : "local"}
                                    isEditing={isLoading}
                                    handlePhotoChange={editPhoto}
                                />
                            </div>
                        </div>
                    </Card>
                    <InfoProfile />
                </div>
            </div>
        </div>
    )
}
export default ProfilePage;