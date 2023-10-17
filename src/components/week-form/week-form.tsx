import { useEffect, useState } from "react";
import { DAYS } from "../../utils";
import React from "react";
import { DayInput } from "./day-input";

type WeekFormProps = {
	change: (value: Record<string, string>[]) => void;
	error?: string;
};

export const WeekForm: React.FC<WeekFormProps> = ({ change, error = null }) => {
	const [daySelected, setDaySelected] = useState<Record<string, string>[]>([]);
	const days = DAYS.map((day: any) => ({
		...day,
		selected: false,
	}));

	const handleSelect = (data: any) => {
		if (daySelected.find((el) => el?.day === data)) {
			const newArray = daySelected.filter((el) => el?.day !== data);
			setDaySelected(newArray);
		} else {
			setDaySelected((prev) => [...prev, { day: data }]);
		}
	};

	useEffect(() => {
		change(daySelected);
	}, [daySelected]);

	return (
		<div className="flex flex-col space-y-4 items-center">
			<div className="flex flex-1 w-full m-auto items-center  justify-between px-2">
				{days.map((day: any, index) => (
					<DayInput
						key={index}
						selected={daySelected}
						isWeekend={day?.isWeekend}
						value={day?.value}
						label={day?.label}
						handleSelectedDay={handleSelect}
					/>
				))}
			</div>
			{error && <span className="text-red-400 text-sm">{error}</span>}
		</div>
	);
};

// export default React.memo(WeekForm);
