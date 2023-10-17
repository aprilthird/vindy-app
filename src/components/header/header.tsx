import React from "react";
import {
	IonButtons,
	IonHeader,
	IonImg,
	IonMenuButton,
	IonRouterLink,
	IonToolbar,
	useIonRouter,
} from "@ionic/react";
import {
	ArrowLeft as BackIcon,
	Menu as MenuIcon,
	MessageCircle as MessageIcon,
} from "react-feather";
import { BASE_COLORS } from "../../utils";
import { animationPageBuilder } from "../../utils/animations";

type HeaderProps = {
	customMainLabel?: string;
	customBack?: any;
	goBack?: boolean;
	links?: Record<string, string>[];
};

export const Header: React.FC<HeaderProps> = ({
	customMainLabel,
	customBack = null,
	goBack = false,
}) => {
	const navigation = useIonRouter();

	const handleBack = () => {
		if (!customBack && goBack) {
			navigation.goBack();
		} else if (customBack && !goBack) {
			customBack();
		}
	};

	return (
		<IonHeader translucent={true} className="ion-no-padding ion-no-margin ion-no-border">
			<IonToolbar className="header ion-no-border ion-no-margin ion-no-padding">
				<div className="flex flex-row items-center justify-between w-full bg-back py-2 px-5">
					<IonButtons slot="start">
						{!customBack && !goBack && (
							<IonMenuButton id="main-content">
								<MenuIcon
									width={20}
									height={20}
									strokeWidth={2.5}
									color="#450A7A"
								/>
							</IonMenuButton>
						)}
						{(customBack || goBack) && (
							<IonRouterLink
								routerAnimation={animationPageBuilder}
								routerDirection="back"
								onClick={() => handleBack()}
							>
								<BackIcon
									width={25}
									height={25}
									color={BASE_COLORS.purple}
									strokeWidth={1.5}
								/>
							</IonRouterLink>
						)}
					</IonButtons>
					{!customMainLabel && (
						<div className="h-16">
							<IonImg src="/assets/img/logo_1.png" className="h-16 w-16" />
						</div>
					)}
					{customMainLabel && (
						<div>
							<p className="text-slate-800 text-lg font-bold">
								{customMainLabel}
							</p>
						</div>
					)}
					<IonButtons slot="end">
						<MessageIcon
							width={20}
							height={20}
							strokeWidth={2.5}
							color="#450A7A"
						/>
					</IonButtons>
				</div>
			</IonToolbar>
		</IonHeader>
	);
};

// export default React.memo(Header);
