import useSWR from "swr";
import type { Swiper as SwiperClass } from "swiper/types";

import { IonContent, IonPage, IonRippleEffect } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { PATHS } from "../../server";
import { memberFetcher } from "../../http-client";
import { ServiceSlug } from "../../features/services/entities";
import { setServiceAdapter } from "../../features/services/adapters";
import { ToogleSegment } from "../../components";
import { CalendarProvider } from "../../components/calendar";
import { ServiceRequestForm } from "../../features/services";

interface ServiceSlugBaseProps
	extends RouteComponentProps<{
		id: string;
		vinderId: string;
	}> {}

export const ServicePage: React.FC<ServiceSlugBaseProps> = ({ match }) => {
	const [service, setService] = useState<ServiceSlug>();
	const [type, setType] = useState<string>();
	const [swiperGalleryRef, setSwiperGalleryRef] = useState<SwiperClass | null>(
		null
	);
	const { data, isLoading } = useSWR(
		{
			url: `${PATHS.SERVICES.GET_ONE(match?.params?.id)}`,
		},
		memberFetcher
	);

	useEffect(() => {
		if (typeof data !== "undefined" && !isLoading) {
			setService(setServiceAdapter(data));
		}
	}, [data, isLoading]);

	useEffect(() => {
		if (typeof service !== "undefined") {
			checkService();
		}
	}, [service]);

	const checkService = () => {
		if (service?.atPlace && service?.isHome) {
			setType("both");
		} else if (!service?.atPlace && service?.isHome) {
			setType("isHome");
		} else if (service?.atPlace && !service?.isHome) {
			setType("atPlace");
		}
	};

	const toogleButton = (label: string) => {
		return (
			<div className="w-3/5 mx-auto my-4 p-[2px] rounded-full bg-[#f1f5f9] border border-secundary ">
				<div className="w-full rounded-full py-1 bg-secundary ion-activatable select-none relative overflow-hidden transition">
					<p className="text-back font-light text-center text-sm">{label}</p>
					<IonRippleEffect
						type="bounded"
						className="custom-ripple-contained"
					></IonRippleEffect>
				</div>
			</div>
		);
	};

	const handleToogle = (type: string | undefined) => {
		const index: number = type === "isHome" ? 0 : 1;
		swiperGalleryRef?.slideTo(index);
	};

	return (
		<IonPage>
			<IonContent
				className="ion-no-margin ion-no-padding profile"
				scrollY
				scrollEvents
			>
				<div
					className="h-[300px] w-full overflow-hidden"
					style={{
						backgroundImage: `url("${service?.image}")`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				></div>
				<div className="w-full bg-back rounded-2xl h-full absolute top-72 left-0 right-0 p-6 pt-7 z-50 pb-9">
					<div className="w-full flex flex-col gap-2">
						<p className="text-slate-700 font-semibold text-lg capitalize">
							{service?.name}
						</p>
						<p className="text-slate-700 font-light text-md">
							{service?.description}
						</p>

						<div className="py-2 w-full">
							{type === "both" ? (
								<ToogleSegment
									labels={[
										{ name: "Domicilio", value: "isHome" },
										{ name: "Local", value: "atPlace" },
									]}
									onChange={handleToogle}
								/>
							) : type === "isHome" ? (
								toogleButton("Domicilio")
							) : type === "atPlace" ? (
								toogleButton("Local")
							) : (
								""
							)}
						</div>

						<p className="text-slate-900 font-poppins font-bold text-6xl mx-auto">
							${service?.price}
						</p>

						{service && type && (
							<CalendarProvider>
								<ServiceRequestForm
									vinderId={match?.params?.vinderId}
									service={service}
									serviceId={service.id}
									daysAvailable={service?.availability?.days}
									type={type as string}
									swiperRef={swiperGalleryRef as any}
									changeSwiper={(data: any) => setSwiperGalleryRef(data)}
								/>
							</CalendarProvider>
						)}
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};
