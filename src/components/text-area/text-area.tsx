import { useCallback, useId, useState } from "react";
import { IonTextarea } from "@ionic/react";
import { BUTTONS_VARIANTS } from "../../utils";
import React from "react";

type InputFieldProps = {
	placeholder: string;
	error?: string;
	variant?: "outlined" | "contained";
	color?:
		| "default"
		| "primary"
		| "secundary"
		| "terciary"
		| "brightpurple"
		| "back"
		| "white";
	change?: (value: string) => void;
	size?: "small" | "normal" | "large";
	value?: any;
};

export const TextArea = React.forwardRef<HTMLInputElement, InputFieldProps>(
	(props: InputFieldProps, ref: any) => {
		const {
			placeholder,
			error = null,
			variant = "contained",
			color = "white",
			change,
			size = "normal",
			...rest
		} = props;
		const uuid = useId();

		const [isFocus, setIsFocus] = useState(false);
		const handleFocus = () => {
			setIsFocus(true);
		};

		const handleBlur = () => {
			setIsFocus(false);
		};

		const baseClases = useCallback(() => {
			return `flex flex-col gap-y-2 w-full rounded-lg mb-4 transition border
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
					: isFocus && error
					? "border-red-400"
					: ""
			}

			`;
		}, [variant, color, isFocus, error]);

		return (
			<div className="flex flex-col gap-y-2 w-full group">
				<div>
					{error && <span className="text-red-400 text-xs">{error}</span>}
				</div>

				<div className={baseClases()}>
					<IonTextarea
						ref={ref}
						placeholder={placeholder}
						id={`input-field${uuid}`}
						className="z-0 outline-none w-full h-full pr-4 ml-4 font-light text-slate-600 placeholder-slate-400 focus:border-sky-500"
						onIonChange={(e: any) => {
							if (typeof change !== "undefined") {
								change(e?.target?.value);
							}
						}}
						onFocus={handleFocus}
						onBlur={handleBlur}
						rows={size === "normal" ? 3 : size === "small" ? 1 : 5}
						{...rest}
					></IonTextarea>
				</div>
			</div>
		);
	}
);

// export default React.memo(TextArea);
