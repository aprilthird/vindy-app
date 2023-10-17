import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IonContent, IonItem, IonList, useIonRouter } from "@ionic/react";
import {
	User as UserIcon,
	Phone as PhoneIcon,
	Mail as MailIcon,
	MapPin as PinIcon,
	Key as KeyIcon,
	Briefcase as BagIcon,
	Home as HomeIcon,
} from "react-feather";
import {
	BasicHeader,
	Button,
	CustomPopup,
	InputField,
	InputFile,
	InputSelect,
	MapComponent,
	RadioButtons,
	TextArea,
} from "../../../../components";
import { PopupButtons } from "../../../../components";
import { BASE_COLORS, STATES } from "../../../../utils";
import { useRegisterContext } from "../context/register.context";
import {
	RegisterFlowVinderAddressFormResolver,
	RegisterFlowPersonalVinderFormResolver,
	RegisterFlowVinderTypeBusinessFormResolver,
	RegisterFlowBusinessFilesResolver,
	RegisterFlowLogoVinderResolver,
} from "../resolvers";
import { useAuth } from "../../use-auth";
import {
	ROLES,
	SCREEN_VINDER,
	TYPE_BUSINESS,
} from "../../context/auth.reducer";
import {
	CloudinaryResponse,
	useCloudinary,
} from "../../../../features/cloudinary";

import "animate.css";

type UserForm = {
	send: (data: string) => void;
	height: number | null;
	screen: number;
};

type personalVinderFormFields = {
	username: string;
	email: string;
	password: string;
	confirmPassword?: string;
	name: string;
	dni: string;
	description: string;
};

type FilesFields = Record<string, Record<string, string>>;

type personalVinderTypeBusinessFormField = {
	typeBusiness: string[] | null;
	state: string;
	phone: string;
};

type personalVinderAddressFormFields = {
	nameAddress: string;
	// address: string;
	addressReference: string;
};

type Pages = {
	show: boolean;
	type: "BACK" | "CONTINUE";
};

