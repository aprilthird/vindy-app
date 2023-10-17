import React from "react";
import {
	IonContent,
	IonHeader,
	IonImg,
	IonMenu,
	IonRouterLink,
	IonToolbar,
} from "@ionic/react";
import { Routes } from "../../pages/pages";

import "./menu.scss";

type MainMenuBaseProps = {
	pages: Routes[];
};

export const RightnMenu: React.FC<MainMenuBaseProps> = ({ pages }) => {
	return (
		<IonMenu contentId="main-content">
			<IonHeader>
				<IonToolbar className="main-menu-header ion-no-border items-center">
					<IonImg
						src="/assets/img/logo_white.png"
						className="h-24 w-24 m-auto"
					/>
				</IonToolbar>
			</IonHeader>
			<IonContent className="main-menu-content ion-no-border">
				<div className="bg-brightpurple flex flex-col justify-between h-full m-auto items-center pb-20">
					<div className="w-full flex flex-col">
						{pages.map((page: Routes) => {
							const { label, name, path, mainSidebar, key, icon } = page;
							const Icontag = icon ?? null;
							if (mainSidebar) {
								return (
									<div key={key} className="w-full px-14 py-4">
										<IonRouterLink href={path}>
											<div className="flex flex-row w-full space-x-4 items-center">
												{Icontag && (
													<Icontag
														width={27}
														height={27}
														color="white"
														strokeWidth={2}
													/>
												)}
												<p className="text-white lowercase">{label}</p>
											</div>
										</IonRouterLink>
									</div>
								);
							}
						})}
					</div>
				</div>
			</IonContent>
		</IonMenu>
	);
};

// export default React.memo(RightnMenu);
