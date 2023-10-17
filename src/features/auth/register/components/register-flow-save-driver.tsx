import { useCallback, useState } from "react";
import { IonContent } from "@ionic/react";
import { Controller, useForm } from "react-hook-form";
import { PenTool as PenIcon, Grid as GridIcon } from "react-feather";
import { BASE_COLORS } from "../../../../utils";
import {
	BasicHeader,
	Button,
	InputField,
	InputFile,
	InputSelect,
} from "../../../../components";
import { TRANSPORTS } from "../../context/auth.reducer";
import { useCloudinary } from "../../../../features/cloudinary";
import { useRegisterContext } from "../context/register.context";
import { RegisterFlowVinderDriverFormResolver } from "../resolvers";
import { PersonalVinderFlow, useAuth } from "../../use-auth";
import { FilesObject } from "../context/register.provider";

type RegisterFlowSaveDriverProps = {
	send: any;
	height: number | null;
	screen: number;
};

type RegisterFormDriverFields = {
	licenseDriver: FilesObject;
	typeTransport: string;
	plate: string;
	transportColor: string;
};

export const RegisterFlowSaveDriver: React.FC<RegisterFlowSaveDriverProps> = ({
	send,
	height,
}) => {
	const { state, UpdateVinderDriver, setVinderId } = useRegisterContext();
	const [uploadedLicense, setUploadedLicense] = useState<boolean>(false);
	const [isLoadingMedia, setIsLoadingMedia] = useState<boolean>(false);
	const { uploadImage: upload } = useCloudinary();
	const { personalVinderFlow } = useAuth();

	const uploadImage = async (
		file: Record<string, string>
	): Promise<string | any> => {
		const response = await fetch(file?.data);
		const blob = await response.blob();

		const formData = new FormData();

		formData.append("file", blob, file?.name);
		formData.append("upload_preset", "saturno_vindy");

		//usar codigo para enviar a cloudinary
		return await upload(formData);
	};

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<RegisterFormDriverFields>({
		resolver: RegisterFlowVinderDriverFormResolver,
		defaultValues: {
			licenseDriver: {},
			typeTransport: "",
			plate: "",
			transportColor: "",
		},
	});

	const baseClasses = useCallback(() => {
		return `${
			height
				? `h-[${height}]`
				: Object.keys(errors).length !== 0
				? `h-screen`
				: "h-full"
		}`;
	}, [height, errors]);

	// const handleSelectedTransport = (value: any) => {};

	const onSubmit = async (data: RegisterFormDriverFields) => {
		setIsLoadingMedia(true);
		const licenseDriver = await uploadImage(data.licenseDriver);
		setUploadedLicense(true);
		UpdateVinderDriver({
			...data,
		});

		const payload: PersonalVinderFlow = {
			userId: state.userId,
			...state.availability,
			...state.category,
			...data,
			licenseDriver,
		};

		await personalVinderFlow(payload)
			.then(async (res: any) => {
				setIsLoadingMedia(false);
				if (state.isBusiness) {
					setVinderId(res?.vinderId);
					send("CONTINUE_BUSINESS");
				} else {
					send("CONTINUE_VERIFY_PHONE");
				}
			})
			.catch(async (error: any) => {
				console.log("el error en el form", error);
			});
	};

	return (
		<>
			<BasicHeader send={send} />
			<IonContent
				style={{
					height: height ? `${height}px` : "100%",
				}}
				className="ion-padding ion-margin-bottom auth"
				scrollY={true}
				forceOverscroll
			>
				<div className={baseClasses()}>
					<div className="h-full w-full ion-padding ">
						<div className="flex flex-col h-full justify-between">
							<div className="flex flex-col space-y-6 mb-4">
								<p className="text-lg font-semibold text-slate-800 ml-2">
									Licencia de conducir
								</p>
								<Controller
									control={control}
									name="licenseDriver"
									render={({
										field: { onChange, value },
										fieldState: { error },
									}) => (
										<>
											<InputFile
												nameFile="licenseDriver"
												description="sube una foto de tu licencia de conducir"
												placeholder={"Licencia de conducir"}
												options={{}}
												onSubmitFile={(data: any) => onChange(data)}
												isUploaded={uploadedLicense}
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

								<Controller
									control={control}
									name="typeTransport"
									render={({ field: { onChange }, fieldState: { error } }) => (
										<InputSelect
											placeholder="Tipo de transporte"
											options={TRANSPORTS}
											change={(value: any) => onChange(value)}
											error={error?.message}
											icon={
												<GridIcon
													width={20}
													height={20}
													color={BASE_COLORS.gray}
												/>
											}
											// onSelected={(data: any) => handleSelectedTransport(data)}
										/>
									)}
								/>

								<Controller
									name="plate"
									control={control}
									render={({
										field: { onChange, value },
										fieldState: { error },
									}) => (
										<InputField
											placeholder="placa"
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
								<Controller
									name="transportColor"
									control={control}
									render={({
										field: { onChange, value },
										fieldState: { error },
									}) => (
										<InputField
											placeholder="Color "
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
							</div>

							<Button
								label="continuar"
								color="primary"
								fullWidth
								onClick={handleSubmit(onSubmit)}
								loading={isSubmitting}
								disabled={isSubmitting}
							/>
						</div>
					</div>
				</div>
			</IonContent>
		</>
	);
};

// export default React.memo(RegisterFlowSaveDriver);