export const RegisterFlowPersonalVinderForm: React.FC<UserForm> = ({
	send,
	height,
}) => {
	const { state, updatePersonalVinderInfo, setUserId, resetState } =
		useRegisterContext();
	const navigate = useIonRouter();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [uploadedfiles, setUploadedfiles] = useState<boolean>(false);
	const [isLoadingMedia, setIsLoadingMedia] = useState<boolean>(false);
	const [isSubmittingAll, setIsSubmittingAll] = useState<boolean>(false);
	const [emailError, setEmailError] = useState<string>("");
	const [usernameError, setUsernameError] = useState<string>("");
	const [vinderNameError, setVinderNameError] = useState<string>("");
	const [address, setAddress] = useState<string | null>(null);
	const [showPageOne, setShowPageOne] = useState<Pages>({
		show: true,
		type: "CONTINUE",
	});
	const [showPageTwo, setShowPageTwo] = useState<Pages>({
		show: false,
		type: "CONTINUE",
	});
	const [showPageThree, setShowPageThree] = useState<Pages>({
		show: false,
		type: "CONTINUE",
	});
	const [showPageFour, setShowPageFour] = useState<Pages>({
		show: false,
		type: "CONTINUE",
	});
	const [showPageFive, setShowPageFive] = useState<Pages>({
		show: false,
		type: "CONTINUE",
	});
	const [showPageSix, setShowPageSix] = useState<Pages>({
		show: false,
		type: "CONTINUE",
	});

	useEffect(() => {
		setIsOpen(false);
	}, []);

	const popConfirmButton: PopupButtons = {
		text: "Si",
		role: "confirm",
	};
	const popCancelButton: PopupButtons = {
		text: "No",
		role: "cancel",
	};

	const handlePopup = (data: any) => {
		setIsOpen(false);
		if (data === "confirm") {
			submitVinder();
		} else if (data === "cancel") {
			cancelRegister();
		}
	};

	const animationClasses = useCallback((type: "BACK" | "CONTINUE") => {
		return `h-full px-2 animate__animated ${
			type === "BACK" ? "animate__slideInLeft" : "animate__slideInRight"
		}  animate__fast`;
	}, []);

	const {
		control: controlOne,
		handleSubmit,
		formState: { isSubmitting: isSubmittingOne, errors: oneErrors },
		trigger: triggerOne,
	} = useForm<personalVinderFormFields>({
		resolver: RegisterFlowPersonalVinderFormResolver,
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			name: "",
			description: "",
			dni: "",
		},
	});

	const {
		control: controlImages,
		handleSubmit: handleImages,
		formState: { isSubmitting: isSubmittingimages },
	} = useForm<FilesFields>({
		resolver: RegisterFlowBusinessFilesResolver,
		defaultValues: {
			dniPicture: {},
			facePicture: {},
		},
	});

	const {
		control: controlLogo,
		handleSubmit: handleLogo,
		formState: { isSubmitting: isSubmittinglogo },
	} = useForm<FilesFields>({
		resolver: RegisterFlowLogoVinderResolver,
		defaultValues: {
			logo: {},
		},
	});

	const {
		control: controlTwo,
		handleSubmit: handleTypeBusinessForm,
		formState: {
			isSubmitting: isSubmittingTypeBusinessForm,
			errors: twoErrors,
		},
	} = useForm<personalVinderTypeBusinessFormField>({
		resolver: RegisterFlowVinderTypeBusinessFormResolver,
		defaultValues: {
			typeBusiness: null,
			state: "",
			phone: "",
		},
	});

	const {
		control: controlMap,
		handleSubmit: handleMap,
		formState: { isSubmitting: isSubmittingMap },
	} = useForm<any>({
		defaultValues: {
			address: "",
		},
	});

	const {
		control: controlThree,
		handleSubmit: handleFinished,
		formState: { isSubmitting: isSubmittingThree },
	} = useForm<personalVinderAddressFormFields>({
		resolver: RegisterFlowVinderAddressFormResolver,
		defaultValues: {
			addressReference: "",
			nameAddress: "",
		},
	});

	const animationClassesKeyboard = useCallback(
		(type: "BACK" | "CONTINUE") => {
			return `${
				height
					? `h-[${height}]`
					: Object.keys(oneErrors).length !== 0 ||
					  Object.keys(twoErrors).length !== 0
					? `h-screen`
					: "h-full"
			} animate__animated ${
				type === "BACK" ? "animate__slideInLeft" : "animate__slideInRight"
			}  animate__fast
			`;
		},
		[height, oneErrors, twoErrors]
	);

	const animationClassesMap = useCallback((type: "BACK" | "CONTINUE") => {
		return `h-screen bg-transparent
			 animate__animated ${
					type === "BACK" ? "animate__slideInLeft" : "animate__slideInRight"
				}  animate__fast
			`;
	}, []);

	const baseClasses = useCallback(() => {
		return `flex flex-col justify-between h-full`;
	}, []);

	const { uploadImage: upload } = useCloudinary();

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

	const { verifyVinderUser, registerPersonalVinder } = useAuth();

	const onSubmitFirstForm = async (data: personalVinderFormFields) => {
		data.email.toLowerCase();
		data.username.toLowerCase();
		updatePersonalVinderInfo(data);
		setShowPageOne((prev) => ({ ...prev, show: false }));
		setShowPageTwo({ show: true, type: "CONTINUE" });
	};

	const onSubmitImages = (data: FilesFields) => {
		updatePersonalVinderInfo({ ...data });
		setShowPageTwo({ show: false, type: "CONTINUE" });
		setShowPageThree({ show: true, type: "CONTINUE" });
	};

	const onSubmitLogo = async (data: FilesFields) => {
		updatePersonalVinderInfo({ ...data });
		setShowPageThree({ show: false, type: "CONTINUE" });
		setShowPageFour({ show: true, type: "CONTINUE" });
	};

	const onSubmitTypeBusiness = async (
		data: personalVinderTypeBusinessFormField
	) => {
		const payload = {
			isHome: data?.typeBusiness?.includes(TYPE_BUSINESS.IS_HOME),
			atPlace: data?.typeBusiness?.includes(TYPE_BUSINESS.AT_PLACE),
			state: data.state,
			phone: data.phone,
		};
		updatePersonalVinderInfo(payload);

		if (payload.atPlace) {
			setShowPageFour({ show: false, type: "CONTINUE" });
			setShowPageFive({ show: true, type: "CONTINUE" });
		} else {
			//aqui enviar la data a la base de datos
			await onFinishedWithNoAddress(payload);
		}
	};

	const cancelRegister = () => {
		resetState();
		navigate.goBack();
	};

	const onSubmitMap = (data: { address: string }) => {
		const { address } = data;

		if (address) {
			setAddress(address);
			setShowPageFive((prev) => ({ ...prev, show: false }));
			setShowPageSix({ show: true, type: "CONTINUE" });
		}
	};

	const onFinishedWithNoAddress = async (data?: any) => {
		const email = state.personalVinder.email;
		await delay(1000);
		await verifyVinderUser(email)
			.then(async (res: any) => {
				if (typeof res === "object") {
					setIsOpen(true);
				} else {
					await submitVinder(data ? data : null);
				}
			})
			.catch((error: any) => {
				console.log("la respuesta del verify user", error);
			});
	};

	const delay = (ms: number) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	const onFinished = async (data: personalVinderAddressFormFields) => {
		const { addressReference, nameAddress } = data;
		if (address) {
			updatePersonalVinderInfo({ address, addressReference, nameAddress });
			const email = state.personalVinder.email;
			await delay(1000);
			await verifyVinderUser(email)
				.then(async (res: any) => {
					if (typeof res === "object") {
						setIsOpen(true);
					} else {
						await submitVinder(data);
					}
				})
				.catch((error: any) => {
					console.log("la respuesta del verify user", error);
				});
		}
	};

	const submitVinder = async (data?: any) => {
		setIsSubmittingAll(true);
		setIsLoadingMedia(true);
		setUploadedfiles(true);

		const dniPicture = state.personalVinder.dniPicture
			? await uploadImage(state.personalVinder.dniPicture)
			: null;
		const facePicture = state.personalVinder.facePicture
			? await uploadImage(state.personalVinder.facePicture)
			: null;
		const logo = state.personalVinder.logo
			? await uploadImage(state.personalVinder.logo)
			: null;

		let payload = {
			...state.personalVinder,
			role: ROLES.VINDER,
			isBusiness: state.isBusiness,
			country: "VEN",
			screen: SCREEN_VINDER.REGISTER_SCREEN,
			dniPicture,
			facePicture,
			logo,
		};
		if (data) {
			payload = { ...payload, ...data };
		}

		delete payload?.confirmPassword;
		if (payload) {
			await registerPersonalVinder(payload)
				.then((res: any) => {
					setUserId(res?.userId);
					send("CONTINUE");
				})
				.catch(async (error) => {
					setIsSubmittingAll(true);
					if (error.trim() === "EMAIL") {
						await triggerOne("email", { shouldFocus: true });
						setEmailError("Ya existe una cuenta con este correo");
						setShowPageOne({ show: true, type: "BACK" });
						setShowPageFour((prev) => ({ ...prev, show: false }));
						setShowPageFive((prev) => ({ ...prev, show: false }));
					}
					if (error.trim() === "VINDER_USERNAME") {
						await triggerOne("username", { shouldFocus: true });
						setUsernameError("Ya existe una cuenta con este nombre de usuario");
						setShowPageOne({ show: true, type: "BACK" });
						setShowPageFour((prev) => ({ ...prev, show: false }));
						setShowPageFive((prev) => ({ ...prev, show: false }));
					}
					if (error.trim() === "VINDER_NAME") {
						await triggerOne("name", { shouldFocus: true });
						setVinderNameError("Ya existe este nombre de vinder");
						setShowPageOne({ show: true, type: "BACK" });
						setShowPageFour((prev) => ({ ...prev, show: false }));
						setShowPageFive((prev) => ({ ...prev, show: false }));
					}
				});
		}
	};

	const handleShowForm = () => {
		if (showPageOne.show) {
			send("BACK");
		} else if (showPageTwo.show) {
			setShowPageOne({ show: true, type: "BACK" });
			setShowPageTwo((prev) => ({ ...prev, show: false }));
		} else if (showPageThree.show) {
			setShowPageTwo({ show: true, type: "BACK" });
			setShowPageThree((prev) => ({ ...prev, show: false }));
		} else if (showPageFour.show) {
			setShowPageThree({ show: true, type: "BACK" });
			setShowPageFour((prev) => ({ ...prev, show: false }));
		} else if (showPageFive.show) {
			setShowPageFour({ show: true, type: "BACK" });
			setShowPageFive((prev) => ({ ...prev, show: false }));
		} else if (showPageSix.show) {
			setShowPageFive({ show: true, type: "BACK" });
			setShowPageSix((prev) => ({ ...prev, show: false }));
		}
	};

	return (
		<>
			{isOpen && (
				<CustomPopup
					isOpen={isOpen}
					type="warning"
					title="Ya existe un usuarios con esta direccion de correo electronico"
					message="¿Deseas asociar este nueve vinder a dicho usuario?"
					confirmButton={popConfirmButton}
					cancelButton={popCancelButton}
					clickOutSide={true}
					onDidDismiss={handlePopup}
				/>
			)}
			{!showPageFive.show && <BasicHeader send={send} show={handleShowForm} />}
			{showPageOne.show && (
				<IonContent
					style={{
						height: height ? `${height}px` : "100%",
					}}
					className="ion-padding ion-margin-bottom auth"
					scrollY={true}
					forceOverscroll
				>
					<div className={animationClassesKeyboard(showPageOne.type)}>
						<div className="w-full h-full ion-padding">
							<div className={baseClasses()}>
								<div className="flex flex-col space-y-2">
									<p className="text-lg font-semibold text-slate-800 ml-0 mb-4">
										Informacion Fiscal
									</p>
									<IonList className="flex flex-col space-y-2">
										<IonItem lines="none">
											<Controller
												control={controlOne}
												name="username"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<InputField
														placeholder="nombre de usuario"
														icon={
															<UserIcon
																width={20}
																height={20}
																color={BASE_COLORS.gray}
															/>
														}
														change={(value: any) => onChange(value)}
														error={error?.message || usernameError}
														value={value}
													/>
												)}
											/>
										</IonItem>
										<IonItem lines="none">
											<Controller
												control={controlOne}
												name="email"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<InputField
														placeholder="correo electronico"
														icon={
															<MailIcon
																width={20}
																height={20}
																color={BASE_COLORS.gray}
															/>
														}
														change={(value: any) => onChange(value)}
														error={error?.message || emailError}
														value={value}
													/>
												)}
											/>
										</IonItem>
										<IonItem lines="none">
											<Controller
												control={controlOne}
												name="password"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<InputField
														placeholder="contraseña"
														type="password"
														icon={
															<KeyIcon
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
										<IonItem lines="none">
											<Controller
												control={controlOne}
												name="confirmPassword"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<InputField
														placeholder="repetir contraseña"
														type="password"
														icon={
															<KeyIcon
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
										<IonItem lines="none">
											<Controller
												control={controlOne}
												name="name"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<InputField
														placeholder="Nombre de vinder o tu negocio"
														icon={
															<UserIcon
																width={20}
																height={20}
																color={BASE_COLORS.gray}
															/>
														}
														change={(value: any) => onChange(value)}
														error={error?.message || vinderNameError}
														value={value}
													/>
												)}
											/>
										</IonItem>

										<IonItem lines="none">
											<Controller
												control={controlOne}
												name="description"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<TextArea
														placeholder="Escribe una breve descripcion de tu negocio"
														size="large"
														change={(value: any) => onChange(value)}
														error={error?.message}
														value={value}
													/>
												)}
											/>
										</IonItem>
										<IonItem lines="none">
											<Controller
												control={controlOne}
												name="dni"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<InputField
														placeholder="Documento de identidad"
														icon={
															<UserIcon
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
									</IonList>
								</div>
								<div>
									<Button
										label="continuar"
										color="primary"
										disabled={isSubmittingOne}
										loading={isSubmittingOne}
										fullWidth
										onClick={handleSubmit(onSubmitFirstForm)}
									/>
								</div>
							</div>
						</div>
					</div>
				</IonContent>
			)}
			{showPageTwo.show && (
				<IonContent className="ion-padding auth" scrollY={false}>
					<div className={animationClasses(showPageTwo.type)}>
						<div className="h-full w-full flex flex-col ion-padding">
							<div className="flex flex-col justify-between h-full">
								<div className="w-full">
									<p className="text-lg font-semibold text-slate-800 ml-0 mb-4">
										Documento de identidad
									</p>
									<div className="w-full flex flex-col space-y-2 mb-3">
										<Controller
											control={controlImages}
											name="dniPicture"
											render={({
												field: { onChange, value },
												fieldState: { error },
											}) => (
												<>
													<InputFile
														nameFile="dni"
														description="sube una foto de tu dni"
														placeholder={"Perfil o Logo"}
														options={{}}
														onSubmitFile={(data: any) => onChange(data)}
														// onSelect={(data: any) => setDni(data)}
														isUploaded={uploadedfiles}
														isUploading={isLoadingMedia}
														error={error ? true : false}
														selected={value}
														// selected={state.personalVinder.dniPicture}
													/>
													{error && (
														<span className="text-red-400 text-sm ml-2">
															Necesitas subir una foto de tu documento de
															identidad
														</span>
													)}
												</>
											)}
										/>
									</div>
									<div className="w-full flex flex-col space-y-2">
										<Controller
											control={controlImages}
											name="facePicture"
											render={({
												field: { onChange, value },
												fieldState: { error },
											}) => (
												<>
													<InputFile
														nameFile="profile"
														description="sube una foto de tu rostro"
														placeholder={"foto de rostro"}
														options={{}}
														onSubmitFile={(data: any) => onChange(data)}
														// onSelect={(data: any) => setFace(data)}
														isUploaded={uploadedfiles}
														isUploading={isLoadingMedia}
														error={error ? true : false}
														selected={value}
														// selected={state.personalVinder.facePicture}
													/>
													{error && (
														<span className="text-red-400 text-sm ml-2">
															Necesitar subir una foto del rostro del
															representante fiscal
														</span>
													)}
												</>
											)}
										/>
									</div>
								</div>

								<div>
									<Button
										label="continuar"
										color="primary"
										onClick={handleImages(onSubmitImages)}
										fullWidth
										loading={isSubmittingimages}
										disabled={isSubmittingimages}
									/>
								</div>
							</div>
						</div>
					</div>
				</IonContent>
			)}
			{showPageThree.show && (
				<IonContent className="ion-padding auth" scrollY={false}>
					<div className={animationClasses(showPageThree.type)}>
						<div className="h-full w-full flex flex-col ion-padding">
							<div className="flex flex-col justify-between h-full">
								<div className="w-full">
									<p className="text-lg font-semibold text-slate-800 ml-0 mb-4">
										Foto de perfil o logo
									</p>
									<div className="w-full flex flex-col space-y-2">
										<Controller
											control={controlLogo}
											name="logo"
											render={({
												field: { onChange, value },
												fieldState: { error },
											}) => (
												<>
													<InputFile
														nameFile="logo"
														description="sube una foto de perfil o tu logo"
														placeholder={"Perfil o Logo"}
														options={{}}
														onSubmitFile={(data: any) => onChange(data)}
														isUploaded={uploadedfiles}
														isUploading={isLoadingMedia}
														error={error ? true : false}
														selected={value}
													/>
													{error && (
														<span className="text-red-400 text-sm ml-2">
															Necesitas subir una imagen de tu negocio o
															logotipo
														</span>
													)}
												</>
											)}
										/>
									</div>
								</div>
								<div>
									<Button
										label="continuar"
										color="primary"
										onClick={handleLogo(onSubmitLogo)}
										fullWidth
										loading={isSubmittinglogo}
										disabled={isSubmittinglogo}
									/>
								</div>
							</div>
						</div>
					</div>
				</IonContent>
			)}
			{showPageFour.show && (
				<IonContent
					style={{
						height: height ? `${height}px` : "100%",
					}}
					className="ion-padding auth"
					scrollY={true}
					forceOverscroll
				>
					<div className={animationClassesKeyboard(showPageFour.type)}>
						<div className="h-full w-full ion-padding">
							<div className={baseClasses()}>
								<div className="flex flex-col space-y-2">
									<p className="text-lg font-semibold text-slate-800 ml-0 mb-4 px-5">
										Modalidad del vinder
									</p>
									<IonList className="flex flex-col space-y-2">
										<Controller
											control={controlTwo}
											name="typeBusiness"
											render={({
												field: { onChange },
												fieldState: { error },
											}) => (
												<>
													<RadioButtons
														allowMultiple
														error={error?.message ? true : false}
														options={[
															{
																value: TYPE_BUSINESS.IS_HOME,
																label: "Domicilio",
																icon: (
																	<HomeIcon
																		width={20}
																		height={20}
																		color={BASE_COLORS.gray}
																	/>
																),
															},
															{
																value: TYPE_BUSINESS.AT_PLACE,
																label: "Tengo un lugar",
																icon: (
																	<BagIcon
																		width={20}
																		height={20}
																		color={BASE_COLORS.gray}
																	/>
																),
															},
														]}
														onSelectValue={(value: any) => onChange(value)}
													/>
													{error?.message && (
														<span className="text-red-400 text-sm ml-2">
															Debes seleccionar alguna opcion
														</span>
													)}
												</>
											)}
										/>
										<IonItem lines="none">
											<Controller
												control={controlTwo}
												name="state"
												render={({
													field: { onChange },
													fieldState: { error },
												}) => (
													<InputSelect
														placeholder="seleccionar estado"
														label="Selecciona el estado donde ofreces tus servicios"
														icon={
															<PinIcon
																width={20}
																height={20}
																color={BASE_COLORS.gray}
															/>
														}
														change={(value: any) => onChange(value)}
														error={error?.message}
														options={STATES}
													/>
												)}
											/>
										</IonItem>
										<IonItem lines="none">
											<Controller
												control={controlTwo}
												name="phone"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<InputField
														placeholder="000 000 0000"
														type="tel"
														icon={
															<PhoneIcon
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
									</IonList>
								</div>
								<div>
									<Button
										label="continuar"
										color="primary"
										onClick={handleTypeBusinessForm(onSubmitTypeBusiness)}
										fullWidth
										loading={isSubmittingTypeBusinessForm}
										disabled={isSubmittingTypeBusinessForm}
									/>
								</div>
							</div>
						</div>
					</div>
				</IonContent>
			)}
			{showPageFive.show && (
				<IonContent
					style={{
						height: height ? `${height}px` : "100vh",
					}}
					scrollY={false}
					forceOverscroll
					className="map"
				>
					<div className={animationClassesMap(showPageFive.type)}>
						<Controller
							control={controlMap}
							name="address"
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<MapComponent
									backButton={{
										show: true,
										action: handleShowForm,
									}}
									mapError={error?.message}
									onChange={(value: any) => onChange(value)}
								/>
							)}
							rules={{
								required: "Debes selecionar una direccion",
							}}
						/>
						<div className="fixed bottom-10 left-0 right-0 z-50">
							<div
								className="px-5"
								style={{
									zIndex: 110,
								}}
							>
								<Button
									label="continuar"
									color="primary"
									onClick={handleMap(onSubmitMap)}
									fullWidth
									loading={isSubmittingMap}
									disabled={isSubmittingMap}
								/>
							</div>
						</div>
					</div>
				</IonContent>
			)}
			{showPageSix.show && (
				<IonContent
					style={{
						height: height ? `${height}px` : "100%",
					}}
					className="ion-padding ion-margin-bottom auth"
					scrollY={true}
					forceOverscroll
				>
					<div className={animationClasses(showPageSix.type)}>
						<div className="h-full w-full flex flex-col ion-padding">
							<div className="flex flex-col h-full justify-between">
								<div className="flex flex-col space-y-2 h-2/3">
									<p className="text-lg font-semibold text-slate-800 ml-0 mb-4">
										Detalles de la direccion
									</p>
									<Controller
										control={controlThree}
										name="nameAddress"
										render={({
											field: { onChange, value },
											fieldState: { error },
										}) => (
											<InputField
												placeholder="Nombre ara esta direccion"
												icon={
													<UserIcon
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

									<Controller
										control={controlThree}
										name="addressReference"
										render={({
											field: { onChange, value },
											fieldState: { error },
										}) => (
											<TextArea
												placeholder="referencia"
												size="large"
												change={(value: any) => onChange(value)}
												error={error?.message}
												value={value}
											/>
										)}
									/>
								</div>
								<div>
									<Button
										label="continuar"
										color="primary"
										onClick={handleFinished(onFinished)}
										fullWidth
										loading={isSubmittingThree || isSubmittingAll}
										disabled={isSubmittingThree || isSubmittingAll}
									/>
								</div>
							</div>
						</div>
					</div>
				</IonContent>
			)}
		</>
	);
};

// export default React.memo(RegisterFlowPersonalVinderForm);
