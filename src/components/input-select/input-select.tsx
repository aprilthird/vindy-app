import { ReactElement, useCallback, useEffect, useId, useState } from "react";
import { IonLabel, useIonPicker } from "@ionic/react";
import { AlertCircle as WarningCircleIcon } from "react-feather";
import { BUTTONS_VARIANTS } from "../../utils";
import React from "react";

type SelectOptions = Record<string, string | Record<string, string>>;

type InputSelectProps = {
	options: SelectOptions[];
	placeholder: string;
	change: (value: string) => void;
	label?: string;
	variant?: "contained";
	color?:
		| "default"
		| "primary"
		| "secundary"
		| "terciary"
		| "brightpurple"
		| "back"
		| "white";
	icon?: ReactElement<any>;
	error?: string;
	maxWidth?: number | string;
	value?: any;
	onSelected?: (data: any) => void;
	reset?: boolean;
};

export const InputSelect = React.forwardRef<
	HTMLSelectElement,
	InputSelectProps
>((props: InputSelectProps, ref: any) => {
	const [selected, setSelected] = useState<any>(null);
	const [isFocus, setIsFocus] = useState(false);

	const [present] = useIonPicker();
	const {
		change,
		options,
		placeholder,
		variant = "contained",
		color = "white",
		icon = null,
		label,
		error,
		maxWidth = "100%",
		onSelected = null,
		reset = null,
		...rest
	} = props;

	const uuid = useId();

	const handleFocus = () => {
		setIsFocus(true);
	};

	const handleBlur = () => {
		setIsFocus(false);
	};

	useEffect(() => {
		if (reset) {
			setSelected(null);
			change("");
			if (onSelected) {
				onSelected(null);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reset, onSelected]);

	const openBasePicker = async () => {
		present({
			columns: [
				{
					name: "result",
					options,
				},
			],
			buttons: [
				{
					text: "Cancelar",
					role: "cancel",
				},
				{
					text: "Seleccionar",
					handler: (value) => {
						change(value?.result?.value);
						setIsFocus(false);
						setSelected(value?.result?.text);
						if (onSelected) {
							onSelected(value?.result?.value);
						}
						// setSelected(value?.result?.value);
					},
				},
			],
			backdropDismiss: true,
			onWillDismiss: () => {
				setIsFocus(false);
			},
			animated: true,
		});
	};

	const baseClases = useCallback(() => {
		return `flex flex-col w-full rounded-xl mb-1 transition border
         ${
						variant === "contained" && color === "white"
							? "bg-white border-white"
							: BUTTONS_VARIANTS[variant].colors[color]
					}
         ${BUTTONS_VARIANTS[variant].base}
         ${
						variant === "contained" && color === "white"
							? "bg-white"
							: BUTTONS_VARIANTS[variant].colors[color]
					}
         ${
						isFocus && !error
							? "border-sky-500"
							: (isFocus && error) || error
							? "border-red-400"
							: ""
					}
      `;
	}, [variant, color, isFocus, error]);

	const inputClasses = useCallback(() => {
		return `flex z-0 outline-none w-full h-full pr-4 ml-4 font-light focus:border-sky-500 items-center
         ${variant === "contained" ? "text-slate-600" : `text-${color}`} 
      `;
	}, [color, variant]);

	const handleClickInput = () => {
		handleBlur();
		handleFocus();
		openBasePicker();
	};

	return (
		<>
			<div className="flex flex-col gap-y-2 w-full group" style={{ maxWidth }}>
				{(label || error) && (
					<div className="ml-2 flex flex-col">
						{label && (
							<IonLabel className="text-slate-600" id={`input-field${uuid}`}>
								{label}
							</IonLabel>
						)}
						{error && <span className="text-red-400 text-sm">{error}</span>}
					</div>
				)}
				<div className={baseClases()}>
					<div className="flex items-center h-12 overflow-hidden w-full transition">
						{icon && (
							<span className={`block ml-4 ${error && "text-red-400"}`}>
								{icon}
							</span>
						)}
						<div
							ref={ref}
							className={inputClasses()}
							id={`input-select${uuid}`}
							onClick={() => handleClickInput()}
							onFocus={handleFocus}
							onBlur={handleBlur}
							{...rest}
						>
							<span>{!selected ? placeholder : selected}</span>
						</div>
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
				</div>
			</div>
		</>
	);
});

// export default React.memo(InputSelect);
