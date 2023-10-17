import { useCallback } from "react";
import { IonImg, IonRippleEffect, useIonRouter } from "@ionic/react";
import {
	MoreVertical as OptionsIcon,
	Heart as LikeIcon,
	PauseCircle as PauseIcon,
	PlayCircle as PlayIcon,
} from "react-feather";
import { BASE_COLORS, getDaysAvailableFormatter } from "../../../utils";
import { ROLES } from "../../../features/auth/context/auth.reducer";

import {
	Shopping,
	TYPE_SHOPPING,
} from "../../shoppings/entities/shopping.entity";

import "./shopping-card.scss";

const TYPES = {
	VINDER_DASHBOARD: "VINDER_DASHBOARD",
	MEMBER_WAITING_RESPONSE: "MEMBER_WAITING_RESPONSE",
	MEMBER_MAKE_PAYMENT: "MEMBER_MAKE_PAYMENT",
	CUSTOM_SERVICE: "CUSTOM_SERVICE",
	VINDER_START_SERVICE: "VINDER_START_SERVICE",
	VIEW_DETAILS: "VIEW_DETAILS",
};

type ShoppingCardBaseProps = {
	shopping: Pick<Shopping, "id" | "date" | "service" | "time" | "type">;
	type?: typeof TYPES | string;
	show?: ROLES;
	vinderAction?: (value: string) => void;
};

export const ShoppingCard: React.FC<ShoppingCardBaseProps> = ({
	shopping,
	type = TYPES.VINDER_DASHBOARD,
	show = ROLES.MEMBER,
	vinderAction,
}) => {
	const navigation = useIonRouter();

	const baseClasses = useCallback(() => {
		return `
		${
			type === "CUSTOM_SERVICE"
				? "w-full h-fit rounded-xl custom-bg-service my-2"
				: "w-full h-fit rounded-xl bg-primary my-2"
		}
		`;
	}, [type]);

	const timeFormatted = (value: string) => {
		const time = value.split(":");
		return `${time[0]}:${time[1]}`;
	};

	const handleVinderAction = () => {
		if (vinderAction) {
			vinderAction(shopping.id);
		}
	};

	const bottom = () => {
		let button;
		switch (type) {
			case TYPES.CUSTOM_SERVICE:
				button = (
					<div className="flex items-center my-auto mx-auto">
						<span className="text-back text-xs font-light text-center">
							hacer cotización
						</span>
					</div>
				);
				break;

			case TYPES.VINDER_DASHBOARD:
				button = (
					<div
						onClick={() => handleVinderAction()}
						className="flex flex-row items-center justify-evenly my-auto"
					>
						<span className="text-back text-xs text-center font-light w-1/2">
							detalles
						</span>
					</div>
				);
				break;
			case TYPES.MEMBER_WAITING_RESPONSE:
				button = (
					<div className="flex items-center my-auto mx-auto">
						<span className="text-back text-xs font-light text-center">
							esperando confirmación
						</span>
					</div>
				);
				break;
			case TYPES.MEMBER_MAKE_PAYMENT:
				button = (
					<div className="flex flex-row items-center justify-evenly my-auto">
						<span className="text-back text-xs text-center font-light w-1/2">
							pagar
						</span>
						<span className="text-back text-xs text-center font-light w-1/2">
							detalles
						</span>
					</div>
				);
				break;
			case TYPES.VIEW_DETAILS:
				button = (
					<div className="flex items-center my-auto mx-auto">
						<span className="text-back text-xs font-light text-center">
							ver detalles
						</span>
					</div>
				);
				break;

			default:
				break;
		}
		return button;
	};

	return (
		<>
			<div className={baseClasses()}>
				<div className="w-full h-28 rounded-xl bg-white p-1 flex flex-row justify-between items-center">
					<div className="flex-1 h-full p-2 px-3">
						<div className="flex flex-col space-y-1">
							<span className="text-slate-700 text-sm font-light capitalize">
								{shopping.service.name}
							</span>
							<p className="text-slate-800 font-semibold text-md capitalize">
								{shopping.type === TYPE_SHOPPING.is_home ? "Domiclio" : "Local"}
							</p>
							<span className="text-slate-500 text-xs font-light capitalize">
								{timeFormatted(shopping.time)}
							</span>
							<span className="text-slate-500 text-xs font-light capitalize">
								{String(shopping.date)}
							</span>
						</div>
					</div>
					<div className="h-24 w-24 rounded-xl overflow-hidden relative">
						<IonImg
							src={shopping.service.image}
							alt="alt servicio"
							className="bg-center"
						/>
					</div>
				</div>
				<div className="w-full p-2 px-3 flex flex-col my-auto ion-activatable select-none relative overflow-hidden transition">
					{bottom()}
					<IonRippleEffect
						type="bounded"
						className={
							type === TYPES.CUSTOM_SERVICE
								? "custom-ripple-contained-purple"
								: "custom-ripple-contained"
						}
					></IonRippleEffect>
				</div>
			</div>
		</>
	);
};

// export default React.memo(ShoppingCard);
