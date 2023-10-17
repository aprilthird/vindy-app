import { useCallback, useEffect, useState } from "react";
import { IonRippleEffect } from "@ionic/react";
import { WarningCircle as WarningCircleIcon } from "iconoir-react";
import { BUTTON_SIZES } from "../../utils";

import "./chip-select.scss";

type RadioButton = {
	value: string;
	label: string;
};

type ChipSelectProps = {
	options: RadioButton[];
	onChange: (value: string[]) => void;
	onSelected?: (value: string[]) => void;
	placeholder?: string;
	color?: "primary" | "secundary" | "terciary" | "brightpurple";
	rounded?: "full" | "no-full" | "semi-full";
	size?: "small" | "normal" | "large";
	error?: string;
	position?: "left" | "center";
};

export const ChipSelect: React.FC<ChipSelectProps> = ({
	options,
	onChange,
	onSelected = null,
	placeholder = "",
	color = "default",
	size = "normal",
	error = null,
	position = "center",
}) => {
	const [multipleChecked, setMultipleChecked] = useState<string[]>([]);

	useEffect(() => {
		onChange(multipleChecked);
		if (onSelected) {
			onSelected(multipleChecked);
		}
	}, [multipleChecked]);

	const handleMultipleChecked = (value: string) => {
		if (multipleChecked.find((el) => el === value)) {
			const newArray = multipleChecked.filter((el) => el !== value);
			setMultipleChecked(newArray);
		} else {
			setMultipleChecked((prevArray) => [...prevArray, value]);
		}
	};

	const buttonClasses = useCallback(
		(selected: boolean) => {
			return `ion-activatable  justify-center select-none relative overflow-hidden rounded-full py-2 transition my-1
      ${!selected ? `bg-transparent border border-${color}` : `bg-${color}`}
		${BUTTON_SIZES[size]}
		`;
		},
		[color, size]
	);

	const labelClasses = useCallback(
		(selected: boolean) => {
			return `
		capitalize text-sm 
      ${!selected ? `text-${color}` : "text-back"}
		`;
		},
		[color]
	);

	const spanClasses = useCallback(() => {
		return `capitalize text-md 
         ${error ? "text-red-500" : "text-slate-600"}
      `;
	}, [error]);

	return (
		<>
			<div className="w-full flex justify-center my-1 mb-3">
				<div className="flex flex-col space-y-2 w-full">
					<div className="flex flex-row space-x-3 items-center mx-auto">
						<span className={spanClasses()}>{placeholder}</span>
						{error && (
							<span className="block mr-4 text-red-500">
								<WarningCircleIcon
									type="outline"
									color="red"
									width={22}
									height={22}
								/>
							</span>
						)}
					</div>
					<div
						className={
							position === "center"
								? "flex flex-row flex-wrap space-x-1 items-center mx-auto justify-center"
								: "flex flex-row flex-wrap space-x-1 items-center"
						}
					>
						{options.map((btn: RadioButton) => {
							const { value, label } = btn;
							let selected = false;
							if (multipleChecked.find((el: any) => el === value)) {
								selected = true;
							}
							return (
								<div
									className={buttonClasses(selected)}
									onClick={() => handleMultipleChecked(value)}
									key={value}
								>
									<div className="flex items-center m-auto w-full h-full">
										<p className={labelClasses(selected)}>{label}</p>
									</div>
									<IonRippleEffect
										type="bounded"
										className={`${
											color === "back"
												? "custom-ripple-contained-back"
												: "custom-ripple-contained"
										}`}
									></IonRippleEffect>
								</div>
							);
						})}
					</div>
					{error && (
						<div>
							{error && (
								<span className="text-red-400 text-xs ml-2">{error}</span>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};
