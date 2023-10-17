import React from "react";
import { IonRippleEffect, IonSpinner } from "@ionic/react";
import { ReactElement, useCallback } from "react";
import { BUTTONS_VARIANTS, BUTTON_SIZES } from "../../utils";

import "./button.scss";

type ButtonBaseProps = {
	label: string;
	onClick: () => void;
	variant?: "outlined" | "contained";
	color?:
		| "default"
		| "primary"
		| "secundary"
		| "terciary"
		| "brightpurple"
		| "back"
		| "white"
		| "danger";
	rounded?: "full" | "no-full" | "semi-full";
	loading?: boolean;
	size?: "small" | "normal" | "large";
	icon?: ReactElement | null;
	iconPosition?: "left" | "right";
	fullWidth?: boolean;
	disabled?: boolean;
	className?: string;
};

type ButtonProps = ButtonBaseProps &
	React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>;

export const Button: React.FC<ButtonProps> = ({
	variant = "contained",
	color = "default",
	rounded = "no-full",
	size = "normal",
	loading,
	label,
	onClick,
	icon = null,
	iconPosition = "right",
	fullWidth = false,
	disabled = false,
}) => {
	const parenClases = useCallback(() => {
		return `ion-activatable flex items-center justify-center select-none relative overflow-hidden py-4 transition 
      ${
				rounded === "no-full"
					? "rounded-l-xl rounded-tr-xl"
					: rounded === "full"
					? "rounded-full"
					: "rounded-xl"
			}
		${fullWidth ? "w-full" : "w-fit"}
		${disabled && "opacity-70"}
		${BUTTON_SIZES[size]}
      ${BUTTONS_VARIANTS[variant].base}
		${
			variant === "contained" && color === "white"
				? "bg-white"
				: variant === "outlined" && color === "white"
				? "border-2 border-white"
				: BUTTONS_VARIANTS[variant].colors[color]
		}
      `;
	}, [rounded, variant, color, fullWidth, disabled, size]);

	const handleClick = () => {
		if (!disabled) {
			onClick();
		}
	};

	return (
		<>
			<div className={parenClases()} onClick={() => handleClick()}>
				{!loading && (
					<div
						className={`flex flex-row items-center w-full justify-between space-x-2`}
					>
						{icon && iconPosition === "left" && (
							<span className="ml-0">{icon}</span>
						)}
						<div className="w-full flex flex-row">
							<p
								className={` lowercase ${
									fullWidth && !icon
										? "m-auto"
										: icon && iconPosition === "left"
										? "ml-[25%]"
										: ""
								} ${size === "large" ? "font-light" : "font-semibold"}`}
							>
								{label}
							</p>
						</div>
						{icon && iconPosition === "right" && <span>{icon}</span>}
					</div>
				)}
				{loading && variant === "outlined" && (
					<IonSpinner name="circular"></IonSpinner>
				)}
				{loading && variant === "contained" && color !== "back" && (
					<IonSpinner name="circular" color="light"></IonSpinner>
				)}
				{loading && variant === "contained" && color === "back" && (
					<IonSpinner name="circular" color="purple"></IonSpinner>
				)}

				{!disabled && (
					<IonRippleEffect
						type="bounded"
						className={`${
							variant === "outlined"
								? "custom-riple-outlined"
								: variant === "contained" && color === "back"
								? "custom-ripple-contained-back"
								: "custom-ripple-contained"
						}`}
					></IonRippleEffect>
				)}
			</div>
		</>
	);
};
