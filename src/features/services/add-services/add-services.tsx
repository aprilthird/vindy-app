import useSWR from "swr";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	IonContent,
	IonHeader,
	IonItem,
	IonList,
	IonRippleEffect,
	useIonLoading,
} from "@ionic/react";
import { Controller, useForm } from "react-hook-form";
import {
	Edit2 as PenIcon,
	ShoppingBag as ShopIcon,
	CheckCircle as DoneIcon,
} from "react-feather";
import { WarningCircle as WarningCircleIcon } from "iconoir-react";
import {
	Header,
	InputField,
	TextArea,
	ChipSelect,
	Button,
	InputFile,
	CustomPopup,
} from "../../../components";
import { BASE_COLORS } from "../../../utils";
import { AddServiceFormResolver } from "./add-services-form.validate";
import { AddServiceImageResolver } from "./service-image.validate";
import { vinderFetcher } from "../../../http-client";
import { useService } from "../use-services";
import {
	CloudinaryResponse,
	useCloudinary,
} from "../../../features/cloudinary";
import { TagServiceResolver } from "./tag-service.validate";
import { PopupButtons } from "../../../components";

type Pages = {
	show: boolean;
	type: "BACK" | "CONTINUE";
};

type FilesObject = {
	data: string;
	name: string;
	path: string;
};

type AddServicesProps = {
	height: number | null;
	screen: number;
};

type ServicePayloadForm = {
	name: string;
	description: string;
	modality: Array<string>;
	price: any;
	delivery: any;
};

type ServicePayloadState = {
	name?: string;
	description?: string;
	modality?: Array<string>;
	price?: number;
	delivery?: number;
	tags?: Array<string>;
};

const optionsFetcher = {
	revalidateOnFocus: false,
	revalidateOnMount: true,
	revalidateOnReconnect: false,
	refreshWhenOffline: false,
	refreshWhenHidden: false,
	refreshInterval: 0,
};

