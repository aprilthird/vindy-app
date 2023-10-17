import { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IonBackdrop, IonRippleEffect } from "@ionic/react";
import { CheckCircle as CheckIcon, Star as StarIcon } from "react-feather";
import { useOutsideClick } from "../../utils/hooks/use-outside-click";
// import TextArea from "../text-area/text-area";
import { CustomPopUpResolver } from "./review.validate";

import "animate.css";
import { TextArea } from "../text-area/text-area";

type role = "cancel" | "confirm" | "dismiss";
type ReviewResponse = {
	review: string;
	role: "confirm";
	rating: 1 | 2 | 3 | 4 | 5 | null;
};

type Buttons = {
	text: string;
	role: role;
	handler?: (data: any) => void;
};

type PopupProps = {
	isOpen: boolean;
	type: "warning" | "alert" | "review" | "success" | "normal";
	message: string;
	title: string;
	confirmButton: Buttons;
	cancelButton?: Buttons;
	onDidDismiss: (data: role | ReviewResponse) => void;
	clickOutSide: boolean;
};

export const CustomPopup: React.FC<PopupProps> = ({
	type,
	title,
	message,
	confirmButton,
	cancelButton,
	onDidDismiss,
	clickOutSide,
	isOpen,
}) => {
	const [rate, setRate] = useState<number>(0);
	const [error, setError] = useState<string>("");

	const { ref, onClickOutside } = useOutsideClick(() => {
		handleDismiss("dismiss");
	});

	const handleRate = (value: any) => {
		// console.log("el rate antes", rate, value);
		setRate(value);
	};

	const icon = <StarIcon size={20} color="#450A7A" />;
	const filledIcon = <StarIcon size={20} color="#450A7A" fill="normal" />;

	// const rating = Array.from({ length: 5 }).map((_, i) => {
	// 	return (
	// 		<span key={i} className="px-1" onClick={() => handleRate(i + 1)}>
	// 			{rate && rate >= i + 1 ? filledIcon : icon}
	// 		</span>
	// 	);
	// });

	const handleDismiss = useCallback(
		(key: role | ReviewResponse) => {
			// console.log("el rate", rate, key);
			if (key === "cancel") {
				if (cancelButton && cancelButton.handler) {
					cancelButton.handler(key);
				}
			}
			if (key === "confirm" && type !== "review") {
				if (confirmButton && confirmButton.handler) {
					confirmButton.handler(key);
				}
			} else if (type === "review") {
				if (confirmButton && confirmButton.handler) {
					confirmButton.handler(key);
				}
			}
			onDidDismiss(key);
		},
		[cancelButton, confirmButton, type]
	);

	const { control, handleSubmit } = useForm({
		resolver: CustomPopUpResolver,
		defaultValues: {
			review: "",
		},
	});

	const onSubmit = useCallback(
		(data: any) => {
			// console.log("la data del review", data, rate);
			setError("");
			if (!rate || rate === 0 || rate < 1) {
				setError("Necesitamos tu rating para este vinder");
			}
			handleDismiss({ ...data, rating: rate, role: "confirm" });
		},
		[rate]
	);

	const buttons = useMemo(() => {
		const content: Buttons[] =
			confirmButton && cancelButton && type !== "review"
				? [cancelButton, confirmButton]
				: type === "review"
				? [confirmButton]
				: [confirmButton];

		return content.map((button, index) => {
			return (
				<div
					key={index}
					className={`ion-activatable select-none relative overflow-hidden ${
						type === "warning" || type === "alert"
							? "bg-terciary"
							: "bg-primary"
					} flex w-full  items-center m-auto p-3 ${
						content.length === 1
							? "rounded-b-lg"
							: content.length > 1 && index === 0
							? "rounded-bl-lg"
							: content.length > 1 && index === 1
							? "rounded-br-lg"
							: ""
					}`}
					onClick={
						type !== "review"
							? () => handleDismiss(button.role)
							: handleSubmit(onSubmit)
					}
				>
					<span className="m-auto text-white font-bold text-md">
						{button.text}
					</span>
					<IonRippleEffect type="bounded"></IonRippleEffect>
				</div>
			);
		});
	}, [
		confirmButton,
		cancelButton,
		handleDismiss,
		handleSubmit,
		onSubmit,
		type,
	]);

	// const animationClasses = useCallback(() => {
	// 	return `w-screen h-screen fixed top-0 z-10 animate__animated ${
	// 		isOpen ? "animate__backInUp" : "animate__backOutDown"
	// 	}  animate__fast`;
	// }, [isOpen]);

	const handleClick = (e: any) => {
		if (clickOutSide) {
			onClickOutside(e);
		}
	};

	return (
		<>
			{isOpen && (
				<IonBackdrop
					visible={true}
					tappable={true}
					stopPropagation={true}
				></IonBackdrop>
			)}

			{/* <div className={animationClasses()}> */}
			<div className="w-full h-full relative ">
				<div
					className="w-2/3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
					style={{ zIndex: 100 }}
					onClick={(e: any) => handleClick(e)}
					ref={ref}
				>
					<div className="w-full bg-white rounded-lg p-4 pb-0 px-0 relative pt-10 z-50">
						<div className=" absolute -top-10 left-1/2 transform -translate-x-1/2 z-50">
							<div
								className={` flex ${
									type === "warning" || type === "alert"
										? "bg-terciary"
										: "bg-primary"
								} rounded-full w-18 h-18 z-50 items-center m-auto justify-center p-2`}
							>
								<CheckIcon
									color="white"
									width={55}
									height={55}
									strokeWidth={2.8}
								/>
							</div>
						</div>
						<div className="px-4 flex flex-col items-center justify-center z-50">
							<div>
								<h2 className="font-bold text-lg text-slate-800 capitalize">
									{title}
								</h2>
							</div>
							<div className="flex text-center py-2 mb-4 px-1">
								<p className="font-light text-slate-600 text-sm">{message}</p>
							</div>
							{type === "review" && (
								<div className="flex flex-col items-center mb-4">
									<div className="flex text-center py-2 mb-1 px-1">
										<span className="px-1" onClick={() => handleRate(1)}>
											{rate && rate >= 1 ? filledIcon : icon}
										</span>
										<span className="px-1" onClick={() => handleRate(2)}>
											{rate && rate >= 2 ? filledIcon : icon}
										</span>
										<span className="px-1" onClick={() => handleRate(3)}>
											{rate && rate >= 3 ? filledIcon : icon}
										</span>
										<span className="px-1" onClick={() => handleRate(4)}>
											{rate && rate >= 4 ? filledIcon : icon}
										</span>
										<span className="px-1" onClick={() => handleRate(5)}>
											{rate && rate >= 5 ? filledIcon : icon}
										</span>
									</div>
									{rate}
									{error && (
										<span className="text-red-400 text-xs text-center">
											{error}
										</span>
									)}
									<div>
										<form>
											<Controller
												control={control}
												name="review"
												render={({
													field: { onChange, ...rest },
													fieldState: { error },
												}) => (
													<TextArea
														placeholder="Escribe una reseña"
														variant="contained"
														color="back"
														change={(value: any) => onChange(value)}
														error={error?.message}
														{...rest}
													/>
												)}
											/>
										</form>
									</div>
									<span
										className="text-xs font-light text-slate-400"
										onClick={() => handleDismiss("cancel")}
									>
										En otro momento
									</span>
								</div>
							)}
						</div>
						<div
							className={`flex flex-row w-full items-center z-50 ${
								type === "warning" || type === "alert"
									? "bg-terciary"
									: "bg-primary"
							} rounded-b-lg`}
						>
							{buttons.map((but) => but)}
						</div>
					</div>
				</div>
			</div>
			{/* </div> */}
		</>
	);
};

// export default React.memo(CustomPopup);
