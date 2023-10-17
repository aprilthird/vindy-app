import React from "react";
import { Delete as DeleteIcon } from "react-feather";

type NumericKeyboardProps = {
	title?: string;
	defaultValue?: string;
	onSave?: (value: number | string) => void;
	onClose?: () => void;
	regex?: RegExp;
	regexErrorMessage?: string;
	thousandsSeparator?: boolean;
	after?: string;
	before?: string;
	description?: string;
};

export const NumericKeyboard: React.FC<NumericKeyboardProps> = () => {
	const keyBaseStyles =
		"w-full h-14 bg-back text-terciary flex items-center justify-center p-0 text-center text-xl font-bold rounded-lg scale-100 transition duration-150 ease-in-out active:scale-90 active:shadow-lg";

	return (
		<div className=" h-[80%] w-full">
			<div className="grid w-64 grid-cols-3 gap-4">
				{Array.from({ length: 9 }).map((v, index) => (
					<button key={index + 1} className={keyBaseStyles}>
						{index + 1}
					</button>
				))}
				<button className={keyBaseStyles}>,</button>
				<button className={keyBaseStyles}>0</button>
				<button className={keyBaseStyles}>
					<DeleteIcon
						color="#450A7A"
						width={20}
						height={20}
						strokeWidth={2.5}
					/>
				</button>
			</div>
		</div>
	);
};
