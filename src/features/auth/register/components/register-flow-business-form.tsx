import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IonContent, IonItem, IonList } from "@ionic/react";
import {
	User as UserIcon,
	Phone as PhoneIcon,
	Mail as MailIcon,
	MapPin as PinIcon,
	PenTool as PenIcon,
} from "react-feather";
import { BASE_COLORS, STATES, objectFormatter } from "../../../../utils";
import { useRegisterContext } from "../context/register.context";
import {
	RegisterFlowBusinessFilesResolver,
	RegisterFlowBusinessInfoFormResolver,
	RegisterFlowDocFilesResolver,
} from "../resolvers";
import { useAuth } from "../../use-auth";
import {
	CloudinaryResponse,
	useCloudinary,
} from "../../../../features/cloudinary";

import "animate.css";
import {
	BasicHeader,
	Button,
	InputField,
	InputFile,
	InputPdf,
	InputSelect,
	TextArea,
} from "../../../../components";

type UserForm = {
	send: (data: string) => void;
	height: number | null;
	screen: number;
};

type BusinessFormFields = {
	firstName: string;
	lastName: string;
	email: string;
	dni: string;
	state: string;
	phone: string;
	address: string;
};

type FilesFields = Record<string, Record<string, string>>;

type Pages = {
	show: boolean;
	type: "BACK" | "CONTINUE";
};

