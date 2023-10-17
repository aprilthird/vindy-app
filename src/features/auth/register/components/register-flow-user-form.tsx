import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IonContent, IonItem, IonList } from "@ionic/react";
import {
	User as UserIcon,
	Phone as PhoneIcon,
	Mail as MailIcon,
	MapPin as PinIcon,
	Key as KeyIcon,
} from "react-feather";
import {
	BasicHeader,
	Button,
	InputField,
	InputSelect,
	MapComponent,
	TextArea,
} from "../../../../components";
import { BASE_COLORS, STATES } from "../../../../utils";
import { useRegisterContext } from "../context/register.context";
import { useAuth } from "../../use-auth";
import { ROLES } from "../../context/auth.reducer";
import {
	RegisterFlowUserAddressFormResolver,
	RegisterFlowUserFormResolver,
} from "../resolvers";

import "animate.css";

type UserForm = {
	send: (data: string) => void;
	height: number | null;
	screen: number;
};

type MemberFormFields = {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	confirmPassword?: string;
	state: string;
	phone: string;
};

type Pages = {
	show: boolean;
	type: "BACK" | "CONTINUE";
};

export const RegisterFlowUserForm: React.FC<UserForm> = ({
	send,
	height,
	screen,
}) => {
	const { state, updateUserInfo, setUserId } = useRegisterContext();
	const [emailError, setEmailError] = useState<string>("");
	const [usernameError, setUsernameError] = useState<string>("");
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

	const {
		control: controlOne,
		handleSubmit,
		formState: { isSubmitting: isSubmittingOne, errors },
		trigger: triggerOne,
	} = useForm<MemberFormFields>({
		resolver: RegisterFlowUserFormResolver,
		defaultValues: {
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			state: "",
			phone: "",
		},
	});

	const {
		control: mapControl,
		handleSubmit: handleMap,
		formState: { isSubmitting: isSubmittingMap },
	} = useForm<any>({
		defaultValues: {
			address: "",
		},
	});

	const {
		control: controlTwo,
		handleSubmit: handleFinished,
		formState: { isSubmitting: isSubmittingTwo },
	} = useForm<any>({
		resolver: RegisterFlowUserAddressFormResolver,
		defaultValues: {
			addressReference: "",
			name: "",
		},
	});

	const animationClasses = useCallback(
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
		[height, errors]
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

	const { registerMember } = useAuth();

	const onSubmit = async (data: MemberFormFields) => {
		data.email.toLowerCase();
		data.username.toLowerCase();
		updateUserInfo(data);
		setShowPageOne((prev) => ({ ...prev, show: false }));
		setShowPageTwo({ show: true, type: "CONTINUE" });
	};

	const onSubmitMap = (data: { address: string }) => {
		const { address } = data;

		if (address) {
			setAddress(address);
			setShowPageTwo((prev) => ({ ...prev, show: false }));
			setShowPageThree({ show: true, type: "CONTINUE" });
		}
	};

	const onFinished = async (data: any) => {
		setEmailError("");
		setUsernameError("");
		const payload = {
			...state.user,
			...data,
			address,
			country: "VEN",
			role: ROLES.MEMBER,
		};
		delete payload?.confirmPassword;

		await registerMember(payload)
			.then((res: any) => {
				setUserId(res?.id);
				send("CONTINUE");
			})
			.catch(async (error: string) => {
				if (error.trim() === "EMAIL") {
					await triggerOne("email", { shouldFocus: true });
					setEmailError("Ya existe una cuenta con este correo");
					setShowPageOne({ show: true, type: "BACK" });
					setShowPageTwo((prev) => ({ ...prev, show: false }));
				} else if (error.trim() === "USERNAME") {
					await triggerOne("username", { shouldFocus: true });
					setUsernameError("Ya existe una cuenta con este nombre de usuario");
					setShowPageOne({ show: true, type: "BACK" });
					setShowPageTwo((prev) => ({ ...prev, show: false }));
				}
			});
	};

	const handleShowForm = () => {
		if (showPageOne.show) {
			send("BACK");
		} else if (showPageTwo.show) {
			setShowPageTwo((prev) => ({ ...prev, show: false }));
			setShowPageOne({ show: true, type: "BACK" });
		} else if (showPageThree.show) {
			setShowPageThree((prev) => ({ ...prev, show: false }));
			setShowPageTwo({ show: true, type: "BACK" });
		}
	};

	return (
		<>
			{!showPageTwo.show && <BasicHeader send={send} show={handleShowForm} />}
			{showPageOne.show && (
				<IonContent
					style={{
						height: height ? `${height}px` : "100%",
					}}
					className="ion-padding ion-margin-bottom auth"
					scrollY={true}
					forceOverscroll
				>
					<div className={animationClasses(showPageOne.type)}>
						<div className="w-full ion-padding h-full">
							<div className={baseClasses()}>
								<div className="flex flex-col space-y-2">
									<p className="text-lg font-semibold text-slate-800 ml-0 mb-4">
										Registro
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
														placeholder="Nombre"
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
														placeholder="Apellido"
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
												name="state"
												render={({
													field: { onChange, value },
													fieldState: { error },
												}) => (
													<InputSelect
														placeholder="seleccionar estado"
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
									</IonList>
								</div>
								<div>
									<Button
										label="continuar"
										color="primary"
										onClick={handleSubmit(onSubmit)}
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
				<IonContent
					style={{
						height: height ? `${height}px` : "100vh",
					}}
					scrollY={false}
					forceOverscroll
					className="map"
				>
					<div className={animationClassesMap(showPageTwo.type)}>
						<Controller
							control={mapControl}
							name="address"
							render={({ field: { onChange }, fieldState: { error } }) => (
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
			{showPageThree.show && (
				<IonContent
					style={{
						height: height ? `${height}px` : "100%",
					}}
					className="ion-padding ion-margin-bottom auth"
					scrollY={true}
					forceOverscroll
				>
					<div className={animationClasses(showPageThree.type)}>
						<div className="h-full w-full flex flex-col ion-padding">
							<div className="flex flex-col h-full justify-between">
								<div className="flex flex-col space-y-2 h-2/3">
									<p className="text-lg font-semibold text-slate-800 ml-0 mb-4">
										Detalles de la direccion
									</p>
									<Controller
										control={controlTwo}
										name="name"
										render={({
											field: { onChange, value },
											fieldState: { error },
										}) => (
											<InputField
												placeholder="Nombre para esta direccion"
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
										control={controlTwo}
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
								<div className="">
									<Button
										label="continuar"
										color="primary"
										onClick={handleFinished(onFinished)}
										fullWidth
										loading={isSubmittingTwo}
										disabled={isSubmittingTwo}
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

// export default React.memo(RegisterFlowUserForm);
