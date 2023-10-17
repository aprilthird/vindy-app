import { useCallback } from "react";
import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import type { Icon } from "react-feather";

import "./toogle.scss";

type Label = {
	name: string;
	value: string;
	icon?: Icon;
};

type ToggleSegmentProps = {
	labels: Label[];
	color?:
		| "default"
		| "primary"
		| "secundary"
		| "terciary"
		| "brightpurple"
		| "back";
	labelDefault?: string | null;
	onChange?: (data: string | undefined) => void;
	onBlur?: (data: any) => void;
	error?: string;
};

export const ToogleSegment: React.FC<ToggleSegmentProps> = ({
	labels,
	color = "secundary",
	onChange = null,
	labelDefault = null,
	onBlur = null,
	error = null,
}) => {
	const parenClasses = useCallback(() => {
		return `
			rounded-full segment-parent border-2 border-${
				color !== "default" ? color : "slate-700"
			}
		`;
	}, [color]);

	const handleChange = (value: any) => {
		if (onChange) {
			onChange(value);
		}
		if (onBlur) {
			onBlur(value);
		}
	};

	return (
		<div className="flex flex-col space-y-4 my-2">
			<IonSegment
				value={
					labelDefault &&
					labels?.find(
						(i: Label) =>
							i.value.toLocaleLowerCase() === labelDefault.toLocaleLowerCase()
					)
						? labels?.find(
								(i: Label) =>
									i.value.toLocaleLowerCase() ===
									labelDefault.toLocaleLowerCase()
						  )?.value
						: labels[0].value
				}
				className={parenClasses()}
				onIonChange={(e) => handleChange(e?.detail?.value)}
			>
				{labels.map((label: Label) => (
					<IonSegmentButton
						key={label.name}
						value={label.value}
						className={`segment-${color} rounded-full`}
					>
						<IonLabel className="capitalize">{label.name}</IonLabel>
					</IonSegmentButton>
				))}
			</IonSegment>
			{error && <span className="text-red-400 text-sm">{error}</span>}
		</div>
	);
};

// export default React.memo(ToogleSegment);
