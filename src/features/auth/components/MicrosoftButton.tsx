import { useOAuth } from "../hooks/useOAuth";
import { SocialButton } from "./SocialButton";
import { SocialButtonConfig } from "../types/socialButtons.type";

export const MicrosoftButton = () => {
    const {microsoftOAuth} = useOAuth();
    const config: SocialButtonConfig = {
        name: 'Microsoft',
        copy: 'Explorar con Microsoft',
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#f25022" d="M0 0h11.5v11.5H0z" />
                <path fill="#00a4ef" d="M12.5 0H24v11.5H12.5z" />
                <path fill="#7fba00" d="M0 12.5h11.5V24H0z" />
                <path fill="#ffb900" d="M12.5 12.5H24V24H12.5z" />
            </svg>
        ),
        bgColor: 'bg-microsoft hover:bg-microsoft/90 hover:scale-105',
        textColor: 'text-white',
        borderColor: 'border-microsoft hover:border-microsoft/70',
    }

    return (
       <SocialButton config={config} onClick={microsoftOAuth} className="w-full py-2 text-sm" />
    );
}