export const RegisterFlowBusinessInfo: React.FC<UserForm> = ({
	send,
	height,
	screen,
}) => {
	const { state, updateBusinessRepresentative } = useRegisterContext();
	const [uploadedfiles, setUploadedfiles] = useState<boolean>(false);
	const [isLoadingMedia, setIsLoadingMedia] = useState<boolean>(false);
	const [businessInfo, setBusinessInfo] = useState<
		Record<string, string | Record<string, string>>
	>({});

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
	const { uploadImage: upload } = useCloudinary();

	const animationClasses = useCallback((type: "BACK" | "CONTINUE") => {
		return `h-full animate__animated ${
			type === "BACK" ? "animate__slideInLeft" : "animate__slideInRight"
		}  animate__fast`;
	}, []);

	const uploadFile = async (
		file: Record<string, string> | any
	): Promise<CloudinaryResponse> => {
		const response = await fetch(file?.data);
		const blob = await response.blob();

		const formData = new FormData();

		formData.append("file", blob, file?.name);
		formData.append("upload_preset", "saturno_vindy");

		//usar codigo para enviar a cloudinary
		return await upload(formData);
	};

	const {
		control: controlOne,
		handleSubmit,
		formState: { isSubmitting: isSubmittingOne, errors },
	} = useForm<BusinessFormFields>({
		resolver: RegisterFlowBusinessInfoFormResolver,
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			dni: "",
			state: "",
			phone: "",
		},
	});

	const animationClassesKeyboard = useCallback(
		(type: "BACK" | "CONTINUE") => {
			return `${
				height
					? `h-[${height}]`
					: Object.keys(errors).length !== 0
					? `h-screen`
					: "h-full"
			} animate__animated ${
				type === "BACK" ? "animate__slideInLeft" : "animate__slideInRight"
			}  animate__fast
			`;
		},
		[height, screen, errors]
	);

	const {
		control: controlFiles,
		handleSubmit: handleFiles,
		formState: { isSubmitting: isSubmittingFile },
	} = useForm<FilesFields>({
		resolver: RegisterFlowBusinessFilesResolver,
		defaultValues: {
			dniPicture: {},
			facePicture: {},
		},
	});

	const { control: controlDoc, handleSubmit: handleDoc } = useForm<FilesFields>(
		{
			resolver: RegisterFlowDocFilesResolver,
			defaultValues: {
				mercantilFile: {},
			},
		}
	);

	const { businessInfo: saveBusinessInfo } = useAuth();

	const onSubmitInfo = async (data: BusinessFormFields) => {
		setBusinessInfo(objectFormatter(data));
		setShowPageOne((prev) => ({ ...prev, show: false }));
		setShowPageTwo({ show: true, type: "CONTINUE" });
	};

	const onSubmitFiles = (data: FilesFields) => {
		setBusinessInfo((prev) => ({ ...prev, ...data }));
		setShowPageTwo((prev) => ({ ...prev, show: false }));
		setShowPageThree({ show: true, type: "CONTINUE" });
	};

	const onSubmitDoc = (data: FilesFields) => {
		const payload = {
			...businessInfo,
			...data,
		};

		onFinished(payload);
	};

	const onFinished = async (
		data: Record<string, string | Record<string, string>>
	) => {
		setIsLoadingMedia(true);
		const formmatted = data;
		for (const k in data) {
			if (k === "dniPicture" || k === "facePicture" || k === "mercantilFile") {
				formmatted[k] = await uploadFile(data[k]);
			}
		}

		await saveBusinessInfo({
			...formmatted,
			vinderId: state.vinderId,
			country: "VEN",
		})
			.then(() => {
				updateBusinessRepresentative({
					...formmatted,
					country: "VEN",
				});
				send("CONTINUE");
			})
			.catch((error: any) => {
				console.log("el error en el componente", error);
			});
		setIsLoadingMedia(false);
		setUploadedfiles(true);
	};

	const handleShowForm = () => {
		if (showPageOne.show) {
			send("BACK");
		} else if (showPageTwo.show) {
			setShowPageTwo((prev) => ({ ...prev, show: false }));
			setShowPageOne({ show: true, type: "BACK" });
		} else if (showPageThree) {
			setShowPageThree((prev) => ({ ...prev, show: false }));
			setShowPageTwo({ show: true, type: "BACK" });
		}
	};

	return (
		<>
			<BasicHeader send={send} show={handleShowForm} />
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
						<div className="h-full w-full ion-padding">
							<div className="flex flex-col justify-between h-full">
								<div className="flex flex-col space-y-2">
									<p className="text-lg font-semibold text-slate-800 ml-0 mb-4">
										Datos del responsable legal
									</p>
									<IonList className="flex flex-col space-y-2">
										<IonItem lines="none">
											<Controller
												control={controlOne}
												name="firstName"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<InputField
														placeholder="Nombre del Rep. legal"
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
										<IonItem lines="none">
											<Controller
												control={controlOne}
												name="lastName"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<InputField
														placeholder="Apellido del Rep. legal"
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
										<IonItem lines="none">
											<Controller
												control={controlOne}
												name="email"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<InputField
														placeholder="correo electronico del Rep. legal"
														icon={
															<MailIcon
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
												name="dni"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<InputField
														placeholder="Doc. de identidad del Rep. legal"
														type="text"
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
										<IonItem lines="none">
											<Controller
												control={controlOne}
												name="state"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<InputSelect
														placeholder="seleccionar estado del Rep. legal"
														icon={
															<PinIcon
																width={20}
																height={20}
																color={BASE_COLORS.gray}
															/>
														}
														change={(value: any) => onChange(value)}
														error={error?.message}
														value={value}
														options={STATES}
													/>
												)}
											/>
										</IonItem>
										<IonItem lines="none">
											<Controller
												control={controlOne}
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
										<IonItem lines="none">
											<Controller
												control={controlOne}
												name="address"
												render={({
													field: { onChange },
													fieldState: { error },
												}) => (
													<TextArea
														placeholder="Direccion del Rep. legal"
														size="large"
														change={(value: any) => onChange(value)}
														error={error?.message}
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
										onClick={handleSubmit(onSubmitInfo)}
										disabled={isSubmittingOne}
										loading={isSubmittingOne}
										fullWidth
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
									<div className="w-full flex flex-col space-y-2">
										<Controller
											control={controlFiles}
											name="dniPicture"
											render={({
												field: { onChange, value },
												fieldState: { error },
											}) => (
												<>
													<InputFile
														nameFile="dni"
														description="sube una foto del dni del Rep legal"
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
															Necesitas subir un documento de identidad
														</span>
													)}
												</>
											)}
										/>
										<Controller
											control={controlFiles}
											name="facePicture"
											render={({
												field: { onChange, value },
												fieldState: { error },
											}) => (
												<>
													<InputFile
														nameFile="profile"
														description="sube una foto del resto de tu Rep. legal"
														placeholder={"foto de rostro"}
														options={{}}
														onSubmitFile={(data: any) => onChange(data)}
														isUploaded={uploadedfiles}
														isUploading={isLoadingMedia}
														error={error ? true : false}
														selected={value}
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
										onClick={handleFiles(onSubmitFiles)}
										fullWidth
										loading={isSubmittingFile}
										disabled={isSubmittingFile}
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
										Registro mercantil de tu empresa
									</p>
									<div className="w-full flex flex-col space-y-2">
										<Controller
											control={controlDoc}
											name="mercantilFile"
											render={({
												field: { onChange },
												fieldState: { error },
											}) => (
												<>
													<InputPdf
														onUpload={(data: any) => onChange(data)}
														isUploaded={uploadedfiles}
														isUploading={isLoadingMedia}
														error={error ? true : false}
														description="Sube el registro mercantil de tu empresa"
													/>
													{error && (
														<span className="text-red-400 text-sm ml-2">
															Necesitas subir el regristro mercantil de tu
															empresa
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
										onClick={handleDoc(onSubmitDoc)}
										fullWidth
										loading={isLoadingMedia}
										disabled={isLoadingMedia}
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

// export default React.memo(RegisterFlowBusinessInfo);
