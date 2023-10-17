import { IonContent, IonHeader, useIonRouter } from "@ionic/react";
import { Button, Header, RadioButtons } from "../../../components";
import {
	User as UserIcon,
	Key as PasswordIcon,
	XOctagon as DeleteIcon,
} from "react-feather";
import { useState } from "react";
import { SettingsRoutes } from "../../../utils";
import { useAuthContext } from "../../auth/context/auth.hook";

const options = [
	{
		value: "my_info",
		label: "mi informacion",
		icon: <UserIcon color="gray" width={20} height={20} />,
	},
	{
		value: "my_password",
		label: "cambiar contraseña",
		icon: <PasswordIcon color="gray" width={20} height={20} />,
	},
	{
		value: "delete_account",
		label: "eliminar cuenta",
		icon: <DeleteIcon color="gray" width={20} height={20} />,
	},
];

type selected = "my_info" | "my_password" | "delete_account";

export const VinderSettingsPage: React.FC = () => {
	const {
		state: { session },
	} = useAuthContext();
	const [selected, setSelected] = useState<selected>();
	const navigations = useIonRouter();

	const handleSelected = () => {
		if (selected === "my_password") {
			navigations.push(
				`/settings/change-password/${session.user.id}`,
				"forward",
				"replace"
			);
		}
	};

	return (
		<>
			<IonHeader>
				<Header />
			</IonHeader>
			<IonContent className="ion-padding-bottom ion-margin-bottom">
				<div className="px-6 pt-10 w-full h-full pb-6">
					<p className="text-slate-900 font-bold text-lg font-poppins">
						Configuraciones
					</p>
					<div className="w-full flex flex-col justify-between h-full">
						<RadioButtons
							options={options}
							onSelectValue={(data) => setSelected(data as selected)}
						/>
						<Button
							color="primary"
							fullWidth
							label="Continuar"
							onClick={() => handleSelected()}
						/>
					</div>
				</div>
			</IonContent>
		</>
	);
};
