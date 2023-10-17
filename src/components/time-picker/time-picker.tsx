import { ReactElement, useEffect, useId, useState } from "react";
import { IonDatetime, IonModal } from "@ionic/react";
import { getFormatterTime } from "../../utils";

import "./time-picker.scss";

type time = {
	hour: string;
	minutes: string;
	type: string;
};

type TimePickerProps = {
	onChange: (value: string) => void;
	label: string;
	icon?: ReactElement;
	error?: string;
};

const defaultValue = "2023-04-01T08:00:00-04:00";

export const TimePicker: React.FC<TimePickerProps> = ({
	onChange,
	label,
	icon = null,
	error = null,
}) => {
	const [selected, setSelected] = useState<any>(defaultValue);
	const [time, setTime] = useState<time>({
		hour: "08",
		minutes: "00",
		type: "AM",
	});

	const id = useId();

	const handleTime = (value: any) => {
		setSelected(value);
		const str = getFormatterTime(value);
		const time = str.split(":");
		const hour = time[0];
		const minutes = time[1].split(" ")[0];
		const type = time[1].split(" ")[1];

		setTime({
			hour,
			minutes,
			type,
		});
	};

	useEffect(() => {
		onChange(getFormatterTime(selected, "HH:mm"));
	}, [time]);

	return (
		<div className="flex flex-row">
			<div
				id={`open-time-picker-${id}`}
				className="w-full flex flex-col space-y-3"
			>
				<div className="flex flex-row items-center space-x-4">
					{icon && <div>{icon}</div>}
					<span className="text-sm">{label}</span>
				</div>
				<div className="flex flex-row w-full justify-around px-8">
					<span className="border-b border-slate-300 px-4 py-2">
						{time.hour}
					</span>
					<span className="border-b border-slate-300 px-4 py-2">
						{time.minutes}
					</span>
					<span className="border-b border-slate-300 px-4 py-2">
						{time.type}
					</span>
				</div>
				{error && <span className="text-red-400 text-sm">{error}</span>}
			</div>
			<IonModal
				trigger={`open-time-picker-${id}`}
				mode="ios"
				className="time-picker"
			>
				<IonDatetime
					locale="en-US"
					hourCycle="h12"
					id="datetime"
					presentation="time"
					showDefaultTimeLabel
					showDefaultTitle
					size="cover"
					onIonChange={(value: any) => handleTime(value?.detail?.value)}
				>
					<span slot="title">{label}</span>
				</IonDatetime>
			</IonModal>
		</div>
	);
};

// export default React.memo(TimePicker);
