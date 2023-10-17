import { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Header } from "../components/header/header";
import { useAuthContext } from "../features/auth/context/auth.hook";
import { VinderDashboard } from "../features/dashboard/vinder-dashboard";
import { CalendarProvider } from "../components/calendar";

export const DashboardPage = () => {
	const { handleSplashScreen, state } = useAuthContext();
	const [showSplash, setShowSplash] = useState<boolean>(true);

	useEffect(() => {
		const splashHandler = async () => {
			if (showSplash) {
				handleSplashScreen({ show: true });
				setShowSplash(false);
			} else {
				handleSplashScreen({ show: false });
			}
		};

		splashHandler();
	}, [showSplash]);

	return (
		<>
			<IonPage>
				<Header />
				<IonContent className="ion-padding map" scrollY>
					{state.type === "MEMBER" && (
						<div className="border border-red-700">member dashvoar</div>
					)}
					<CalendarProvider>
						{state.type === "VINDER" && <VinderDashboard />}
					</CalendarProvider>
				</IonContent>
			</IonPage>
		</>
	);
};