export const AddServices: React.FC<AddServicesProps> = ({ height, screen }) => {
	const [delivery, setDelivery] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [uploadedImage, setUploadedImage] = useState<boolean>(false);
	const [isLoadingMedia, setIsLoadingMedia] = useState<boolean>(false);
	const [nameError, setNameError] = useState<string>("");
	const [servicePayload, setServicePayload] =
		useState<ServicePayloadState | null>(null);
	const [pageOne, setPageOne] = useState<Pages>({
		show: true,
		type: "CONTINUE",
	});
	const [pageTwo, setPageTwo] = useState<Pages>({
		show: false,
		type: "CONTINUE",
	});
	const [pageThree, setPageThree] = useState<Pages>({
		show: false,
		type: "CONTINUE",
	});
	const [present, dismiss] = useIonLoading();
	const { uploadImage: upload } = useCloudinary();
	const { createTag, createService } = useService();

	const { data: tags, mutate } = useSWR(
		{ url: "tags" },
		vinderFetcher,
		optionsFetcher
	);

	useEffect(() => {
		setIsOpen(false);
	}, []);

	const popButton: PopupButtons = {
		text: "Aceptar",
		role: "confirm",
	};

	const handlePopup = () => {
		setIsOpen(false);
		reset();
		pageTwoReset();
		resetCat();
		pageThreeReset();
		handleResetView();
	};

	useEffect(() => {
		reset();
		handleResetView();
	}, []);

	const handleResetView = () => {
		setPageOne({ show: true, type: "CONTINUE" });
		setPageTwo({ show: false, type: "CONTINUE" });
		setPageThree({ show: false, type: "CONTINUE" });
	};

	const uploadImage = async (
		file: Record<string, string>
	): Promise<CloudinaryResponse> => {
		const response = await fetch(file?.data);
		const blob = await response.blob();

		const formData = new FormData();

		formData.append("file", blob, file?.name);
		formData.append("upload_preset", "saturno_vindy");

		//usar codigo para enviar a cloudinary
		return await upload(formData);
	};

	const tagsOptions = useMemo(() => {
		return tags?.length > 0
			? tags.map((tag: any) => ({
					value: tag?.id,
					label: tag?.name,
			  }))
			: [];
	}, [tags]);

	const {
		control: pageOneControl,
		handleSubmit: pageOneHandleSubmit,
		formState: { isSubmitting: isSubmittingPageOne, errors },
		reset,
		trigger,
	} = useForm<ServicePayloadForm>({
		resolver: AddServiceFormResolver,
		defaultValues: {
			name: "",
			description: "",
			modality: [],
			price: "",
			delivery: "",
		},
	});

	const {
		control: catControl,
		handleSubmit: catHandleSubmit,
		reset: resetCat,
	} = useForm<any>({
		defaultValues: {
			name: "",
		},
	});

	const {
		control: pageTwoControl,
		handleSubmit: pageTwoHandleSubmit,
		formState: { isSubmitting: isSubmittingPageTwo },
		reset: pageTwoReset,
	} = useForm<{ tag: Array<string> }>({
		resolver: TagServiceResolver,
		defaultValues: {
			tag: [],
		},
	});

	const {
		control: pageThreeControl,
		handleSubmit: pageThreeHandleSubmit,
		formState: { isSubmitting: isSubmittingPageThree },
		reset: pageThreeReset,
	} = useForm<{ image: FilesObject }>({
		resolver: AddServiceImageResolver,
		defaultValues: {
			image: {},
		},
	});

	const onSelectedChip = (data: any) => {
		if (data?.find((el: string) => el === "isHome")) {
			setDelivery(true);
		} else {
			setDelivery(false);
		}
	};

	const classesKeyboard = useCallback(
		(type: "BACK" | "CONTINUE") => {
			return `${
				height
					? `h-[${height}]`
					: Object.keys(errors).length !== 0
					? `h-full`
					: "h-full"
			} animate__animated ${
				type === "BACK" ? "animate__slideInLeft" : ""
			}  animate__fast
			`;
		},
		[height, screen]
	);

	const animationClasses = useCallback(
		(type: "BACK" | "CONTINUE") => {
			return `h-full animate__animated ${
				type === "BACK" ? "animate__slideInLeft" : "animate__slideInRight"
			}  animate__fast
			`;
		},
		[height, screen]
	);

	const onSubmitPageOne = (data: ServicePayloadForm) => {
		if (typeof data.delivery === "string") {
			data.delivery = 0;
		}
		setServicePayload({ ...data });
		setPageOne((prev) => ({ ...prev, show: false }));
		setPageTwo({ show: true, type: "CONTINUE" });
	};

	const onSubmitCategoryInput = async (data: any) => {
		await present({
			message: "Cargando...",
		});
		try {
			const response = await createTag(data);
			await dismiss();
			if (response) {
				mutate();
			}
		} catch (error) {
			await dismiss();
		}
	};

	const onSubmitPageTwo = (data: { tag: Array<string> }) => {
		setServicePayload((prev) => ({ ...prev, tags: data.tag }));

		setPageTwo((prev) => ({ ...prev, show: false }));
		setPageThree({ show: true, type: "CONTINUE" });
	};

	const onSubmitPageThree = async (data: { image: FilesObject }) => {
		setUploadedImage(false);
		setIsLoadingMedia(true);
		setNameError("");
		try {
			const image = await uploadImage(data.image);

			if (image && image.image && image.cloudId) {
				setUploadedImage(true);
				const payload = {
					name: servicePayload?.name ? servicePayload.name : "",
					description: servicePayload?.description
						? servicePayload.description
						: "",
					price: servicePayload?.price ? servicePayload.price : 0,
					delivery: servicePayload?.delivery ? servicePayload.delivery : 0,
					isHome: servicePayload?.modality?.includes("isHome") ? true : false,
					atPlace: servicePayload?.modality?.includes("atPlace") ? true : false,
					tags: servicePayload?.tags ? servicePayload?.tags : [],
					image: image,
					isActive: true,
				};

				const response = await createService(payload);

				if (response) {
					setIsOpen(true);
					setIsLoadingMedia(false);
				}
			}
		} catch (error) {
			setIsLoadingMedia(false);
			if (typeof error === "string" && error.trim() === "NAME_ERROR") {
				await trigger("name", { shouldFocus: true });
				setNameError("Ya tienes un servicio con este nombre");
				handleResetView();
			}
		}
	};

	const handlePages = () => {
		if (pageTwo.show) {
			setPageTwo((prev) => ({ ...prev, show: false }));
			setPageOne({ show: true, type: "BACK" });
		} else if (pageThree.show) {
			setPageThree((prev) => ({ ...prev, show: false }));
			setPageTwo({ show: true, type: "BACK" });
		}
	};

	return (
		<>
			{isOpen && (
				<CustomPopup
					isOpen={isOpen}
					type="success"
					title="Servicio Creado"
					message="Haz creado un nuevo servicio. Podras editarlo desde tu perfil"
					confirmButton={popButton}
					clickOutSide={true}
					onDidDismiss={handlePopup}
				/>
			)}
			<IonHeader>
				<Header
					customBack={pageTwo.show || pageThree.show ? handlePages : null}
				/>
			</IonHeader>
			{pageOne.show && (
				<IonContent
					className="ion-padding services"
					style={{
						height: height ? `${height}px` : "100%",
					}}
					scrollY={true}
					forceOverscroll
				>
					<div className={classesKeyboard(pageOne.type)}>
						<div className="h-full w-full ion-padding">
							<div className="h-full flex flex-col justify-between">
								<div className="flex flex-col space-y-2">
									<p className="text-xl font-semibold text-slate-800 ml-0 mb-4">
										Agrega un servicio
									</p>
									<IonList className="flex flex-col space-y-2">
										<IonItem lines="none">
											<Controller
												control={pageOneControl}
												name="name"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<InputField
														placeholder="nombre del servicio"
														icon={
															<PenIcon
																width={20}
																height={20}
																color={BASE_COLORS.gray}
															/>
														}
														change={(value: any) => onChange(value)}
														error={error?.message || nameError}
														value={value}
													/>
												)}
											/>
										</IonItem>
										<IonItem lines="none">
											<Controller
												control={pageOneControl}
												name="description"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<TextArea
														placeholder="breve descripcion del servicio"
														size="large"
														change={(value: any) => onChange(value)}
														error={error?.message}
														value={value}
													/>
												)}
											/>
										</IonItem>
										<IonItem lines="none">
											<div className="flex items-center w-full mx-auto justify-center">
												<Controller
													control={pageOneControl}
													name="modality"
													render={({
														field: { onChange },
														fieldState: { error },
													}) => (
														<ChipSelect
															onChange={(data: any) => onChange(data)}
															onSelected={(data: any) => onSelectedChip(data)}
															color="secundary"
															size="small"
															options={[
																{
																	value: "isHome",
																	label: "Domicilio",
																},
																{
																	value: "atPlace",
																	label: "Local",
																},
															]}
															error={error?.message}
														/>
													)}
												/>
											</div>
										</IonItem>
										<IonItem lines="none">
											<Controller
												control={pageOneControl}
												name="price"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<InputField
														placeholder="precio"
														type="number"
														icon={
															<PenIcon
																width={20}
																height={20}
																color={BASE_COLORS.gray}
															/>
														}
														change={(value: any) => onChange(value)}
														error={error?.message}
														value={value}
													/>
												)}
											/>
										</IonItem>
										{delivery && (
											<IonItem lines="none">
												<Controller
													control={pageOneControl}
													name="delivery"
													render={({
														field: { onChange, value },
														fieldState: { error },
													}) => (
														<InputField
															placeholder="delivery"
															type="number"
															icon={
																<PenIcon
																	width={20}
																	height={20}
																	color={BASE_COLORS.gray}
																/>
															}
															change={(value: any) => onChange(value)}
															error={error?.message}
															value={value}
														/>
													)}
												/>
											</IonItem>
										)}
									</IonList>

									{/* <div className="bg-white w-full py-3 rounded-md">
										<div className="flex flex-row items-center">
											<span className="mx-3">
												<MoneyIcon
													color={BASE_COLORS.gray}
													width={20}
													height={20}
												/>
											</span>
											<p className="text-slate-600">Vas a obtener: 100</p>
										</div>
									</div> */}
								</div>
								<div className="mt-2">
									<Button
										label="continuar"
										color="primary"
										fullWidth
										onClick={pageOneHandleSubmit(onSubmitPageOne)}
										loading={isSubmittingPageOne}
										disabled={isSubmittingPageOne}
									/>
								</div>
							</div>
						</div>
					</div>
				</IonContent>
			)}
			{pageTwo.show && (
				<IonContent className="ion-padding services" scrollY={false}>
					<div className={animationClasses(pageTwo.type)}>
						<div className="h-full w-full ion-padding">
							<div className="h-full flex flex-col justify-between">
								<div className="flex flex-col space-y-2 h-full">
									<p className="text-xl font-semibold text-slate-800 ml-0 mb-4">
										Asigna una categoria a este servicio
									</p>

									<div className="h-full">
										<div className="flex justify-between items-center">
											<div className="flex flex-col w-full">
												<p className="text-sm font-regular text-slate-600 ml-0 mb-4">
													Crea una categoria o selecciona una de la lista
												</p>

												<div className="flex flex-row justify-between space-x-3">
													<Controller
														control={catControl}
														name="name"
														render={({
															field: { onChange, value },
															fieldState: { error },
														}) => (
															<InputField
																placeholder="Crea una categoria"
																icon={
																	<ShopIcon
																		width={20}
																		height={20}
																		color={BASE_COLORS.gray}
																	/>
																}
																change={(value: any) => onChange(value)}
																error={error?.message}
																value={value}
															/>
														)}
														rules={{
															required: "Necesitas escribir una categoria",
														}}
													/>

													<div
														className="bg-primary rounded-full h-10 w-10 flex item-center ion-activatable select-none relative overflow-hidden"
														onClick={catHandleSubmit(onSubmitCategoryInput)}
													>
														<span className="m-auto">
															<DoneIcon
																width={22}
																height={22}
																color={BASE_COLORS.back}
															/>
														</span>
														<IonRippleEffect
															type="bounded"
															className="custom-ripple-contained"
														></IonRippleEffect>
													</div>
												</div>
											</div>
										</div>
										<div className="w-full h-2/3 my-5 flex justify-center">
											{tagsOptions.length > 0 ? (
												<div className="items-center">
													<Controller
														control={pageTwoControl}
														name="tag"
														render={({
															field: { onChange },
															fieldState: { error },
														}) => (
															<ChipSelect
																onChange={(data: any) => onChange(data)}
																color="secundary"
																size="small"
																options={tagsOptions}
																error={error?.message}
															/>
														)}
														rules={{
															required:
																"Debes seleccionar al menos una categoria",
														}}
													/>
												</div>
											) : (
												<div className="w-full h-2/3 flex flex-col space-y-1 items-center">
													<p className="w-2/3 mx-auto text-slate-500 font-medium text-center">
														No hay categorias disponibles, crea alguna para
														continuar
													</p>
													<span className="block mx-auto text-red-500">
														<WarningCircleIcon width={30} height={30} />
													</span>
												</div>
											)}
										</div>

										<div className="mt-2">
											<Button
												label="continuar"
												color="primary"
												fullWidth
												onClick={pageTwoHandleSubmit(onSubmitPageTwo)}
												loading={isSubmittingPageTwo}
												disabled={isSubmittingPageTwo}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</IonContent>
			)}
			{pageThree.show && (
				<IonContent className="ion-padding services" scrollY={false}>
					<div className={animationClasses(pageThree.type)}>
						<div className="h-full w-full ion-padding">
							<div className="h-full flex flex-col justify-between">
								<div className="flex flex-col space-y-2 h-full">
									<p className="text-xl font-semibold text-slate-800 ml-0 mb-4">
										Agrega una imagen para este servicio
									</p>

									<div className="h-full">
										<div className="w-full h-2/3 my-5 flex justify-center">
											<Controller
												control={pageThreeControl}
												name="image"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<>
														<InputFile
															nameFile="image"
															placeholder={"imagen"}
															options={{}}
															onSubmitFile={(data: any) => onChange(data)}
															isUploaded={uploadedImage}
															isUploading={isLoadingMedia}
															error={error ? true : false}
															selected={value}
														/>
														{error && (
															<span className="text-red-400 text-sm ml-2">
																{error?.message}
															</span>
														)}
													</>
												)}
											/>
										</div>

										<div className="mt-2">
											<Button
												label="continuar"
												color="primary"
												fullWidth
												onClick={pageThreeHandleSubmit(onSubmitPageThree)}
												loading={isSubmittingPageThree}
												disabled={isSubmittingPageThree}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</IonContent>
			)}
		</>
	);
};

// export default React.memo(AddServices);
