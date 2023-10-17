import { Preferences } from "@capacitor/preferences";
import { SWRConfig } from "swr";
import { useEffect } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { AuthStack } from "./stacks/auth.stack";
import { PublicStack } from "./stacks/public.stack";
import { useAuthContext } from "../features/auth/context/auth.hook";
import { PrivateRoute, PublicRoute } from "../components";

export const ApplicationNavigator: React.FC = () => {
	const { state, login, userAuthenticated } = useAuthContext();

	useEffect(() => {
		const checkLogin = async () => {
			const { value } = await Preferences.get({ key: "auth" });
			if (value) {
				const data = JSON.parse(value);
				await autoLogin(data);
			}
		};

		checkLogin();
	}, []);

	const autoLogin = async (data: any) => {
		login(data)
			.then(async (res: any) => {
				userAuthenticated({ ...res, type: data?.role });
			})
			.catch(async () => {
				await Preferences.remove({ key: "auth" });
			});
	};

	const isAuthenticated = state.session;

	return (
		<IonReactRouter>
			<SWRConfig value={{}}>
				<PublicRoute isAuthtenticated={isAuthenticated}>
					<PublicStack />
				</PublicRoute>
			</SWRConfig>
			<PrivateRoute isAuthtenticated={isAuthenticated}>
				<AuthStack />
			</PrivateRoute>
		</IonReactRouter>
	);
};

// export default React.memo(ApplicationNavigator);
