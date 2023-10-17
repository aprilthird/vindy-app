import useSWR from "swr";
import { Navigation, Scrollbar, A11y, Virtual, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useEffect, useMemo, useRef, useState } from "react";
import {
	IonButtons,
	IonContent,
	IonHeader,
	IonImg,
	IonModal,
	IonRippleEffect,
	IonToolbar,
	useIonRouter,
} from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import {
	Calendar as CalendarIcon,
	MapPin as PinIcon,
	ArrowLeft as BackIcon,
	Clock as ClockIcon,
	MessageCircle as MessageIcon,
} from "react-feather";
import {
	Button,
	ClickableIcon,
	CustomPopup,
	InputSelect,
	PopupButtons,
	TextArea,
	TimePicker,
	WeekButtons,
} from "../../../components";
import { getCoords } from "../../../utils/geocoder";
import { environment } from "../../../environments/enviroments";
import { useCalendarContext } from "../../../components/calendar";
import { BASE_COLORS, dayjs, getLongFormattedDate } from "../../../utils";
import { ServiceRequestFormResolver } from "./service-request-form.validate";
import { ServiceSlug } from "../entities";
import { PATHS } from "../../../server";
import { memberFetcher } from "../../../http-client";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { useService } from "../use-services";

type FormFields = {
	date: string | Date;
	time: string;
	address?: string;
	message?: string;
};

type OnFinished = FormFields & {
	serviceId: string;
	modality: "isHome" | "atPlace";
};

const enum swithValue {
	HOME = "isHome",
	PLACE = "atPlace",
}

type ServiceRequestFormProps = {
	service: ServiceSlug;
	vinderId: string;
	serviceId: string;
	daysAvailable: any[];
	type: string | "both" | "isHome" | "atPlace";
	swiperRef: any;
	changeSwiper?: any;
};

