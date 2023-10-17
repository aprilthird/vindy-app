import { IonContent, IonHeader, IonPage } from "@ionic/react";
import { useAuthContext } from "../../features/auth/context/auth.hook";
import { VinderSettingsPage } from "../../features/settings/vinder-settings/vinder-settings";
import { RouteComponentProps } from "react-router";
import { Header } from "../../components";

interface ChangePasswordPageProps extends RouteComponentProps<{ id: string }> {}

export const ChangePasswordPage: React.FC<ChangePasswordPageProps> = ({
	match,
}) => {
	console.log("el id ===>", match.params.id);

	return (
		<IonPage>
			<Header />
			<IonContent>aqui cambio el password</IonContent>
		</IonPage>
	);
};
