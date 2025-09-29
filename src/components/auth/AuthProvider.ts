// authProviders.ts
import {
	signInWithPopup,
	GoogleAuthProvider,
	GithubAuthProvider,
	OAuthProvider,
} from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { loginOAuth } from '@/services/securityService';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export const loginWithGoogle = async (navigate: NavigateFunction) => {
	const result = await signInWithPopup(auth, new GoogleAuthProvider());
	console.log('🔥 Result Google:', result);
	exchangeFirebaseTokenForAppJwt(navigate)
	return result;
};
// Microsoft
export const loginWithMicrosoft = async (navigate: NavigateFunction) => {
	const provider = new OAuthProvider('microsoft.com');
	provider.addScope('User.Read');
	const result = await signInWithPopup(auth, provider);
	console.log('🔥 Result Microsoft:', result);
	exchangeFirebaseTokenForAppJwt(navigate)
	return result;
};

// GitHub
export const loginWithGithub = (navigate: NavigateFunction) => {
	const provider = new GithubAuthProvider();
	provider.addScope('read:user');
	provider.addScope('user:email');
	exchangeFirebaseTokenForAppJwt(navigate)
	return signInWithPopup(auth, provider);
};
async function getFreshFirebaseIdToken() {
	const user = auth.currentUser;
	if (!user) return null;
	// token vigente (renueva si necesita)
	return await user.getIdToken();
}

// Llama a tu backend para convertir el ID token de Firebase en tu JWT
async function exchangeFirebaseTokenForAppJwt(navigate: NavigateFunction) {

	const idToken = await getFreshFirebaseIdToken();
	console.log(idToken);
	const response = await loginOAuth(idToken);
	console.log(response);
	localStorage.setItem('token', response.token);
	navigate('/seguridad');
	if (!idToken) throw new Error("No Firebase user session");

}