export const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({
	service,
	serviceId,
	daysAvailable = [],
	type,
	vinderId,
	changeSwiper,
}) => {
	const navigation = useIonRouter();
	const { state } = useCalendarContext();
	const { createShopping } = useService();
	const [selected, setSelected] = useState<string>(
		"Selecciona un dia en el calendario"
	);
	const [coords, setCoords] = useState<string>("");
	const [toolSeg, setToolSeg] = useState<swithValue>(swithValue.HOME);
	const [modality, setModality] = useState<"isHome" | "atPlace">();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [review, setReview] = useState<OnFinished>();
	const [directions, setDirections] = useState<Record<string, string>[]>([]);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const modal = useRef<HTMLIonModalElement>(null);

	const { data } = useSWR(
		{
			url: `${PATHS.ADDRESSES.GET}`,
		},
		memberFetcher
	);

	useEffect(() => {
		if (typeof data !== "undefined" && data?.length > 0) {
			setDirections(data);
		}
	}, [data]);

	const addresses = useMemo(() => {
		return directions.map((address: any) => ({
			value: address?.id,
			text: address?.name,
		}));
	}, [directions]);

	useEffect(() => {
		if (typeof state.dateSelected !== "undefined" && state.dateSelected) {
			setSelected(getLongFormattedDate(state?.dateSelected?.date));
		}
	}, [state.dateSelected]);

	const handleToolService = (index: number) => {
		const key: swithValue = index === 0 ? swithValue.HOME : swithValue.PLACE;
		setToolSeg(key);
	};

	useEffect(() => {
		const getGeocoder = async () => {
			const response = await getCoords();
			if (response) {
				setCoords(response);
			}
		};

		if (type === "both" || type === "atPlace") {
			getGeocoder();
		}
	}, [type]);

	useEffect(() => {
		if (type === "both") {
			setModality(toolSeg);
		} else {
			setModality(type as "isHome" | "atPlace");
		}
	}, [type, toolSeg]);

	useEffect(() => {
		setIsOpen(false);
	}, []);

	const popButton: PopupButtons = {
		text: "Aceptar",
		role: "confirm",
	};
	const handlePopup = () => {
		setIsOpen(false);
		navigation.push(`/vinders/${vinderId}`, "back");
	};

	const { control, handleSubmit } = useForm<FormFields>({
		resolver: ServiceRequestFormResolver(type),
		defaultValues: {
			date: "",
			time: "",
			address: "",
			message: "",
		},
	});

	const homeForm = (
		<div className="w-full flex flex-col gap-3">
			<Controller
				control={control}
				name="address"
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<InputSelect
						options={addresses}
						placeholder="selecciona tu direccion"
						icon={<PinIcon width={20} height={20} color={BASE_COLORS.gray} />}
						change={(value: any) => onChange(value)}
						error={error?.message}
						value={value}
					/>
				)}
			/>
			<Controller
				control={control}
				name="message"
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<TextArea
						placeholder="Deja un mensaje para tu vinder"
						size="large"
						change={(value: any) => onChange(value)}
						value={value}
						error={error?.message}
					/>
				)}
			/>
		</div>
	);

	const placeForm = (
		<div className="w-full flex flex-col gap-3">
			<IonImg
				src={`https://maps.googleapis.com/maps/api/staticmap?center=${coords}&zoom=14&size=300x300&markers=color:red|7Clabel:S|${coords}&key=${environment.MAP_APP_KEY}`}
				className="w-full"
			/>

			<Controller
				control={control}
				name="message"
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<TextArea
						placeholder="Deja un mensaje para tu vinder"
						size="large"
						change={(value: any) => onChange(value)}
						value={value}
						error={error?.message}
					/>
				)}
			/>
		</div>
	);

	const onFinished = (data: FormFields) => {
		const payload: OnFinished = {
			...data,
			date: dayjs(data.date).toISOString(),
			modality: modality as "isHome" | "atPlace",
			serviceId,
		};
		setReview(payload);
		setOpenModal(true);
	};

	const onConfirmReview = async () => {
		if (review) {
			setIsSubmitting(true);
			setOpenModal(false);
			try {
				const response = await createShopping(review);
				if (response) {
					setTimeout(() => {
						setIsSubmitting(false);
						setIsOpen(true);
					}, 300);
				}
			} catch (error) {
				console.log("hubo un error ===>", error);
				setIsSubmitting(false);
			}
		}
	};

	return (
		<>
			{isOpen && (
				<CustomPopup
					isOpen={isOpen}
					type="success"
					title="Esperando confirmacion"
					message="Espera al confirmación del vinder y luego realiza el pago. !Te avisaremos!"
					confirmButton={popButton}
					clickOutSide={true}
					onDidDismiss={handlePopup}
				/>
			)}
			<div className="w-full flex flex-col gap-4 py-2 my-2">
				<div className="flex flex-row gap-3 items-center py-2">
					<CalendarIcon color={BASE_COLORS.purple} width={20} height={20} />
					<span>{selected}</span>
				</div>

				<Controller
					control={control}
					name="date"
					render={({ field: { onChange }, fieldState: { error } }) => (
						<>
							<WeekButtons
								daysAvailable={daysAvailable}
								onChange={(data) => onChange(data)}
							/>
							{error && (
								<span className="text-red-400 text-xs mx-auto">
									{error?.message}
								</span>
							)}
						</>
					)}
				/>

				<Controller
					control={control}
					name="time"
					render={({ field: { onChange }, fieldState: { error } }) => (
						<TimePicker
							label=""
							onChange={(data) => onChange(data)}
							error={error?.message}
						/>
					)}
				/>

				<div className="w-full my-4">
					{type === "both" && (
						<Swiper
							updateOnImagesReady
							slidesPerView={1}
							spaceBetween={10}
							navigation={{
								nextEl: ".swiper-button-next",
								prevEl: ".swiper-button-prev",
							}}
							touchReleaseOnEdges={false}
							simulateTouch={false}
							modules={[Navigation, A11y, Virtual, Scrollbar, Keyboard]}
							onSwiper={(data) => changeSwiper(data)}
							onSlideChange={(slide) => handleToolService(slide?.activeIndex)}
							className="h-full"
							preventClicksPropagation={false}
							preventClicks={false}
							allowTouchMove={false}
						>
							<SwiperSlide className="h-full w-full">{homeForm}</SwiperSlide>
							<SwiperSlide className="h-full w-full">{placeForm}</SwiperSlide>
						</Swiper>
					)}

					{type === "isHome" && homeForm}
					{type === "atPlace" && placeForm}

					<Button
						color="primary"
						label="Continuar"
						onClick={handleSubmit(onFinished)}
						fullWidth
						loading={isSubmitting}
						disabled={isSubmitting}
					/>
				</div>
			</div>
			<IonModal ref={modal} isOpen={openModal}>
				<IonHeader translucent={true} className="ion-no-padding ion-no-margin">
					<IonToolbar className="header ion-no-border ion-no-margin ion-no-padding">
						<div className="flex flex-row items-center justify-between w-full bg-back py-2 px-5">
							<IonButtons slot="start" className="w-1/3">
								<ClickableIcon onClick={() => setOpenModal(false)}>
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
								{service?.name}
							</p>
							<div className="w-3/5 mx-auto my-4 p-[2px] rounded-full bg-[#f1f5f9] border border-secundary ">
								<div className="w-full rounded-full py-1 bg-secundary ion-activatable select-none relative overflow-hidden transition">
									<p className="text-back font-light text-center text-sm">
										{modality === "isHome" ? "Domicilio" : "Local"}
									</p>
									<IonRippleEffect
										type="bounded"
										className="custom-ripple-contained"
									></IonRippleEffect>
								</div>
							</div>
							<div className="flex flex-row gap-5 items-center py-2">
								<CalendarIcon
									color={BASE_COLORS.purple}
									width={20}
									height={20}
								/>
								<span className="text-slate-700 font-light font-poppins text-sm">
									{selected}
								</span>
							</div>
							<div className="flex flex-row gap-5 items-center py-2">
								<ClockIcon color={BASE_COLORS.purple} width={20} height={20} />
								<span className="text-slate-700 font-light font-poppins text-sm">
									{review?.time}
								</span>
							</div>
							<div className="flex flex-row gap-5 items-center py-2">
								<PinIcon color={BASE_COLORS.purple} width={20} height={20} />
								<span className="capitalize text-slate-700 font-light font-poppins text-sm">
									{modality === "isHome"
										? addresses.find((item) => item?.value === review?.address)
												?.text
										: "Local"}
								</span>
							</div>
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
											${service?.price}
										</span>
									</div>
									{modality === "isHome" && (
										<div className="inline-flex justify-between">
											<p className="text-slate-400 font-light text-sm font-poppins">
												delivery
											</p>
											<span className="text-slate-400 font-light text-sm font-poppins">
												{service?.delivery}
											</span>
										</div>
									)}
								</div>
								<div className=" border-t border-slate-400 w-full">
									<div className="inline-flex justify-between w-full p-2 px-5">
										<p className="capitalize font-light">total</p>

										<span>
											{modality === "isHome"
												? Number(service?.price) + Number(service?.delivery)
												: service?.price}
										</span>
									</div>
								</div>
							</div>
						</div>
						<Button
							color="primary"
							fullWidth
							label="Confirmar"
							onClick={() => onConfirmReview()}
						/>
					</div>
				</IonContent>
			</IonModal>
		</>
	);
};
