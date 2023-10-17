import { IonPage } from "@ionic/react";
import { useAuthContext } from "../../features/auth/context/auth.hook";
import { VinderSettingsPage } from "../../features/settings/vinder-settings/vinder-settings";

export const SettingsPage = () => {
	const { state } = useAuthContext();

	return <IonPage>{state.type === "VINDER" && <VinderSettingsPage />}</IonPage>;
};
