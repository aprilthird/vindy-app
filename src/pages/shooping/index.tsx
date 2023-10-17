import React from "react";
import { Header, NumericKeyboard } from "../../components";
import { IonContent, IonPage } from "@ionic/react";

export const ShoppingPage = () => {
	return (
		<IonPage>
			<Header />
			<IonContent>
				<NumericKeyboard />
			</IonContent>
		</IonPage>
	);
};

// export default React.memo(ShoppingPage);
