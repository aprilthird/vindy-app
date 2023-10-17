import {
	ChevronRight as ArrowRightIcon,
	ChevronLeft as ArrowLeftIcon,
} from "react-feather";
import React from "react";
import { useCalendarContext } from "./context/calendar.hook";
import { DatePicker } from "../../utils";
import { Day } from "./day";

export const DaysButton: React.FC = () => {
	const { days, handleChangeNextWeek, handleChangePrevWeek } =
		useCalendarContext();

	return (
		<>
			<div className="flex flex-row items-center w-full">
				<ArrowLeftIcon
					size={30}
					color="#450A7A"
					onClick={() => handleChangePrevWeek(days[0])}
				/>
				<div
					className="flex flex-1 w-full m-auto items-center  justify-between"
					style={{ width: `${days?.length * 50}px` }}
				>
					{days?.map((day: DatePicker, index) => (
						<Day key={index} day={day} />
					))}
				</div>
				<ArrowRightIcon
					size={30}
					color="#450A7A"
					onClick={handleChangeNextWeek}
				/>
			</div>
		</>
	);
};

// export default React.memo(DaysButton);
