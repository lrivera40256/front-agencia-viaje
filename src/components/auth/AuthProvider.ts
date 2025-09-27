// authProviders.ts
import {
  signInWithPopup, GoogleAuthProvider, GithubAuthProvider, OAuthProvider,
} from "firebase/auth";
import { auth } from "../../utils/firebase";

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, new GoogleAuthProvider());
  console.log("🔥 Result Google:", result);
  return result;
};
// Microsoft
export const loginWithMicrosoft = async () => {
  const provider = new OAuthProvider("microsoft.com");
  provider.addScope("User.Read");
  const result = await signInWithPopup(auth, provider);
  console.log("🔥 Result Microsoft:", result);
  return result;
};

// GitHub
export const loginWithGithub = () => {
  const provider = new GithubAuthProvider();
  provider.addScope("read:user");
  provider.addScope("user:email");
  return signInWithPopup(auth, provider);
};
