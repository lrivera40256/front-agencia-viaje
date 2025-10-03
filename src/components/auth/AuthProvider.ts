// authProviders.ts
import {
	signInWithPopup,
	GoogleAuthProvider,
	GithubAuthProvider,
	OAuthProvider,
	signOut,
} from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { login, loginOAuth } from '@/services/securityService';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export const loginWithGoogle = async (navigate: NavigateFunction) => {
	const result = await signInWithPopup(auth, new GoogleAuthProvider());
	console.log('🔥 Result Google:', result);
	logi(navigate)
	return result;
};
// Microsoft
export const loginWithMicrosoft = async (navigate: NavigateFunction) => {
	const provider = new OAuthProvider('microsoft.com');
	provider.addScope('User.Read');
	const result = await signInWithPopup(auth, provider);
	console.log('🔥 Result Microsoft:', result);
	logi(navigate)
	return result;
};

// GitHub
export const loginWithGithub = (navigate: NavigateFunction) => {
	const provider = new GithubAuthProvider();
	provider.addScope('read:user');
	provider.addScope('user:email');
	logi(navigate)
	return signInWithPopup(auth, provider);
};
async function getFreshFirebaseIdToken() {
	const user = auth.currentUser;
	if (!user) return null;
	// token vigente (renueva si necesita)
	return await user.getIdToken();
}

// Llama a tu backend para convertir el ID token de Firebase en tu JWT
async function logi(navigate: NavigateFunction) {

	const idToken = await getFreshFirebaseIdToken();
	console.log(idToken);
	const response = await login(null, idToken);
	if(response.status=="200" )localStorage.setItem("token", idToken!);
	navigate('/seguridad');
	if (!idToken) throw new Error("No Firebase user session");

}
export const logout = async () => {
  try {
    // 1) Cerrar sesión en Firebase (esto invalida la sesión del SDK en el navegador)
    const response=await signOut(auth);
	localStorage.removeItem('token');
	

  } catch (e) {
    console.error('Error al cerrar sesión de Firebase:', e);
  }
}