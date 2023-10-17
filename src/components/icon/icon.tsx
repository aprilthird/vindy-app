import React from "react";
import { IonImg } from "@ionic/react";

type IconBaseProps = {
	src: string;
	size?: number;
};

export const Icon: React.FC<IconBaseProps> = ({ src }) => {
	return <IonImg src={src} className="h-full w-auto" />;
};
