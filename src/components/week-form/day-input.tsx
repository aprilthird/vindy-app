import { useCallback } from "react";
import { IonRippleEffect } from "@ionic/react";

type DayInputProps = {
	isWeekend: boolean;
	label: string;
	value: string;
	selected: Record<string, string>[];
	handleSelectedDay: any;
};

export const DayInput: React.FC<DayInputProps> = ({
	selected,
	isWeekend,
	value,
	label,
	handleSelectedDay,
}) => {
	const isSelected = selected.find((el) => el?.day === value);

	const baseClasses = useCallback(() => {
		return `
      ion-activatable relative overflow-hidden transition flex flex-col items-center justify-center w-1/12 p-4 h-12 rounded-lg 
      ${
				isWeekend && !isSelected
					? "bg-slate-300 text-white font-light"
					: !isWeekend && !isSelected
					? "bg-white"
					: (isWeekend && isSelected) || (!isWeekend && isSelected)
					? "bg-terciary text-white"
					: ""
			}
      `;
	}, [isSelected, isWeekend]);

	return (
		<div className={baseClasses()} onClick={() => handleSelectedDay(value)}>
			<span className="text-xs">{label}</span>
			<IonRippleEffect type="bounded"></IonRippleEffect>
		</div>
	);
};

// export default React.memo(DayInput);
