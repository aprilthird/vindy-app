import React, { ReactElement, useCallback, useId, useState } from "react";
import { IonInput, IonLabel } from "@ionic/react";
import { WarningCircle as WarningCircleIcon } from "iconoir-react";
import { BUTTONS_VARIANTS } from "../../utils";

import "./input.scss";

type InputFieldProps = {
	type?: "text" | "password" | "tel" | "email" | "number";
	label?: string;
	variant?: "outlined" | "contained";
	color?:
		| "default"
		| "primary"
		| "secundary"
		| "terciary"
		| "brightpurple"
		| "back"
		| "white";
	placeholder?: string;
	icon?: ReactElement<any>;
	error?: string;
	maxWidth?: number | string;
	readOnly?: boolean;
	change?: (value: string) => void;
	value?: any;
};

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
	(props: InputFieldProps, ref: any) => {
		const {
			type = "text",
			variant = "contained",
			color = "white",
			placeholder,
			icon = null,
			label,
			error,
			maxWidth = "100%",
			change,
			...rest
		} = props;
		const [isFocus, setIsFocus] = useState(false);
		const handleFocus = () => {
			setIsFocus(true);
		};

		const handleBlur = () => {
			setIsFocus(false);
		};

		const uuid = useId();

		const baseClases = useCallback(() => {
			return `flex flex-col w-full rounded-xl mb-1 transition border
			${
				variant === "contained" && color === "white"
					? "bg-white border-white"
					: variant === "outlined" && color === "white"
					? "border-2 border-white"
					: BUTTONS_VARIANTS[variant].colors[color]
			}
			${BUTTONS_VARIANTS[variant].base}
			${
				variant === "contained" && color === "white"
					? "bg-white"
					: variant === "outlined" && color === "white"
					? "border-2 border-white"
					: BUTTONS_VARIANTS[variant].colors[color]
			}
			${
				isFocus && !error
					? "border-sky-500"
					: (!isFocus && error) || (isFocus && error)
					? "border-red-400"
					: ""
			}

			`;
		}, [variant, color, isFocus, error]);

		const inputClasses = useCallback(() => {
			return `custom-input z-0 outline-none w-full h-full pr-4 ml-4 font-light focus:border-sky-500
				 ${variant === "contained" ? "text-slate-600" : `text-${color}`} 
				`;
		}, [variant, color]);

		return (
			<div
				className="flex flex-col gap-y-1 w-full group mb-1 "
				style={{ maxWidth }}
			>
				<div className={baseClases()}>
					<div className="flex items-center h-11 overflow-hidden w-full transition">
						{icon && (
							<span className={`block ml-4 ${error && "text-red-400"}`}>
								{icon}
							</span>
						)}
						{type === "tel" && <span className="text-slate-600 ml-2">+58</span>}
						<IonInput
							type={type}
							placeholder={placeholder}
							ref={ref}
							id={`input-field${uuid}`}
							className={inputClasses()}
							onIonChange={(e: any) => {
								if (typeof change !== "undefined") {
									change(e?.target?.value);
								}
							}}
							onFocus={handleFocus}
							onBlur={handleBlur}
							{...rest}
						/>
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
				{(label || error) && (
					<div>
						{label && (
							<IonLabel className="text-slate-600" id={`input-field${uuid}`}>
								{label}
							</IonLabel>
						)}
						{error && (
							<span className="text-red-400 text-xs ml-2">{error}</span>
						)}
					</div>
				)}
			</div>
		);
	}
);
