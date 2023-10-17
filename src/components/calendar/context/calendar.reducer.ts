import { DatePicker } from "../../../utils";

export enum ActionKind {
	SELECT_DATE_CALENDAR = "SELECT_DATE_CALENDAR",
	SET_DAYS_AVAILABLE = "SET_DAYS_AVAILABLE",
	SET_ALLOW_ALL_BUTTONS = "SET_ALLOW_ALL_BUTTONS",
}

export type ActionPayload = string | number | object | DatePicker | boolean;

export type Action = {
	type: ActionKind;
	payload?: ActionPayload;
};

export type State = {
	dateSelected: DatePicker | null;
	daysAvailable: any[];
	allowAll: boolean;
};

export const CalendarReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case ActionKind.SELECT_DATE_CALENDAR:
			return { ...state, dateSelected: action.payload as DatePicker };
		case ActionKind.SET_DAYS_AVAILABLE:
			return { ...state, daysAvailable: action.payload as any[] };
		case ActionKind.SET_ALLOW_ALL_BUTTONS:
			return { ...state, allowAll: action.payload as boolean };
		default:
			return state;
	}
};
