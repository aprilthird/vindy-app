const environment_exmaple = {
	production: false,
	PUBLIC_API_BASE_URL: "https://dominio_api",
	AUTH_URL: "http://localhost:8080",
	AUTH_SECRET: "dY0xgdiv/wz968nwmnMpPZWo9dGY8ryRGsoZBMRnciw=",
	PUBLIC_API_BASE_URL_INTERNAL: "https://dominio_api",
	NODE_ENV: "state del env",
	CLOUDINARY_URL: "url de la cuenta de cloudinary",
	CLOUDINARY_API_KEY: "cloduinary api key",
	CLOUDINARY_SECRET: "cloudinary secret key",
	CLOUDINARY_CLOUD_NAME: "cloudinary cloud name",
	CLOUDINARY_PRESET: "cloudinary preset",
	MAP_APP_KEY: "key de google api para google maps integracion",
};

// si se esta corriendoi la api local, el dominio es localhost:puerto, en caso contrario es el dominio del sevridor donde esta la api alojada.

const environment_dev = {
	production: false,
	PUBLIC_API_BASE_URL: "https://vindy.saturnocorp.tech",
	AUTH_URL: "http://localhost:8080",
	AUTH_SECRET: "dY0xgdiv/wz968nwmnMpPZWo9dGY8ryRGsoZBMRnciw=",
	PUBLIC_API_BASE_URL_INTERNAL: "https://vindy.saturnocorp.tech",
	NODE_ENV: "development",
	CLOUDINARY_URL:
		"cloudinary://722713773213811:9pvv74TfEOleki94_tF8GxC6AH8@saturno",
	CLOUDINARY_API_KEY: "722713773213811",
	CLOUDINARY_SECRET: "9pvv74TfEOleki94_tF8GxC6AH8",
	CLOUDINARY_CLOUD_NAME: "saturno",
	CLOUDINARY_PRESET: "satuno_vindy",
	MAP_APP_KEY: "AIzaSyCNcgKSusi7yWJOhf3lIagDs7d3fT8q4yk",
};

const environment_prod = {
	production: true,
	PUBLIC_API_BASE_URL: "https://vindy.saturnocorp.tech",
	AUTH_URL: "http://localhost:8080",
	AUTH_SECRET: "dY0xgdiv/wz968nwmnMpPZWo9dGY8ryRGsoZBMRnciw=",
	PUBLIC_API_BASE_URL_INTERNAL: "https://vindy.saturnocorp.tech",
	NODE_ENV: "production",
	CLOUDINARY_URL:
		"cloudinary://722713773213811:9pvv74TfEOleki94_tF8GxC6AH8@saturno",
	CLOUDINARY_API_KEY: "722713773213811",
	CLOUDINARY_SECRET: "9pvv74TfEOleki94_tF8GxC6AH8",
	CLOUDINARY_CLOUD_NAME: "saturno",
	CLOUDINARY_PRESET: "satuno_vindy",
	MAP_APP_KEY: "AIzaSyCNcgKSusi7yWJOhf3lIagDs7d3fT8q4yk",
};

export const environment =
	process.env.NODE_ENV === "development" ? environment_dev : environment_prod;
