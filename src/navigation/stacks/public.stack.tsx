import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { NoAuthPages as Pages } from "../../pages/pages";
import type { Routes } from "../../pages/pages";
import { animationPageBuilder } from "../../utils/animations";

export const PublicStack: React.FC = () => {
	return (
		<IonRouterOutlet
			animated
			animation={animationPageBuilder}
			id="main-content"
		>
			{Pages.map((page: Routes) => {
				const Componente = page.component;
				return (
					<Route path={page.path} key={page.key} exact>
						<Componente />
					</Route>
				);
			})}
		</IonRouterOutlet>
	);
};

// export default React.memo(PublicStack);
