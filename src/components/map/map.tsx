import { Geolocation, Position } from "@capacitor/geolocation";
import { GoogleMap } from "@capacitor/google-maps";
import {
	geocodeByPlaceId,
	geocodeByLatLng,
} from "react-google-places-autocomplete";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useEffect, useState, useRef } from "react";
import { components } from "react-select";
import { ArrowLeftCircle as BackIcon, Search } from "react-feather";
import {
	IonLoading,
	IonToast,
	useIonRouter,
	isPlatform,
	useIonAlert,
} from "@ionic/react";
import { environment } from "../../environments/enviroments";
import { BASE_COLORS } from "../../utils";
import "./map.scss";
interface ToastError {
	showError: boolean;
	message?: string;
}

type Location = {
	lat: number;
	lng: number;
};

type MarkerLocation = {
	current: string | null;
	old: string | null;
};

type Backbutton = {
	show: boolean;
	action: any;
};

type MapComponentBaseProps = {
	backButton?: Backbutton;
	onChange?: (data: any) => void;
	mapError?: string;
};

export const MapComponent: React.FC<MapComponentBaseProps> = ({
	backButton = {
		show: true,
		action: null,
	},
	onChange = null,
	mapError,
}) => {
	const [presentAlert] = useIonAlert();
	const navigate = useIonRouter();
	const [value, setValue] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [position, setPosition] = useState<Position>();
	const [error, setError] = useState<ToastError>({
		showError: false,
		message: "",
	});
	const [location, setLocation] = useState<MarkerLocation>({
		current: null,
		old: null,
	});
	const [newMap, setNewMap] = useState<GoogleMap>();
	const mapRef = useRef<HTMLElement>();
	const barRef = useRef(null);

	// this get current position for user
	useEffect(() => {
		loadMap();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//this shows map if permissions are available
	useEffect(() => {
		const createMap = async () => {
			if (position) {
				if (!mapRef.current) return;

				const newMap = await GoogleMap.create({
					id: "my-cool-map",
					element: mapRef.current,
					apiKey: environment.MAP_APP_KEY,
					forceCreate: true,
					config: {
						center: {
							lat: position?.coords.latitude,
							lng: position?.coords.longitude,
						},
						zoom: 20,
						zoomControl: true,
						mapTypeControl: false,
					},
				});

				await newMap.enableCurrentLocation(true);

				await newMap.setOnMapClickListener(async (event) => {
					try {
						const response: Location = await onClickMapListenerCallback(event);

						if (response.lat && response.lng) {
							const pin = await newMap.addMarker({
								coordinate: {
									...response,
								},
								title: "Estas aqui",
							});
							if (pin) {
								setLocation((prev) => ({
									old: prev.current,
									current: pin,
								}));
							}
						}
					} catch (error) {
						console.log("map listener error", error);
					}
				});

				setNewMap(newMap);
			}
		};

		createMap();
	}, [position]);

	//remove markers
	useEffect(() => {
		const removeMarker = async () => {
			if (location.old && newMap) {
				await newMap.removeMarker(location.old);
			}
		};

		removeMarker();
	}, [location]);

	const loadMap = async () => {
		if (isPlatform("hybrid")) {
			try {
				setLoading(true);
				const permissions = await Geolocation.requestPermissions();
				if (permissions.location === "granted") {
					const position = await Geolocation.getCurrentPosition({
						enableHighAccuracy: true,
					});
					setPosition(position);
					setLoading(false);
				}
			} catch (error: any) {
				const message =
					error?.message?.length > 0
						? error?.message
						: "No se pudo obtener tu ubicacion, verifica los permisos";

				setError({ showError: true, message });
			}
		} else {
			presentAlert({
				header: "Alerta",
				subHeader: "Este dispositivo no es compatible",
				message: "No puedemos mostrar este mapa en este dispositivo, disculpa",
				buttons: [{ text: "OK", handler: () => navigate.goBack() }],
			});
		}
	};

	const setCamara = async (lat: number, lng: number) => {
		try {
			if (newMap) {
				await newMap.setCamera({
					coordinate: {
						lat,
						lng,
					},
				});
				const pin = await newMap.addMarker({
					coordinate: {
						lat,
						lng,
					},
					title: "¿Esta es la direccion?",
				});

				if (pin) {
					setLocation((prev) => ({
						old: prev.current,
						current: pin,
					}));
				}
			}
		} catch (error) {
			console.log("el error en set camara", error);
		}
	};

	const onClickMapListenerCallback = async (data?: any): Promise<Location> => {
		await onMarkerAddress({
			lat: data?.latitude,
			lng: data?.longitude,
		});
		return {
			lat: data?.latitude,
			lng: data?.longitude,
		};
	};

	const DropdownIndicator = (props: any) => {
		return (
			<components.DropdownIndicator {...props}>
				<Search width={20} height={20} color={BASE_COLORS.gray} />
			</components.DropdownIndicator>
		);
	};

	const onSelectAddress = async (data: any) => {
		try {
			const address = await geocodeByPlaceId(data?.value?.place_id);
			if (address) {
				await setCamara(
					address[0].geometry.location.lat(),
					address[0].geometry.location.lng()
				);
			}
			setValue(data);
		} catch (error) {
			console.log("Error de on select address", error);
		}
	};

	const onMarkerAddress = async (data: Location) => {
		try {
			const options = await geocodeByLatLng(data);
			if (options) {
				const result = options.find(
					(item) => item.geometry.location_type === "ROOFTOP"
				);
				if (onChange && result) {
					console.log(result.formatted_address);
					onChange(result.formatted_address);
				}
			}
		} catch (error) {
			setError({
				showError: true,
				message: "No pudimos detectar tu direccion",
			});
		}
	};

	const redirectToSettings = async () => {
		console.log("redireccionar a settings");
	};

	return (
		<>
			<IonToast
				isOpen={error.showError}
				message={error.message}
				duration={3000}
				buttons={[
					{
						text: "Go to settings",
						role: "info",
						handler: () => redirectToSettings(),
					},
				]}
				onDidDismiss={() => setError({ showError: false, message: "" })}
			/>
			<IonLoading
				isOpen={loading}
				message={"Cargando ..."}
				onDidDismiss={() => setLoading(false)}
			/>
			<div className="h-full w-full relative z-30">
				{backButton.show && backButton.action && (
					<div className="backMd absolute top-16 left-5 z-50 ">
						<span
							className="bg-back rounded-full w-10 h-10 flex items-center justify-center"
							onClick={() => backButton.action()}
						>
							<BackIcon width={30} height={30} color={BASE_COLORS.purple} />
						</span>
					</div>
				)}
				<div className="buscarMd w-full h-10 absolute top-28 px-5 z-50">
					<GooglePlacesAutocomplete
						apiKey={"AIzaSyCNcgKSusi7yWJOhf3lIagDs7d3fT8q4yk"}
						ref={barRef}
						debounce={400}
						minLengthAutocomplete={3}
						selectProps={{
							placeholder: "Escribe tu direccion....",
							components: {
								DropdownIndicator,
							},
							styles: {
								control: (styles) => ({
									...styles,
									borderRadius: "20px",
									flexDirection: "row-reverse",
									zIndex: 100,
								}),
								indicatorSeparator: (styles) => ({
									...styles,
									display: "none",
								}),
								loadingIndicator: (styles) => ({ ...styles, display: "none" }),
							},
							value,
							onChange: (data: any) => onSelectAddress(data),
						}}
					/>
				</div>

				{mapError && (
					<div className="absolute bottom-32 left-8 right-8 z-50">
						<div className="w-[100%] h-10 rounded-md bg-red-400 flex mx-auto px-3 items-center z-50">
							<span className="text-xs px-4">
								Toca el mapa para agregar la ubicacion
							</span>
						</div>
					</div>
				)}

				<capacitor-google-map
					ref={mapRef}
					style={{
						display: "inline-block",
						width: "100%",
						height: "99vh",
						zIndex: 50,
					}}
				></capacitor-google-map>
			</div>
		</>
	);
};

// export default React.memo(MapComponent);
