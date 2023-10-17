import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import type { Routes } from "../../pages/pages";
import { animationPageBuilder } from "../../utils/animations";

type BaseStackProps = {
	pages: Routes[];
};

export const BaseStack: React.FC<BaseStackProps> = ({ pages }) => {
	return (
		<IonRouterOutlet animated animation={animationPageBuilder}>
			{pages.map((page: Routes) => {
				const { key, path, component } = page;

				return <Route exact key={key} path={path} component={component} />;
			})}
		</IonRouterOutlet>
	);
};

// export default React.memo(BaseStack);
