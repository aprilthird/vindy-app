import { TransportType } from "../../../shared/enums";

export interface VinderDriver {
	id: string;
	licenseDriver?: string;
	typeTransport: TransportType;
	plate: string;
	transportColor?: string;
}
