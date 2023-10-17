import Geocode from "react-geocode";
import { environment } from "../environments/enviroments";

Geocode.setApiKey(environment.MAP_APP_KEY);
Geocode.setLanguage("es");
// Geocode.setRegion("es");

export const getCoords = async () => {
	try {
		const coords = await Geocode.fromAddress("Space+Needle,Seattle+WA");
		if (coords) {
			return `${coords?.results[0]?.geometry?.location?.lat},${coords?.results[0]?.geometry?.location?.lng}`;
		}
	} catch (error) {
		console.log("error al obtener coords", error);
	}
};
