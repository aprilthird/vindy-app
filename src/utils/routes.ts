export enum PublicRoutes {
	LOGIN = "/login",
	REGISTER = "/register",
	FORGOT_PASSWORD = "/forgot-password",
	RESET_PASSWORD = "/reset-password",
}

export enum PrivateInitRoutes {
	DASHBOARD = "/dashboard",
	REPORT_PROBLEM = "/report",
	LEGAL_INFO = "/legal",
}

export enum CategoriesRoutes {
	INDEX = "/categories",
	SLUG = "/categories/:id",
	ADD = "/categories/add",
	UPDATE = "/categories/:id/update",
}

export enum ShoppingRoutes {
	INDEX = "/shopping",
	SLUG = "/shopping/:id",
	ADD = "/shopping/add",
	UPDATE = "/shopping/:id/update",
	DELETE = "/shopping/:id/delete",
}

export enum UserRoutes {
	SLUG = "/user/:id",
	UPDATE = "/user/:id/update",
}

export enum UserProfileRoutes {
	SLUG = "/profile/:id",
	UPDATE = "/profile/:id/update",
}

export enum NotificationsRoutes {
	INDEX = "/notifications",
	SLUG = "/notifications/:id",
	// ADD = "/notifications/add",
	// UPDATE = "/notifications/:id/update",
}

export enum AddressesRoutes {
	INDEX = "/addresses",
	SLUG = "/addresses/:id",
	ADD = "/addresses/add",
	UPDATE = "/addresses/:id/update",
	DELETE = "/addresses/:id/delete",
}

export enum FavoritesRoutes {
	INDEX = "/favorites",
	SLUG = "/favorites/:id",
	// ADD = "/favorites/add",
	// UPDATE = "/favorites/:id/update",
}

export enum SettingsRoutes {
	INDEX = "/settings",
	CHANGE_PASSWORD = "/settings/change-password/:id",
	// SLUG = "/settings/:id",
	// ADD = "/settings/add",
	// UPDATE = "/settings/:id/update",
}

export enum ServicesRoutes {
	ADD = "/services",
	INDEX = "/services",
	SLUG = "/services/:id/:vinderId",
	// SLUG = "/services/:id",
}

export enum RequestsRoutes {
	INDEX = "/requests",
}

export enum VinderProfileAPIRoutes {
	INDEX = "/vinders",
	VINDER_PROFILE = "/vinders/:id",
}

export enum ChatsPageRoutes {
	INDEX = "/chats",
	CHAT_ROOM = "/chatRoom",
}

export enum WalletRoutes {
	INDEX = "/wallet",
}

export enum QARoutes {
	INDEX = "/qa",
}

export enum ReviewRoutes {
	INDEX = "/reviews",
}

export enum MetricRoutes {
	INDEX = "/metrics",
}
