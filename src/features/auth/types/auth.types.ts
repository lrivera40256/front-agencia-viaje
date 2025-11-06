export interface AuthUser {
	id: string;
	name: string;
	email: string;
	role?: string;
}


export interface AuthContextType {
	user: AuthUser | null;
	token: string | null;
	setAuthData: (user: AuthUser, token: string) => void;
	logout: () => void;
	// loginWithGoogle: (navigate: any) => Promise<void>;
	// loginWithMicrosoft: (navigate: any) => Promise<void>;
	// loginWithGithub: (navigate: any) => Promise<void>;
	loading?: boolean;
}
