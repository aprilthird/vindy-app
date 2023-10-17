import { IonRippleEffect, IonToast } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { DatePicker, dayjs, getFormattedDate } from "../../utils";
import { useCalendarContext } from "./context/calendar.hook";

import "./day.scss";

type DayButtonBaseProps = {
	day: DatePicker;
};

export const Day: React.FC<DayButtonBaseProps> = ({ day }) => {
	const { handleSelectedDate, state } = useCalendarContext();
	const selected = state.dateSelected ? state.dateSelected?.date : null;
	const [available, setAvailable] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState(false);

	const verifyAvailability = () => {
		const newDay = dayjs(day.date)
			.format("dddd")
			.toUpperCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");

		const available = state.daysAvailable.find(
			(day: any) => day.day === newDay
		);

		if (available) {
			setAvailable(true);
		}
	};

	useEffect(() => {
		if (
			typeof state.daysAvailable !== "undefined" &&
			state?.daysAvailable?.length > 0
		) {
			verifyAvailability();
		}
	}, [state.daysAvailable]);

	const baseClasses = useCallback(() => {
		return `
      ion-activatable relative overflow-hidden transition flex flex-col items-center justify-center w-full h-12 rounded-lg
      ${
				day.date.isToday() &&
				((selected && !selected.isSame(day.date)) || !selected)
					? "border border-terciary text-terciary"
					: day.isWeekend &&
					  ((selected && !selected.isSame(day.date)) || !selected)
					? "bg-slate-300 text-white font-light"
					: selected && !selected.isSame(day.date)
					? "bg-white text-slate-700"
					: selected && selected.isSame(day.date)
					? "bg-terciary text-white"
					: "bg-white"
			}

      `;
	}, [day, selected]);

	const handleSelect = () => {
		if (available) {
			handleSelectedDate(day);
		} else {
			setIsOpen(true);
		}
	};

	const handleClickableDay = () => {
		if (state.allowAll) {
			handleSelectedDate(day);
		} else {
			handleSelect();
		}
	};

	return (
		<>
			<IonToast
				isOpen={isOpen}
				message="Este dia no esta disponible"
				onDidDismiss={() => setIsOpen(false)}
				duration={2000}
				buttons={[
					{
						text: "ok",
						role: "cancel",
					},
				]}
				cssClass="day-toast"
			></IonToast>
			<div className="w-2/12 mx-1 h-14 relative flex flex-col gap-1 items-end">
				<span
					className={`w-1 h-1 rounded-full mx-auto ${
						available ? " bg-terciary " : "bg-transparent"
					}`}
				></span>
				<div className={baseClasses()} onClick={() => handleClickableDay()}>
					{/* <div className={baseClasses()} onClick={() => handleSelect()}> */}
					<span className="text-xs">{getFormattedDate(day.date, "ddd")}</span>
					<span className="text-xs">{getFormattedDate(day.date, "DD")}</span>
				</div>
				<IonRippleEffect type="bounded"></IonRippleEffect>
			</div>
		</>
	);
};
