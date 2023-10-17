import { useCallback } from "react";
import { IonItem, useIonRouter } from "@ionic/react";
import { animationPageBuilder } from "../../utils/animations";
import { CARDS_VARIANTS, CARDS_COLORS } from "../../utils";
import { Icon } from "../icon/icon";

import "./card.scss";

type CardCategoriesProp = {
	path: string;
	color?: "orange" | "blue" | "purple" | "nocolor";
	variant?: "vertical" | "horizontal" | "noEffect";
	name?: string;
	src?: string;
	icon?: any;
};

export const Card: React.FC<CardCategoriesProp> = ({
	name,
	src,
	color = "orange",
	variant = "horizontal",
	path,
}) => {
	const itemClasses = useCallback(() => {
		return `
         ${CARDS_VARIANTS[variant].base}
         ${CARDS_COLORS[color]}
      `;
	}, [color, variant]);

	const outerClasses = useCallback(() => {
		return `
      ${CARDS_VARIANTS[variant].content}			
      `;
	}, [variant]);

	const innerClasses = useCallback(() => {
		return `
      ${CARDS_VARIANTS[variant].innerContent}
      `;
	}, [variant]);

	return (
		<IonItem
			className={itemClasses()}
			lines="none"
			button
			detail={false}
			routerAnimation={animationPageBuilder}
			routerDirection="forward"
			routerLink={path}
		>
			{variant === "horizontal" && (
				<>
					<div className="circle-one absolute -left-24 bottom-1 top-1 m-auto"></div>
					<div className="circle-two absolute right-0 -bottom-11 left-0 m-auto"></div>
					<div className="circle-three absolute -right-14 bottom-12  m-auto"></div>
				</>
			)}
			{variant === "vertical" && (
				<>
					<div className="circle-six absolute -left-10 top-0 bottom-0 m-auto"></div>
					<div className="circle-six absolute -right-7 -top-2 m-auto"></div>
					<div className="circle-five absolute -right-10 -bottom-10 m-auto"></div>
				</>
			)}
			<div className={outerClasses()}>
				<div className={innerClasses()}>
					<div
						className={`${
							variant === "horizontal"
								? " w-2/4 flex justify-items-end items-end"
								: variant === "vertical"
								? "w-full h-1/3 text-center justify-center"
								: "ml-2 w-full "
						}  `}
					>
						<span
							className={` text-back font-semibold ${
								variant === "horizontal"
									? " text-md w-full"
									: variant === "vertical"
									? "text-xs w-full h-auto text-center justify-center"
									: "text-black font-bold w-1/3 text-sm "
							}  `}
						>
							{name}
						</span>
					</div>
					<div
						className={`${
							variant === "horizontal"
								? "w-2/4"
								: variant === "vertical"
								? "w-full h-2/4"
								: "w-1/4 justify-center"
						} `}
					>
						{src && <Icon src={src} />}
					</div>
				</div>
			</div>
		</IonItem>
	);
};

// export default React.memo(Card);
