import { useState } from "react";
import { IonPage } from "@ionic/react";
import { Keyboard } from "@capacitor/keyboard";
import { AddServices } from "../../features/services/add-services/add-services";
import { useWindowDimensions } from "../../utils/hooks/use-screen";

import "../../theme/custom.scss";

export const AddServicePage = () => {
	const { height } = useWindowDimensions();
	const [pageHeight, setPageHeight] = useState<number | null>(null);

	Keyboard.addListener("keyboardWillShow", (info) => {
		setPageHeight(Number(height) - Number(info.keyboardHeight));
	});

	Keyboard.addListener("keyboardWillHide", () => {
		setPageHeight(null);
	});

	return (
		<IonPage className="bg-back">
			<AddServices height={pageHeight} screen={height} />
		</IonPage>
	);
};

// export default React.memo(AddServicePage);
