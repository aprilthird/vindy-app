import {
	IonRouterOutlet,
	IonTabs,
	IonTabBar,
	IonTabButton,
	useIonRouter,
} from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { Route } from "react-router";
import { AuthMemberRotes, AuthVinderRoutes } from "../../pages/pages";
import { animationPageBuilder } from "../../utils/animations";
import { MainMenu } from "../../components";
import { useAuthContext } from "../../features/auth/context/auth.hook";
import { ROLES } from "../../features/auth/context/auth.reducer";
import type { Routes } from "../../pages/pages";

import "./auth.scss";

export const AuthStack: React.FC = () => {
	const [selectedTab, setSelectedTab] = useState<string>("dashboard");
	const {
		state: { type },
	} = useAuthContext();

	const Pages = type === ROLES.MEMBER ? AuthMemberRotes : AuthVinderRoutes;

	const navigation = useIonRouter();

	useEffect(() => {
		// const currentPage = Pages.find((route: Routes) => route.path === navigation.routeInfo.)
	}, [navigation.routeInfo.pathname]);

	console.log("navegacion ==>", navigation.routeInfo);

	return (
		<>
			<MainMenu pages={Pages} />
			<IonTabs onIonTabsWillChange={(e: any) => setSelectedTab(e?.detail?.tab)}>
				<IonRouterOutlet
					animated
					animation={animationPageBuilder}
					id="main-content"
				>
					{Pages.map((page: Routes) => {
						const { key, path, component } = page;
						const Componente = component;

						return (
							<Route
								exact
								key={key}
								path={path}
								render={(props) => {
									return <Componente {...props} />;
								}}
							></Route>
						);
					})}
				</IonRouterOutlet>

				<IonTabBar slot="bottom" className="shadow-2xl shadow-slate-900">
					{Pages.map((page: Routes) => {
						const { key, path, name, icon, hasTab } = page;
						const IconTag = icon ?? null;
						const isSelected = selectedTab === name;
						if (hasTab) {
							return (
								<IonTabButton
									key={key}
									tab={name}
									href={path}
									routerOptions={{
										unmount: true,
									}}
									className={`items-center h-full tab-menu ${
										isSelected ? "bg-terciary" : "bg-back"
									}`}
								>
									{IconTag && (
										<IconTag
											width={20}
											height={20}
											color={isSelected ? "white" : "#450A7A"}
											strokeWidth={2}
										/>
									)}
								</IonTabButton>
							);
						}
						return null;
					})}
				</IonTabBar>
			</IonTabs>
		</>
	);
};

// export default React.memo(AuthStack);
