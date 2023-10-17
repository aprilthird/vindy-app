import { IonPage } from "@ionic/react";
import { RegisterContextProvider } from "../features/auth";
import { RegisterFlow } from "../features/auth/register/components/register-flow";
import React from "react";

import "../theme/custom.scss";

export const RegisterPage = () => {
	return (
		<RegisterContextProvider>
			<IonPage>
				{/* <IonPage className="bg-back"> */}
				<RegisterFlow />
			</IonPage>
		</RegisterContextProvider>
	);
};

// export default React.memo(RegisterPage);
