import useSWR from "swr";
import React, { useEffect, useMemo, useState } from "react";
import { IonContent, IonItem, IonList, IonPage } from "@ionic/react";
import { Button, Carrousel, ClickableIcon, Tags } from "../../components";
import { ServiceCard } from "../../features/services/service-card/service-card";
import { PATHS } from "../../server";
import { memberFetcher } from "../../http-client";
import {
	Star as StarIcon,
	Award as AwardIcon,
	Image as ImageIcon,
	Edit2 as EditIcon,
	Grid as GridIcon,
} from "react-feather";
import {
	BASE_COLORS,
	getDaysAvailableFormatter,
	getHoursAvailableFormatter,
} from "../../utils";
import { setServicesAdapter } from "../../features/services/adapters";
import { Service } from "../../features/services/entities";
import { RouteComponentProps } from "react-router";
import { setVinderProfileAdapter } from "../../features/vinders/adapters";
import { VinderProfile } from "../../features/vinders/entities";
import { Tag } from "../../features/tags/entities";

interface VinderSlugBaseProps
	extends RouteComponentProps<{
		id: string;
	}> {}

export const VinderSlugPage: React.FC<VinderSlugBaseProps> = ({ match }) => {
	const [vinder, setVinder] = useState<VinderProfile>({} as VinderProfile);
	const [services, setSetvices] = useState<Service[]>([]);
	const [activeTag, setActiveTag] = useState<
		Tag | Record<string, string | any>
	>({ id: "todo", name: "todo" });

	const { data, isLoading: isLoadingVinder } = useSWR(
		{
			url: `${PATHS.VINDERS.GET_ONE(match?.params?.id)}`,
		},
		memberFetcher
	);

	useEffect(() => {
		if (typeof data !== "undefined" && !isLoadingVinder) {
			setVinder(setVinderProfileAdapter(data));
		}
	}, [data]);

	const { data: dataServices, isLoading: isLoadingServices } = useSWR(
		{
			url: `${PATHS.SERVICES.GET_BY_VINDER(vinder.id ? vinder?.id : "")}?tag=${
				activeTag?.name !== "todo" ? activeTag?.name : ""
			}`,
		},
		memberFetcher
	);

	const tags = useMemo(() => {
		const all = vinder?.tags?.length > 0 ? vinder?.tags : [];

		if (!all.find((tag: any) => tag?.name === "todo")) {
			all.push({ id: "todo", name: "todo" });
		}

		return all?.map((tag: any) => (
			<Tags
				id={tag?.id}
				name={tag?.name}
				active={activeTag?.id === tag?.id ? true : false}
				onClick={() => setActiveTag(tag)}
				icon={tag?.name === "todo" ? GridIcon : null}
			/>
		));
	}, [vinder, activeTag]);

	useEffect(() => {
		if (typeof dataServices !== "undefined" && !isLoadingServices) {
			setSetvices(setServicesAdapter(dataServices?.data));
		}
	}, [dataServices, isLoadingServices]);

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
						backgroundImage: `url("${vinder?.image}")`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				></div>
				<div className="w-full bg-back rounded-2xl h-full absolute top-72 left-0 right-0 p-6 pt-7 z-50 pb-9">
					<div className="flex flex-col gap-3 px-5">
						<div className="flex flex-row justify-between items-center">
							<p className="text-xl font-bold text-slate-800 capitalize">
								{vinder?.name}
							</p>

							<ClickableIcon>
								<EditIcon
									width={25}
									height={25}
									color={BASE_COLORS.purple}
									strokeWidth={1.2}
								/>
							</ClickableIcon>
						</div>
						<span className="text-slate-400 text-sm font-light">
							{vinder?.jobReference}
						</span>

						<div className="flex flex-row gap-5">
							<span className="capitalize text-slate-800 font-light text-xs">
								{vinder?.availability?.days
									? getDaysAvailableFormatter(vinder?.availability?.days)
									: ""}
							</span>
							<span className="text-slate-800 font-light text-xs">
								{!vinder?.availability?.isAlwaysOpen
									? getHoursAvailableFormatter(
											vinder?.availability?.from,
											vinder?.availability?.to
									  )
									: "24h"}
							</span>
						</div>
						<div className="flex flex-row justify-between">
							<div className="flex flex-row space-x-1 items-center align-middle">
								<ImageIcon
									width={25}
									height={25}
									color={BASE_COLORS.purple}
									strokeWidth={1.2}
								/>
								<span className=" text-terciary text-sm">galeria</span>
							</div>
							<div className="flex flex-row space-x-1 items-center align-middle">
								<StarIcon
									width={25}
									height={25}
									color={BASE_COLORS.purple}
									strokeWidth={1.2}
								/>
								<span className=" text-terciary text-sm">{vinder?.rating}</span>
							</div>
							<div className="flex flex-row space-x-1 items-center align-middle">
								<AwardIcon
									width={25}
									height={25}
									color={BASE_COLORS.purple}
									strokeWidth={1.2}
								/>
								<span className=" text-terciary text-sm">
									{vinder?.reviews}
								</span>
							</div>
						</div>
						<div className="flex flex-col gap-3 mb-2">
							<p className="text-slate-800 font-bold text-lg">Descripcion</p>
							<p className="text-sm text-slate-600 font-light">
								{vinder?.description}
							</p>
						</div>

						<Button
							label="Preguntas y Respuestas"
							fullWidth
							color="primary"
							onClick={() => console.log("di click ")}
						/>
					</div>

					{tags?.length > 0 && (
						<div>
							<Carrousel items={tags} slidesPerView={2} spaceBetween={20} />
						</div>
					)}

					<div className="flex flex-col gap-4 w-full py-4">
						<p className="font-semibold text-2xl">Servicios</p>
						<IonList className="">
							{!isLoadingServices &&
								typeof data !== "undefined" &&
								services?.length > 0 &&
								services.map((service: Service) => (
									<IonItem lines="none" key={service.id}>
										<ServiceCard
											service={service}
											type={"MEMBER_MAKE_REQUEST"}
										/>
									</IonItem>
								))}
						</IonList>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};
