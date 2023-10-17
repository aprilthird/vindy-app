import { useCallback, useEffect, useState } from "react";
import { IonRadio, IonRadioGroup } from "@ionic/react";
import { Icon } from "react-feather";
import { BUTTON_SIZES } from "../../utils";

import "./radio-buttons.scss";

type RadioButton = {
	value: string;
	label: string;
	icon?: Icon | any;
};

type RadioButtonsProps = {
	options: RadioButton[];
	onSelectValue: (value: string | string[]) => void;
	allowMultiple?: boolean;
	variant?: "outlined" | "contained";
	color?:
		| "default"
		| "primary"
		| "secundary"
		| "terciary"
		| "brightpurple"
		| "back";
	rounded?: "full" | "no-full" | "semi-full";
	size?: "small" | "normal" | "large";
	error?: boolean;
};

export const RadioButtons: React.FC<RadioButtonsProps> = ({
	options,
	onSelectValue,
	allowMultiple = false,
	variant = "contained",
	color = "default",
	size = "normal",
	error = false,
}) => {
	const [inputChecked, setInputChecked] = useState<string>(options[0].value);
	const [multipleChecked, setMultipleChecked] = useState<string[]>([]);

	useEffect(() => {
		onSelectValue(multipleChecked);
	}, [multipleChecked]);

	useEffect(() => {
		onSelectValue(inputChecked);
	}, []);

	const handleOneChecked = (value: string) => {
		setInputChecked(value);
		onSelectValue(value);
	};

	const handleMultipleChecked = (value: string) => {
		if (multipleChecked.find((el) => el === value)) {
			const newArray = multipleChecked.filter((el) => el !== value);
			setMultipleChecked(newArray);
		} else {
			setMultipleChecked((prevArray) => [...prevArray, value]);
		}
	};

	const buttonClasses = useCallback(() => {
		return `w-full rounded-lg py-2 transition 
		${allowMultiple ? "my-2" : "my-6"}
		${color === "default" ? "bg-white" : `bg-${color}`}
		${error ? "border border-red-400" : ""}
		${BUTTON_SIZES[size]}
		`;
	}, [color, variant, allowMultiple, size, error]);

	const labelClasses = useCallback(() => {
		return `
		capitalize text-sm 
		${color === "default" ? "text-slate-600" : "text-back"}
		`;
	}, [color]);

	const innerComponent = (btn: RadioButton, disabled: boolean) => {
		const { value, label, icon } = btn;
		return (
			<div className="flex flex-row justify-between items-center px-2 m-auto w-full h-full">
				<div className="flex flex-row space-x-4 items-center w-full">
					{icon && <span>{icon}</span>}
					<p className={labelClasses()}>{label}</p>
				</div>
				<IonRadio
					value={value}
					className={`${disabled && "opacity-100 bg-back rounded-full"}`}
					disabled={disabled}
				></IonRadio>
			</div>
		);
	};

	return (
		<>
			{!allowMultiple ? (
				<IonRadioGroup
					value={inputChecked}
					defaultChecked
					defaultValue={inputChecked}
					allowEmptySelection
				>
					{options?.map((btn: RadioButton) => {
						const { value } = btn;
						return (
							<div
								key={value}
								className={buttonClasses()}
								onClick={() => handleOneChecked(value)}
							>
								{innerComponent(btn, false)}
							</div>
						);
					})}
				</IonRadioGroup>
			) : (
				<>
					{options.map((btn: RadioButton) => {
						const { value } = btn;
						return (
							<IonRadioGroup
								allowEmptySelection
								key={value}
								value={
									multipleChecked.find((el) => el === value) ? value : null
								}
							>
								<div
									className={buttonClasses()}
									onClick={() => handleMultipleChecked(value)}
								>
									{innerComponent(btn, true)}
								</div>
							</IonRadioGroup>
						);
					})}
				</>
			)}
		</>
	);
};

// export default React.memo(RadioButtons);
