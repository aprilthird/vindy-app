import { IonRippleEffect } from "@ionic/react";

type ClickableIconProps = {
	children: any;
	onClick?: () => void;
};

export const ClickableIcon: React.FC<ClickableIconProps> = ({
	children,
	onClick,
}) => {
	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	};
	return (
		<div
			className="ion-activatable select-none relative overflow-hidden w-fit h-fit rounded-full p-2"
			onClick={() => handleClick()}
		>
			{children}
			<IonRippleEffect
				type="bounded"
				className="custom-ripple-contained"
			></IonRippleEffect>
		</div>
	);
};
