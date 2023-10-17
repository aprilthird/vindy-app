import React from "react";
import type { Icon } from "react-feather";
import { IonMenuToggle, IonRouterLink } from "@ionic/react";
import { animationPageBuilder } from "../../../utils/animations";

type MenuSideButtonProps = {
	path: string;
	label: string;
	Icontag: Icon | null;
};

export const MenuButton: React.FC<MenuSideButtonProps> = ({
	path,
	label,
	Icontag,
}) => {
	return (
		<IonMenuToggle>
			<IonRouterLink
				routerLink={path}
				routerAnimation={animationPageBuilder}
				routerDirection="forward"
			>
				<div className="flex flex-row w-full space-x-4 items-center">
					{Icontag && (
						<Icontag width={20} height={20} color="white" strokeWidth={1.3} />
					)}
					<p className="text-white text-sm font-light font-poppins lowercase">
						{label}
					</p>
				</div>
			</IonRouterLink>
		</IonMenuToggle>
	);
};

// export default React.memo(MenuButton);
