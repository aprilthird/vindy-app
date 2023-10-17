import { SplashScreen } from "@capacitor/splash-screen";
import { Preferences } from "@capacitor/preferences";
import { ReactNode, useReducer } from "react";
import { LoginFields, SessionProp, useAuth } from "../use-auth";
import {
	AuthActionKind,
	AuthReducer,
	ROLES,
	SessionPayload,
	State,
	initUserState,
} from "./auth.reducer";
import React from "react";

type AuthContextDefault = {
	state: State;
	login: (data: LoginFields) => Promise<SessionPayload | undefined>;
	logout: any;
	userAuthenticated: (data: AuthenticatedUser) => void;
	handleSplashScreen: (data: SplashScreenProp) => void;
};

type AuthProviderProps = {
	children: ReactNode;
};

export type AuthenticatedUser = SessionPayload & {
	type: ROLES.MEMBER | ROLES.VINDER;
};

export type SplashScreenProp = {
	show: boolean;
};

export const AuthContext = React.createContext({} as AuthContextDefault);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, {
		type: null,
		session: {
			accessToken: null,
			refreshToken: null,
			user: initUserState,
		},
		splashScreen: false,
	});

	const { login: loginApi, logout: logoutApi, userSession } = useAuth();

	const login = async (data: LoginFields) => {
		try {
			const response: any = await loginApi(data);
			if (response && response?.tokens) {
				const payload: SessionProp = {
					userId: response?.id,
					accessToken: response?.tokens?.accessToken,
					refreshToken: response?.tokens?.refreshToken,
					role: response?.typeUser,
				};
				await Preferences.set({
					key: "auth",
					value: JSON.stringify({
						...data,
						accessToken: response?.tokens?.accessToken,
					}),
				});
				return await userSession(payload);
			}
		} catch (error) {
			throw new Error("Las credenciales son incorrectas");
		}
	};

	const userAuthenticated = async (data: AuthenticatedUser) => {
		dispatch({
			type: AuthActionKind.SET_USER_AUTHENTICATED,
			payload: data,
		});
		await Preferences.set({
			key: "session",
			value: JSON.stringify(data),
		});
	};

	const logout = async () => {
		if (!state.type) return;
		const auth = await Preferences.remove({
			key: "auth",
		});
		await logoutApi(state.type)
			.then(async (response: any) => {
				if (response) {
					const session = await Preferences.remove({
						key: "session",
					});
					await SplashScreen.show({
						showDuration: 2500,
						autoHide: true,
					});

					setTimeout(() => {
						dispatch({
							type: AuthActionKind.SET_USER_LOGOUT,
						});
					}, 1500);
				}
			})
			.catch((err) => console.log("error al logout", err));
	};

	const handleSplashScreen = async (payload: SplashScreenProp) => {
		if (payload.show) {
			dispatch({
				type: AuthActionKind.SHOW_SPLASH_SCREEN,
			});
			await SplashScreen.show({
				showDuration: 1500,
				autoHide: true,
			});
		} else {
			dispatch({
				type: AuthActionKind.HIDE_SPLASH_SCREEN,
			});
			await SplashScreen.hide({
				fadeOutDuration: 400,
			});
		}
	};

	return (
		<AuthContext.Provider
			value={{
				state,
				login,
				logout,
				userAuthenticated,
				handleSplashScreen,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
