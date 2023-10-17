import useSWR from "swr";

import {
	IonButtons,
	IonContent,
	IonHeader,
	IonImg,
	IonModal,
	IonRippleEffect,
	IonToolbar,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import {
	Calendar as CalendarIcon,
	MapPin as PinIcon,
	ArrowLeft as BackIcon,
	Clock as ClockIcon,
	MessageCircle as MessageIcon,
	Grid as GridIcon,
	User as UserIcon,
	Phone as PhoneIcon,
} from "react-feather";
import { Button, ClickableIcon } from "../../../components";
import { BASE_COLORS, getLongFormattedDate } from "../../../utils";
import { PATHS } from "../../../server";
import { vinderFetcher } from "../../../http-client";
import { Shopping } from "../entities/shopping.entity";
import { setShoppingReviewAdapter } from "../adapters";

const optionsFetcher = {
	revalidateOnFocus: false,
	revalidateOnMount: true,
	revalidateOnReconnect: false,
	refreshWhenOffline: false,
	refreshWhenHidden: false,
	refreshInterval: 0,
};

type ShoppingReview = Omit<Shopping, "shoppingPayment" | "shoppingStatus">;

type ShoppingModalProps = {
	isOpen: boolean;
	close: () => void;
	shoppingId: string;
};

export const ShoppingReviewModal: React.FC<ShoppingModalProps> = ({
	isOpen,
	close,
	shoppingId,
}) => {
	const [review, setReview] = useState<ShoppingReview>();
	const { data, isLoading } = useSWR(
		() =>
			isOpen
				? {
						url: `${PATHS.SHOPPING.GET_ONE(shoppingId)}`,
				  }
				: null,
		vinderFetcher,
		optionsFetcher
	);
	const modal = useRef<HTMLIonModalElement>(null);

	useEffect(() => {
		if (typeof data !== "undefined" && !isLoading && !review) {
			setReview(setShoppingReviewAdapter(data));
		}
	}, [data, isLoading]);

	return (
		<IonModal ref={modal} isOpen={isOpen}>
			<IonHeader translucent={true} className="ion-no-padding ion-no-margin">
				<IonToolbar className="header ion-no-border ion-no-margin ion-no-padding">
					<div className="flex flex-row items-center justify-between w-full bg-back py-2 px-5">
						<IonButtons slot="start" className="w-1/3">
							<ClickableIcon onClick={() => close()}>
								<BackIcon
									width={25}
									height={25}
									color={BASE_COLORS.purple}
									strokeWidth={1.5}
								/>
							</ClickableIcon>
						</IonButtons>
						<div className="h-16 w-1/3 flex items-center">
							<IonImg
								src="/assets/img/logo_1.png"
								className="h-16 w-16 mx-auto"
							/>
						</div>
						<IonButtons slot="end" className="w-1/3">
							<div className="bg-transparent"></div>
						</IonButtons>
					</div>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-no-margin" scrollY={false}>
				<div className="w-full flex flex-col justify-between h-full bg-back px-7 pb-10">
					<div className="flex flex-col gap-2 w-full">
						<p className="text-slate-800 font-bold font-poppins text-lg">
							Detalles
						</p>
						<p className="text-slate-500 font-light font-poppins text-md">
							{review?.service.name}
						</p>

						<div className="flex flex-row gap-5 items-center py-2">
							<CalendarIcon color={BASE_COLORS.purple} width={20} height={20} />
							<span className="text-slate-700 font-light font-poppins text-sm">
								{getLongFormattedDate(review?.date!)}
							</span>
						</div>
						<div className="flex flex-row gap-5 items-center py-2">
							<ClockIcon color={BASE_COLORS.purple} width={20} height={20} />
							<span className="text-slate-700 font-light font-poppins text-sm">
								{review?.time}
							</span>
						</div>
						<div className="flex flex-row gap-5 items-center py-2">
							<GridIcon color={BASE_COLORS.purple} width={20} height={20} />
							<span className="text-slate-700 font-light font-poppins text-sm">
								Modalidad: {review?.type === "is_home" ? "Domicilio" : "Local"}
							</span>
						</div>
						{review?.type === "is_home" && (
							<div className="flex flex-row gap-5 items-center py-2">
								<PinIcon color={BASE_COLORS.purple} width={20} height={20} />
								<span className="capitalize text-slate-700 font-light font-poppins text-sm">
									{review?.address?.address}, {review?.address?.state}
								</span>
							</div>
						)}

						{review?.message && (
							<div className="flex flex-row gap-5 items-center py-2">
								<MessageIcon
									color={BASE_COLORS.purple}
									width={20}
									height={20}
								/>
								<span className="text-slate-700 font-light font-poppins text-sm">
									{review?.message}
								</span>
							</div>
						)}

						<p className="text-slate-800 font-bold font-poppins text-lg">
							Acerca del cliente
						</p>
						<div className="flex flex-row gap-5 items-center py-2">
							<UserIcon color={BASE_COLORS.purple} width={20} height={20} />
							<span className="text-slate-700 font-light font-poppins text-sm">
								{review?.profile?.firstName} {review?.profile?.lastName}
							</span>
						</div>
						<div className="flex flex-row gap-5 items-center py-2">
							<PhoneIcon color={BASE_COLORS.purple} width={20} height={20} />
							<span className="text-slate-700 font-light font-poppins text-sm">
								{review?.profile?.phone}
							</span>
						</div>

						<div className="w-full bg-white flex flex-col rounded-lg">
							<p className="text-slate-800 font-bold font-poppins text-lg px-5 pt-5 pb-2">
								Resumen
							</p>
							<div className="px-5 flex flex-col gap-1 pb-5">
								<div className="inline-flex justify-between">
									<p className="text-slate-400 font-light text-sm font-poppins">
										servicio agendado
									</p>
									<span className="text-slate-400 font-light text-sm font-poppins">
										{review?.service?.price}
									</span>
								</div>
								{review?.type === "is_home" && (
									<div className="inline-flex justify-between">
										<p className="text-slate-400 font-light text-sm font-poppins">
											delivery
										</p>
										<span className="text-slate-400 font-light text-sm font-poppins">
											{review?.service?.delivery}
										</span>
									</div>
								)}
							</div>
							<div className=" border-t border-slate-400 w-full">
								<div className="inline-flex justify-between w-full p-2 px-5">
									<p className="capitalize font-light">total</p>

									<span>
										{review?.type === "is_home"
											? Number(review?.service?.price) +
											  Number(review?.service?.delivery)
											: review?.service?.price}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full flex flex-col gap-3">
						<Button
							color="primary"
							fullWidth
							label="Confirmar"
							onClick={() => console.log("el btn de abajo")}
						/>
						<div className="w-full inline-flex gap-4 justify-between">
							<Button
								color="secundary"
								fullWidth
								label="Reagendar"
								onClick={() => console.log("el btn de abajo")}
							/>
							<Button
								fullWidth
								label="Rechazar"
								onClick={() => console.log("el btn de abajo")}
							/>
						</div>
					</div>
				</div>
			</IonContent>
		</IonModal>
	);
};
