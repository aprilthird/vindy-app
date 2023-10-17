import { Keyboard } from "@capacitor/keyboard";
import useSWR from "swr";
import { useEffect, useState } from "react";
import {
	IonContent,
	IonPage,
	IonSearchbar,
	useIonRouter,
	useIonViewWillEnter,
} from "@ionic/react";
import { X as CancelIcon } from "react-feather";
import { Header, CardSkeleton, Chip, ChipSelect } from "../../components";
import { PATHS } from "../../server";
import { memberFetcher } from "../../http-client";
import { BASE_COLORS } from "../../utils";
import { useDebounce } from "../../utils/hooks/use-debounce";
import { ServiceCard } from "../../features/services/service-card/service-card";
import { Service } from "../../features/services/entities";
import { setServicesAdapter } from "../../features/services/adapters";

const optionsFetcher = {
	revalidateOnFocus: false,
	revalidateOnMount: true,
	revalidateOnReconnect: false,
	refreshWhenOffline: false,
	refreshWhenHidden: false,
	refreshInterval: 0,
};

export const ServicesPage = () => {
	const navigation = useIonRouter();
	const [showValue, setShowValue] = useState<boolean>(true);
	const [search, setSearch] = useState<string>("");
	const [modality, setModality] = useState<string[]>([]);
	const [words, setWords] = useState<string[]>([]);
	const [query, setQuery] = useState<string>("");
	const [services, setServices] = useState<Service[]>([]);
	const [sub, setSub] = useState<string>("");
	const debouncedName = useDebounce<string>(search, 700);
	const debouncedQuery = useDebounce<string>(query.trim(), 700);
	const debouncedModality = useDebounce<string>(String(modality), 700);

	useIonViewWillEnter(() => {
		setSub("");
		const sub = navigation.routeInfo?.search.split("?sub=")[1];
		if (sub) {
			setSub(sub);
		}
	});

	const { data: subProp } = useSWR(
		{
			url: `${PATHS.CATEGORIES.GET_ONE(sub)}`,
		},
		sub ? memberFetcher : null,
		optionsFetcher
	);

	useEffect(() => {
		if (subProp) {
			setWords([subProp?.name]);
		}
	}, [subProp]);

	useEffect(() => {
		Keyboard.show();
		setModality([]);
		setQuery("");
		setServices([]);
		setSub("");
	}, []);

	const {
		data,
		isLoading: isLoadingServices,
		mutate,
	} = useSWR(
		{
			url: `${PATHS.SERVICES.GET}?name=${debouncedName}&tag=${debouncedQuery}&modality=${debouncedModality}`,
		},
		memberFetcher
	);

	useEffect(() => {
		if (words.length > 0) {
			setQuery(String(words));
		} else {
			setQuery("");
		}
	}, [words]);

	useEffect(() => {
		if (data && data?.data?.length > 0) {
			setServices(setServicesAdapter(data?.data));
		}
	}, [data]);

	useEffect(() => {
		if (isLoadingServices) {
			setShowValue(false);
			setTimeout(() => {
				setShowValue(true);
			}, 1500);
		}
	}, [isLoadingServices]);

	const handleSearch = (ev: Event) => {
		let query = "";
		const target = ev.target as HTMLIonSearchbarElement;
		if (target) query = target.value!.toLowerCase();

		setSearch(query);
	};

	const handleSearchPress = (ev: any) => {
		if (ev?.code === "Enter") {
			let query = "";
			const target = ev.target as HTMLIonSearchbarElement;
			if (target) query = target.value!.toLowerCase();

			if (!words.find((word: string) => word === query) && query.length > 0) {
				setWords((prev) => [...prev, query]);
			}
			setSearch("");
		}
	};

	const handleWords = (value: string) => {
		const values = words.filter((word: string) => word !== value);
		setWords(values);
		mutate();
		Keyboard.hide();
	};

	return (
		<IonPage>
			<Header goBack />
			<IonContent scrollY>
				<div className="px-5 flex flex-col gap-4 ">
					<div className="flex flex-row justify-between items-center">
						<p className="text-ls font-semibold text-slate-800">Busqueda</p>
					</div>
					<div className="w-full flex flex-col px-0 bg-white pb-1 pt-0 rounded-lg  z-50">
						<IonSearchbar
							placeholder="¿Que estas buscando?..."
							onIonInput={(ev) => handleSearch(ev)}
							onKeyPress={(ev) => handleSearchPress(ev)}
							value={search}
							className="searchbar-vindy placeholder:text-slate-300"
							onClick={() => navigation.push("/services", "forward")}
						/>
						{/* {keyboard && (
						)} */}
						<div className=" flex flex-col bg-white px-2">
							<div className="flex flex-wrap gap-2">
								{words &&
									words.length > 0 &&
									words.map((word: string, index) => (
										<Chip
											key={word + index}
											label={word}
											iconProp={{
												icon: (
													<CancelIcon
														width={15}
														height={15}
														color={BASE_COLORS.blue}
													/>
												),
												iconClick: () => handleWords(word),
											}}
										/>
									))}
							</div>
							<div className="flex flex-col gap-1 p-3">
								<span className="text-slate-600 text-sm font-light">
									modalidad
								</span>
								<div className="flex flex-row gap-3 items-start">
									<ChipSelect
										options={[
											{ value: "isHome", label: "Domicilio" },
											{ value: "atPlace", label: "Local" },
										]}
										onChange={(data: any) => setModality(data)}
										size="small"
										color="secundary"
										position="left"
									/>
								</div>
							</div>
						</div>
					</div>
					{!showValue && (
						<div className="flex flex-col">
							<CardSkeleton variant={"horizontal"} />
							<CardSkeleton variant={"horizontal"} />
							<CardSkeleton variant={"horizontal"} />
						</div>
					)}
					{!isLoadingServices &&
						data &&
						data?.data?.length === 0 &&
						showValue &&
						(debouncedName || debouncedQuery || debouncedModality) && (
							<div className="flex flex-col">
								<p className="text-center text-slate-600 font-sm px-4">
									Ups... No encontramos ningun servicio que coincida con tu
									busqueda
								</p>
							</div>
						)}
					{!isLoadingServices && data?.data?.length > 0 && showValue && (
						<div className="flex flex-col">
							{services?.map((service: Service) => (
								<ServiceCard
									key={service.id}
									service={service}
									type="MEMBER_SEARCH"
								/>
							))}
						</div>
					)}
				</div>
			</IonContent>
		</IonPage>
	);
};

// export default React.memo(ServicesPage);
