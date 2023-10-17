import { useContext } from "react";

import { CalendarContext } from "./calendar.context";

export const useCalendarContext = () => {
	return useContext(CalendarContext);
};
