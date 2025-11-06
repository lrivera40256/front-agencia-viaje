// src/features/auth/contexts/AuthProvider.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { AuthUser, AuthContextType } from "../types/auth.types";
// 👈 tu archivo original
import { auth } from "@/utils/firebase";
import { useProfile } from "../../profile/contexts/ProfileContext";
import { useOAuth } from "../hooks/useOAuth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	

	// 🔹 Escucha cambios en Firebase Auth
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
			if (firebaseUser) {
				const token = await firebaseUser.getIdToken();
				setUser({
					id: firebaseUser.uid,
					name: firebaseUser.displayName || "Usuario",
					email: firebaseUser.email || "",
				});
				setToken(token);
				localStorage.setItem("token", token);
			} else {
				setUser(null);
				setToken(null);
				localStorage.removeItem("token");
			}
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	// 🔹 Logout global (Firebase + backend)
	const logout = async () => {
		console.log("logout");
		const { logout: logoutProfile } = useOAuth();
		await logoutProfile();
		setUser(null);
		setToken(null);
		localStorage.removeItem("token");
	};

	const value: AuthContextType = {
		user,
		token,
		setAuthData: (user, token) => {
			setUser(user);
			setToken(token);
			localStorage.setItem("token", token);
		},
		logout,

		loading,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

export const useAuthContext = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuthContext debe usarse dentro de <AuthProvider>");
	return ctx;
};
