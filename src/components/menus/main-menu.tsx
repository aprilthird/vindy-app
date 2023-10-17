import { useCallback } from "react";
import {
	IonContent,
	IonHeader,
	IonImg,
	IonMenu,
	IonMenuToggle,
	IonRouterLink,
	IonToolbar,
} from "@ionic/react";
import { LogOut as LogoutIcon } from "react-feather";
import { Routes } from "../../pages/pages";
import { useAuthContext } from "../../features/auth/context/auth.hook";
// import Avatar from "../avatar/avatar";
// import MenuButton from "./button.tsx/button";
import {
	PauseCircle as PauseIcon,
	PlayCircle as PlayIcon,
} from "react-feather";

import "./menu.scss";
import { Avatar } from "../avatar/avatar";
import { MenuButton } from "./button.tsx/button";
import { BASE_COLORS } from "../../utils";

type MainMenuBaseProps = {
	pages: Routes[];
};

export const MainMenu: React.FC<MainMenuBaseProps> = ({ pages }) => {
	const { logout, state } = useAuthContext();

	const {
		session: { user },
	} = state;

	const avatarEl = useCallback(() => {
		if (state.type === "MEMBER") {
			return <Avatar user={user?.profile} />;
		} else {
			return <Avatar vinder={user?.vinderProfile} />;
		}
	}, [state, user]);

	const servicesButton = (
		<div className="bg-back rounded-l-lg ml-10 py-3 pl-4">
			<IonMenuToggle>
				<div className="flex flex-row w-full space-x-4 items-center">
					<PauseIcon
						width={20}
						height={20}
						color={BASE_COLORS.purple}
						strokeWidth={1.3}
					/>

					<p className="text-brightpurple text-sm font-light font-poppins lowercase">
						Pausar servicios
					</p>
				</div>
			</IonMenuToggle>
		</div>
	);

	return (
		<IonMenu contentId="main-content">
			<IonHeader className="ion-no-border">
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
						<div className="w-full flex flex-col px-14">
							{avatarEl()}
							{pages.map((page: Routes) => {
								const { label, path, mainSidebar, key, icon } = page;
								const Icontag = icon ?? null;
								if (mainSidebar) {
									return (
										<div className="w-full py-2" key={key}>
											<MenuButton path={path} Icontag={Icontag} label={label} />
										</div>
									);
								}
								return "";
							})}
						</div>
						{state.type === "VINDER" && servicesButton}
					</div>
					<div className="w-full px-14 py-4 mb-0">
						<IonRouterLink href="#" onClick={logout}>
							<div className="flex flex-row w-full space-x-4 items-center">
								<LogoutIcon
									width={27}
									height={27}
									color="white"
									strokeWidth={2}
								/>

								<p className="text-white lowercase">Salir</p>
							</div>
						</IonRouterLink>
					</div>
				</div>
			</IonContent>
		</IonMenu>
	);
};

// export default React.memo(MainMenu);
