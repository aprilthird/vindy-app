import {
	IonButtons,
	IonHeader,
	IonImg,
	IonRouterLink,
	IonToolbar,
	useIonRouter,
} from "@ionic/react";
import { useSelector } from "@xstate/react";
import { ArrowLeft as BackIcon } from "react-feather";
import { animationPageBuilder } from "../../utils/animations";
import {
	RegisterMachineViews as views,
	useRegisterContext,
} from "../../features/auth";
import { BASE_COLORS, getCurrentView } from "../../utils";

import "./header.scss";

type BasicHeaderProps = {
	send: any;
	customMainLabel?: string;
	show?: any;
	goBack?: boolean;
};

export const BasicHeader: React.FC<BasicHeaderProps> = ({
	send,
	customMainLabel = null,
	show = null,
	goBack = true,
}) => {
	const { machineService } = useRegisterContext();
	const view = useSelector(machineService, getCurrentView);

	const navigation = useIonRouter();
	const handleBack = () => {
		if (view === views.selectTypeAccount) {
			navigation.goBack();
		} else if (
			view !== views.registerUser &&
			view !== views.registerPersonalVinder &&
			view !== views.registerBusinessVinder &&
			view !== views.saveBusinessInfo
		) {
			send("BACK");
		} else if (
			view === views.registerUser ||
			view === views.registerPersonalVinder ||
			view === views.registerBusinessVinder ||
			view === views.saveBusinessInfo
		) {
			show();
		}
	};
	return (
		<IonHeader
			translucent={true}
			className="ion-no-padding ion-no-margin bg-[#f1f5f9] ion-no-border"
		>
			<IonToolbar className="header ">
				<div className="flex flex-row items-center justify-between w-full bg-back px-5">
					{goBack && (
						<IonButtons slot="start">
							{view !== views.showTermAndConditions &&
								view !== views.confirmPhone && (
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
					)}

					{!goBack && (
						<IonButtons slot="end">
							<div className="h-5 w-5"></div>
						</IonButtons>
					)}

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
						<div className="h-5 w-5"></div>
					</IonButtons>
				</div>
			</IonToolbar>
		</IonHeader>
	);
};

// export default React.memo(BasicHeader);
