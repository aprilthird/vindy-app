export interface Profile {
	id: string;
	firstName: string;
	lastName: string;
	dni: string;
	phone: string;
	country: string;
	state: string;
	address: string;
	stripeCustomerId: string;
	addressReference?: string;
	dniPicture?: string;
	profilePicture?: string;
}
