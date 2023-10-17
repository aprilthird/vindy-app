import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React, { ReactNode, useReducer, useMemo, useState } from "react";

import { DatePicker, getDaysOfSelectedMonth } from "../../../utils";
import { ActionKind, CalendarReducer, State } from "./calendar.reducer";

type CalendarContextDefault = {
	state: State;
	selectedDate: Dayjs;
	setDaysAvailable: (data: any[]) => void;
	days: any[];
	handleChangeNextWeek: () => void;
	handleChangePrevWeek: (data: DatePicker) => void;
	handleSelectedDate: (data: DatePicker) => void;
	setAllowAllButtons: (data: boolean) => void;
};

type CalendarProviderProps = {
	children: ReactNode;
};

export const CalendarContext = React.createContext(
	{} as CalendarContextDefault
);

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
	children,
}) => {
	const [selectedDate, setSelectedDate] = useState(dayjs());
	const [state, dispatch] = useReducer(CalendarReducer, {
		dateSelected: null,
		daysAvailable: [],
		allowAll: false,
	});

	const days = useMemo(() => {
		return getDaysOfSelectedMonth(selectedDate);
	}, [selectedDate]);

	const handleChangeNextWeek = () => {
		setSelectedDate((prevState) => prevState.add(1, "week"));
	};

	const handleChangePrevWeek = (date: DatePicker) => {
		if (date?.date > dayjs()) {
			setSelectedDate((prevState) => prevState.subtract(1, "week"));
		}
	};

	const handleSelectedDate = (date: DatePicker) => {
		dispatch({
			type: ActionKind.SELECT_DATE_CALENDAR,
			payload: date,
		});
	};

	const setDaysAvailable = (data: any[]) => {
		dispatch({
			type: ActionKind.SET_DAYS_AVAILABLE,
			payload: data,
		});
	};

	const setAllowAllButtons = (data: boolean) => {
		dispatch({
			type: ActionKind.SET_ALLOW_ALL_BUTTONS,
			payload: data,
		});
	};

	return (
		<CalendarContext.Provider
			value={{
				state,
				selectedDate,
				setDaysAvailable,
				days,
				handleChangeNextWeek,
				handleChangePrevWeek,
				handleSelectedDate,
				setAllowAllButtons,
			}}
		>
			{children}
		</CalendarContext.Provider>
	);
};
