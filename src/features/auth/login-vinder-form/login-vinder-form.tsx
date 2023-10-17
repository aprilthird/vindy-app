import { useEffect, useState } from "react";
import { IonRouterLink } from "@ionic/react";
import { Controller, useForm } from "react-hook-form";
import { User as UserIcon, Key as KeyIcon } from "react-feather";
import { Button, InputField } from "../../../components";
import { animationPageBuilder } from "../../../utils/animations";
import { BASE_COLORS, PublicRoutes } from "../../../utils";
import { useAuthContext } from "../context/auth.hook";
import { ROLES } from "../context/auth.reducer";
import { loginVinderFormResolver } from "./login-vinder-form.validate";

import "animate.css";

type LoginFormProps = {
	reset: boolean;
	isVinderFormOpen: (data: boolean) => void;
};

type LoginFormField = {
	email: string;
	password: string;
};

export const LoginVinderForm: React.FC<LoginFormProps> = ({
	reset,
	isVinderFormOpen,
}) => {
	const { login, userAuthenticated } = useAuthContext();

	const [showForm, setShowForm] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
		reset: resetForm,
	} = useForm({
		resolver: loginVinderFormResolver,
		defaultValues: {
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		if (reset) {
			setShowForm(false);
			resetForm({
				email: "",
				password: "",
			});
		}
	}, [isVinderFormOpen, reset, resetForm]);

	const handleView = () => {
		setShowForm(!showForm);
		isVinderFormOpen(!showForm);
	};

	const onSubmit = async (data: LoginFormField) => {
		setError("");
		const payload = {
			role: ROLES.VINDER,
			...data,
		};
		await login(payload)
			.then(async (res: any) => {
				userAuthenticated({ ...res, type: ROLES.VINDER });
			})
			.catch(() => {
				setError("Las credenciales son incorrectas");
			});
	};

	return (
		<div className="mt-6 ">
			{!showForm && (
				<div className="flex flex-col space-y-4">
					<Button
						label="Iniciar sesión"
						variant="outlined"
						onClick={() => handleView()}
						fullWidth
						color="back"
						rounded="semi-full"
						size="large"
						icon={<UserIcon color={BASE_COLORS.back} width={25} height={25} />}
						iconPosition="left"
					/>

					<div className="w-full flex py-8">
						<IonRouterLink
							routerAnimation={animationPageBuilder}
							routerDirection="forward"
							routerLink={PublicRoutes.REGISTER}
							className="mx-auto"
						>
							<p className="text-back text-xs ">
								¿Quieres ser un vinder? Crea tu negocio ahora
							</p>
						</IonRouterLink>
					</div>
				</div>
			)}
			{showForm && (
				<div className="flex flex-col space-y-4 animate__animated animate__fadeInUpBig animate__faster">
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<InputField
								placeholder="usuario o correo electronico"
								variant="outlined"
								color="default"
								icon={
									<UserIcon color={BASE_COLORS.gray} width={25} height={25} />
								}
								change={(value: any) => onChange(value)}
								error={error?.message}
								value={value}
							/>
						)}
					/>
					<Controller
						control={control}
						name="password"
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<InputField
								type="password"
								placeholder="contraseña"
								variant="outlined"
								color="default"
								icon={
									<KeyIcon color={BASE_COLORS.gray} width={25} height={25} />
								}
								change={(value: any) => onChange(value)}
								error={error?.message}
								value={value}
							/>
						)}
					/>

					{error && (
						<div className="my-3 w-full flex">
							<span className="text-sm font-normal text-back mx-auto">
								{error}
							</span>
						</div>
					)}

					<Button
						label="Iniciar sesión"
						onClick={handleSubmit(onSubmit)}
						fullWidth
						color="back"
						loading={isSubmitting}
						disabled={isSubmitting}
					/>
					<div className="w-full flex py-8">
						<IonRouterLink
							routerAnimation={animationPageBuilder}
							routerDirection="forward"
							routerLink={PublicRoutes.FORGOT_PASSWORD}
							className="mx-auto"
						>
							<p className="text-back text-xs ">
								¿Olvidaste tu clave? Pincha aquí
							</p>
						</IonRouterLink>
					</div>
				</div>
			)}
		</div>
	);
};

// export default React.memo(LoginVinderForm);
