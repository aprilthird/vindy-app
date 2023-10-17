import { useCallback } from "react";
import { IonItem, IonSkeletonText } from "@ionic/react";
import { CARDS_VARIANTS } from "../../utils";

import "./card.scss";

type CardSkeletonCategoriesProp = {
	variant?: "vertical" | "horizontal" | "noEffect";
};

export const CardSkeleton: React.FC<CardSkeletonCategoriesProp> = ({
	variant = "horizontal",
}) => {
	const itemClasses = useCallback(() => {
		return `
         ${CARDS_VARIANTS[variant].base}
      `;
	}, [variant]);

	const outerClasses = useCallback(() => {
		return `
      ${CARDS_VARIANTS[variant].content}			
      `;
	}, [variant]);

	return (
		<IonItem className={itemClasses()} lines="none" button detail={false}>
			<div className={outerClasses()}>
				<IonSkeletonText animated />
			</div>
		</IonItem>
	);
};
