import { useCallback } from "react";
import { IonAlert, IonBackdrop } from "@ionic/react";

import "./popup.scss";

export type PopupButtons = {
	text: string;
	role: "cancel" | "confirm";
	handler?: (data: any) => void;
};

type PopupProps = {
	isOpen: boolean;
	title: string;
	subTitle?: string;
	message?: string;
	confirmButton: PopupButtons;
	cancelButton?: PopupButtons;
	onDidDismiss: (data: any) => void;
	clickOutSide: boolean;
};

export const Popup: React.FC<PopupProps> = ({
	title,
	isOpen,
	subTitle,
	message,
	onDidDismiss,
	clickOutSide,
	cancelButton = null,
	confirmButton,
}) => {
	const buttonsCall = useCallback(() => {
		const buttons = [];
		if (cancelButton) {
			buttons.push({ ...cancelButton, cssClass: "alert-button-cancel" });
		}
		if (confirmButton) {
			buttons.push({ ...confirmButton, cssClass: "alert-button-confirm" });
		}
		return buttons;
	}, [confirmButton, cancelButton]);

	return (
		<>
			{isOpen && (
				<>
					<IonBackdrop visible={isOpen}></IonBackdrop>
					{/* <div className="absolte top-2 flex bg-primary rounded-full w-16 h-16 z-50 items-center m-auto justify-center">
						<CheckIcon color="white" width={55} height={55} strokeWidth={2.8} />
					</div> */}
				</>
			)}
			<IonAlert
				isOpen={isOpen}
				onDidDismiss={(res: any) => onDidDismiss(res?.detail?.role)}
				header={title}
				subHeader={subTitle}
				message={message}
				buttons={buttonsCall()}
				backdropDismiss={clickOutSide}
				animated
				cssClass="popup-alert"
			/>
		</>
	);
};

// export default React.memo(Popup);
