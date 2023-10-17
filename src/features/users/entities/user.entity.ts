// hay que modificar este archivo al entity que sale en la api

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	usernamer: string;
	email: string;
	avatar: string;
	isActive: boolean;
}

export interface Auth {
	accessToken: string;
	refreshtoke: string;
	user: User;
}

export interface Member {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	image: string;
	isActive: boolean;
}
