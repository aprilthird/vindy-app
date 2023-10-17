import { useCallback } from "react";
import { IonImg, IonRippleEffect, useIonRouter } from "@ionic/react";
import {
	MoreVertical as OptionsIcon,
	Heart as LikeIcon,
	PauseCircle as PauseIcon,
	PlayCircle as PlayIcon,
} from "react-feather";
import { BASE_COLORS, getDaysAvailableFormatter } from "../../../utils";
import { Service } from "../entities";
import { ROLES } from "../../../features/auth/context/auth.reducer";

import "./service-card.scss";

const TYPES = {
	MEMBER_SEARCH: "MEMBER_SEARCH",
	MEMBER_MAKE_REQUEST: "MEMBER_MAKE_REQUEST",
	MEMBER_WAITING_RESPONSE: "MEMBER_WAITING_RESPONSE",
	MEMBER_MAKE_PAYMENT: "MEMBER_MAKE_PAYMENT",
	VINDER_PROFILE: "VINDER_PROFILE",
	CUSTOM_SERVICE: "CUSTOM_SERVICE",
	VINDER_START_SERVICE: "VINDER_START_SERVICE",
	VIEW_DETAILS: "VIEW_DETAILS",
};

type ServiceCardBaseProps = {
	service: Service;
	type?: typeof TYPES | string;
	show?: ROLES;
};

export const ServiceCard: React.FC<ServiceCardBaseProps> = ({
	service,
	type = TYPES.VINDER_PROFILE,
	show = ROLES.MEMBER,
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

	const handleRedirectToVinderPage = () => {
		navigation.push(`/vinders/${service.vinder.id}`, "forward", "replace");
	};

	const handleRedirectToServicePage = () => {
		navigation.push(
			`/services/${service.id}/${service.vinder.id}`,
			"forward",
			"replace"
		);
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
			case TYPES.MEMBER_SEARCH:
				button = (
					<div
						onClick={() => handleRedirectToVinderPage()}
						className="flex flex-row items-center justify-between my-auto"
					>
						<span className="text-back text-xs font-light">
							agendar servicio
						</span>

						<span className="text-back text-xs font-light block items-end justify-end">
							$14.99
						</span>
					</div>
				);
				break;
			case TYPES.MEMBER_MAKE_REQUEST:
				button = (
					<div
						onClick={() => handleRedirectToServicePage()}
						className="flex flex-row items-center justify-between my-auto"
					>
						<span className="text-back text-xs font-light">
							agendar servicio
						</span>

						<span className="text-back text-xs font-light block items-end justify-end">
							$14.99
						</span>
					</div>
				);
				break;
			case TYPES.VINDER_PROFILE:
				button = (
					<div className="flex flex-row items-center justify-between my-auto">
						<span className="text-back text-xs font-light">$14.99</span>

						<span className="text-back text-xs font-light block items-end justify-end">
							<OptionsIcon width={20} height={20} strokeWidth={1} />
						</span>
					</div>
				);
				break;
			case TYPES.VINDER_START_SERVICE:
				button = (
					<div className="flex flex-row items-center justify-evenly my-auto">
						<span className="text-back text-xs text-center font-light w-1/2">
							iniciar
						</span>
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
				<div className="w-full h-32 rounded-xl bg-white p-1 flex flex-row justify-between items-center">
					<div className="flex-1 h-full p-2 px-3">
						<div className="flex flex-col space-y-1">
							<span className="text-slate-700 text-sm font-light capitalize">
								{service.vinder.name}
							</span>
							<p className="text-slate-800 font-semibold text-md capitalize">
								{service.name}
							</p>
							<span className="text-slate-500 text-xs font-light capitalize">
								{service.vinder.state}
							</span>
							<span className="text-slate-500 text-xs font-light capitalize">
								{getDaysAvailableFormatter(service.vinder.availability.days)}
								{service.vinder.availability.isAlwaysOpen ?? " / 24h"}
							</span>
						</div>
					</div>
					<div className="h-28 w-28 bg-yellow-500 rounded-xl overflow-hidden relative">
						<IonImg src={service.image} alt="alt servicio" />
						<div className="h-7 w-7 bg-back absolute top-0 right-0 rounded-bl-lg p-1 ion-activatable select-none overflow-hidden transition">
							<div className="flex items-center">
								{show === ROLES.MEMBER && (
									<LikeIcon
										height={20}
										width={20}
										color={BASE_COLORS.purple}
										className="m-auto"
									/>
								)}

								{show === ROLES.VINDER && service.isActive && (
									<PauseIcon
										height={20}
										width={20}
										color={BASE_COLORS.purple}
										className="m-auto"
									/>
								)}
								{show === ROLES.VINDER && !service.isActive && (
									<PlayIcon
										height={20}
										width={20}
										color={BASE_COLORS.purple}
										className="m-auto"
									/>
								)}
							</div>
							<IonRippleEffect
								type="bounded"
								className="custom-ripple-contained"
							></IonRippleEffect>
						</div>
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

// export default React.memo(ServiceCard);
