import useSWR from "swr";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "../auth/context/auth.hook";
import { VinderProfile, VinderProfileAPI } from "../vinders/entities";
import {
	Calendar as CalendarIcon,
	MapPin as PinIcon,
	ArrowLeft as BackIcon,
	Clock as ClockIcon,
	MessageCircle as MessageIcon,
} from "react-feather";
import { Address } from "../addresses/entities";
import { BASE_COLORS, dayjs } from "../../utils";
import { ToogleSegment, WeekButtons } from "../../components";
import { PATHS } from "../../server";
import { vinderFetcher } from "../../http-client";
import { Shopping } from "../shoppings/entities/shopping.entity";
import { setShoppingsAdapter } from "../shoppings/adapters";
import { IonItem, IonList, IonModal } from "@ionic/react";
import { ShoppingCard } from "../shoppings/shoppig-card/shopping-card";
import { ShoppingReviewModal } from "../shoppings/shopping-review-modal/shopping-review-modal";

const optionsFetcher = {
	revalidateOnFocus: false,
	revalidateOnMount: true,
	revalidateOnReconnect: false,
	refreshWhenOffline: false,
	refreshWhenHidden: false,
	refreshInterval: 0,
};

type BaseProfile = Pick<
	VinderProfileAPI,
	| "name"
	| "logo"
	| "id"
	| "description"
	| "isBusiness"
	| "addresses"
	| "availability"
	| "jobReference"
> &
	Pick<Address, "state">;

type BaseShopping = Pick<Shopping, "id" | "date" | "service" | "time" | "type">;

export const VinderDashboard: React.FC = () => {
	const {
		state: { session },
	} = useAuthContext();

	const [profile, setProfile] = useState<BaseProfile>();
	const [day, setDay] = useState<string | Date>(new Date().toISOString());
	const [type, setType] = useState<"review" | "finished">("review");
	const [shoppings, setShoppings] = useState<BaseShopping[]>([]);
	const [showReview, setShowReview] = useState<{
		isOpen: boolean;
		shoppingId: string;
	}>({ isOpen: false, shoppingId: "" });

	const { data, isLoading, mutate } = useSWR(
		{
			url: `${PATHS.SHOPPING.GET}?date=${day}&type=${type}`,
		},
		vinderFetcher,
		optionsFetcher
	);

	useEffect(() => {
		if (session) {
			setProfile(session.user.vinderProfile as BaseProfile);
		}
	}, [session]);

	useEffect(() => {
		if (typeof data !== "undefined" && data?.data?.length > 0 && !isLoading) {
			setShoppings(setShoppingsAdapter(data?.data));
		}
	}, [data, isLoading]);

	const handleSelectedDate = (data: any) => {
		setShoppings([]);
		setDay(dayjs(data).toISOString());
		mutate();
	};

	const handleType = (data: any) => {
		setShoppings([]);
		setType(data);
		mutate();
	};

	const handleShoppingReview = (data: string) => {
		setShowReview({ isOpen: true, shoppingId: data });
	};

	return (
		<>
			<div>
				<div>
					<p>Bienvenido {profile?.name}</p>
				</div>
				<div>
					<div className="flex flex-row gap-5 items-center py-2">
						<CalendarIcon color={BASE_COLORS.purple} width={20} height={20} />
						<span className="text-slate-700 font-light font-poppins text-sm">
							djdj
						</span>
					</div>
					<WeekButtons allowAll onChange={(data) => handleSelectedDate(data)} />

					<ToogleSegment
						labels={[
							{ name: "agendado", value: "review" },
							{ name: "completado", value: "finished" },
						]}
						labelDefault={type}
						onChange={(data: any) => handleType(data)}
					/>
					<div className="flex flex-col gap-4 w-full py-4">
						<IonList>
							{shoppings.length > 0 &&
								shoppings.map((shopping: BaseShopping) => (
									<IonItem lines="none" key={shopping.id}>
										<ShoppingCard
											shopping={shopping}
											type="VINDER_DASHBOARD"
											vinderAction={(data: string) =>
												handleShoppingReview(data)
											}
										/>
									</IonItem>
								))}
							{shoppings.length === 0 && type === "review" && (
								<IonItem lines="none">
									<p>No hay servicios pendientes para este dia</p>
								</IonItem>
							)}
							{shoppings.length === 0 && type === "finished" && (
								<IonItem lines="none">
									<p>No hay servicios finalizados para este dia</p>
								</IonItem>
							)}
						</IonList>
					</div>
				</div>
			</div>
			{shoppings.length > 0 && (
				<ShoppingReviewModal
					isOpen={showReview.isOpen}
					shoppingId={showReview.shoppingId}
					close={() => setShowReview({ isOpen: false, shoppingId: "" })}
				/>
			)}
		</>
	);
};
