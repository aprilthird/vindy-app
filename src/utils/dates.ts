import type { Dayjs } from "dayjs";
import dayjs, { isDayjs } from "dayjs";
import isToday from "dayjs/plugin/isToday";
import updateLocale from "dayjs/plugin/updateLocale";
import { DaysAvailable } from "../features/vinders/entities";

import "dayjs/locale/es";

dayjs.extend(isToday);

dayjs.locale("es");

dayjs.extend(updateLocale);
dayjs.updateLocale("es", {
	weekdaysMin: ["D", "L", "M", "M", "J", "V", "S"],
	weekdaysShort: ["D", "L", "M", "M", "J", "V", "S"],
	weekStart: 0,
	months: [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agost",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre",
	],
});

export { dayjs };

export type DatePicker = {
	date: Dayjs;
	isWeekend: boolean;
};

export const getDaysOfSelectedMonth = (selectedDate: Dayjs): DatePicker[] => {
	const firstDayOfWeek = selectedDate.startOf("week");

	return Array.from({ length: 7 }).map((_, i) => {
		const date = dayjs(firstDayOfWeek).add(i, "day");
		return {
			date,
			isWeekend: date.day() === 6 || date.day() === 0,
		};
	});
};

export const getFormattedDate = (
	date: Date | Dayjs,
	format = "ddd/MM/YYYY"
): string => {
	if (isDayjs(date)) {
		return date.format(format);
	}

	return dayjs(date).format(format);
};

export const getFormatterTime = (
	date: Date | Dayjs,
	format = "hh:mm A"
): string => {
	if (isDayjs(date)) {
		return date.format(format);
	}

	return dayjs(date).format(format);
};

export const DAYS = [
	{
		value: "DOMINGO",
		label: "Do",
		isWeekend: true,
	},
	{
		value: "LUNES",
		label: "Lu",
		isWeekend: false,
	},
	{
		value: "MARTES",
		label: "Ma",
		isWeekend: false,
	},
	{
		value: "MIERCOLES",
		label: "Mi",
		isWeekend: false,
	},
	{
		value: "JUEVES",
		label: "Ju",
		isWeekend: false,
	},
	{
		value: "VIERNES",
		label: "Vi",
		isWeekend: false,
	},
	{
		value: "SABADO",
		label: "Sa",
		isWeekend: true,
	},
];

export const getDaysAvailableFormatter = (
	days: Pick<DaysAvailable, "day">[]
): string => {
	const maxIndex = days?.length - 1;

	const first = days[0]?.day?.match(/.{1,3}/g);
	const end = days[maxIndex]?.day?.match(/.{1,3}/g);

	if (first && first?.length > 0 && end && end?.length > 0) {
		return `${end[0].toLocaleLowerCase()} - ${first[0].toLocaleLowerCase()}`;
	}

	return "";
};

export const getHoursAvailableFormatter = (from: any, to: any): string => {
	const start = dayjs("01-01-1970 " + from).format("h:mm a");
	const end = dayjs("01-01-1970 " + to).format("h:mm a");

	return `${start} - ${end}`;
};

export const getLongFormattedDate = (date: Date | Dayjs) => {
	const month = dayjs(date).format("MMMM");
	const day = dayjs(date).format("D");
	const weekday = dayjs(date).format("dddd");
	const year = dayjs(date).format("YYYY");

	return `${weekday} ${day} de ${month} de ${year}`;
};
