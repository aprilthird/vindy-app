import { ReactElement, useCallback } from "react";
import { IonRippleEffect } from "@ionic/react";
import { CHIPS_VARIANTS } from "../../utils";

type ChipIconProp = {
	icon: ReactElement;
	iconClick: () => void;
};

type ChipProps = {
	label: string;
	color?: "primary" | "secundary" | "terciary" | "brightpurple";
	iconProp?: ChipIconProp;
	selected?: boolean;
};

export const Chip: React.FC<ChipProps> = ({
	label,
	color = "secundary",
	iconProp = null,
	selected = null,
}) => {
	const chipClasses = useCallback(() => {
		return `ion-activatable relative overflow-hidden select-none rounded-full w-full px-4 py-1 flex flex-row items-center 
      ${
				selected
					? CHIPS_VARIANTS["contained"].base
					: CHIPS_VARIANTS["outlined"].base
			}
		${
			selected
				? CHIPS_VARIANTS["contained"].colors[color]
				: CHIPS_VARIANTS["outlined"].colors[color]
		}
      border
      `;
	}, [color, selected]);
	return (
		<>
			<div className="min-w-[25px] max-w-max">
				<div className={chipClasses()}>
					<p className="text-xs font-light mr-1">{label}</p>

					{iconProp && (
						<span onClick={() => iconProp.iconClick()}>{iconProp.icon}</span>
					)}
					<IonRippleEffect type="bounded"></IonRippleEffect>
				</div>
			</div>
		</>
	);
};
