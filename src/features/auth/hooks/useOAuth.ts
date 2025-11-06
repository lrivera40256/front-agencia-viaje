
import {
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    OAuthProvider,
    signOut,
} from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { toast } from 'sonner';
import { login   } from '@/features/auth/services/authService';
import api from '@/interceptors/axiosInterceptor';



export const useOAuth = () => {
    async function getFreshFirebaseIdToken() {
        const user = auth.currentUser;
        if (!user) return null;
        // token vigente (renueva si necesita)
        return await user.getIdToken();
    }
    async function loginOAuth() {
        const idToken = await getFreshFirebaseIdToken();
        console.log(idToken);
        const response = await login({ idToken: idToken });
        if (response.status == "200") {
            localStorage.setItem("token", idToken!);
        } else {
            toast.error("No se pudo iniciar sesión");
        }
        if (!idToken) throw new Error("No Firebase user session");

    }
     const logout = async () => {
        try {
            await api.delete('/public/security/logout').catch(() => { });
            await signOut(auth); // Firebase
        } catch (e) {
            console.error('Error al cerrar sesión:', e);
        } finally {
            localStorage.removeItem('token');
        }
    };
    const googleOAuth = async () => {
        const result = await signInWithPopup(auth, new GoogleAuthProvider());
        console.log('🔥 Result Google:', result);
        loginOAuth();
    }
    const microsoftOAuth = async () => {
        const provider = new OAuthProvider('microsoft.com');
        provider.addScope('User.Read');
        const result = await signInWithPopup(auth, provider);
        console.log('🔥 Result Microsoft:', result);
        loginOAuth();
    }
    const githubOAuth = async () => {
        const provider = new GithubAuthProvider();
        provider.addScope('read:user');
        provider.addScope('user:email');
        const result = await signInWithPopup(auth, provider);
        console.log('🔥 Result GitHub:', result);
        loginOAuth();
    }
    return { googleOAuth, microsoftOAuth, githubOAuth ,loginOAuth,logout};

}
