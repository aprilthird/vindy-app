import React, { useCallback, useEffect } from "react";
import { DaysButton } from "./days-button";
import { useCalendarContext } from "./context/calendar.hook";
import { Dayjs } from "dayjs";

type WeekButtonsBaseProps = {
	daysAvailable?: any[];
	allowAll?: boolean;
	onChange?: (value: Date | Dayjs) => void;
};

export const WeekButtons: React.FC<WeekButtonsBaseProps> = ({
	daysAvailable = [],
	onChange,
	allowAll = false,
}) => {
	const { state, setDaysAvailable, setAllowAllButtons } = useCalendarContext();

	const memoizedChange = useCallback(() => {
		if (
			typeof state.dateSelected !== "undefined" &&
			state.dateSelected &&
			onChange
		) {
			onChange(state?.dateSelected?.date);
		}
	}, [state.dateSelected]);

	useEffect(() => {
		if (
			typeof daysAvailable !== "undefined" &&
			daysAvailable?.length > 0 &&
			state.daysAvailable?.length === 0
		) {
			setDaysAvailable(daysAvailable);
		}
	}, [daysAvailable]);

	useEffect(() => {
		if (
			typeof state.dateSelected !== "undefined" &&
			state.dateSelected &&
			onChange
		) {
			// onChange(state.dateSelected.date);
			memoizedChange();
		}
	}, [state.dateSelected]);

	useEffect(() => {
		if (allowAll) {
			setAllowAllButtons(true);
		}
	}, [allowAll]);

	return <DaysButton />;
};
