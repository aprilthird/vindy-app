import useSWR from "swr";
import { useCallback, useState } from "react";
import { IonContent, IonPage, IonSearchbar, useIonRouter } from "@ionic/react";
import { Square as HorizontalIcon, Grid as VerticalIcon } from "react-feather";
import { Card, Header, CardSkeleton } from "../../components";
import { PATHS } from "../../server";
import { memberFetcher } from "../../http-client";
import { Category } from "../../features/categories/entities";
import { BASE_COLORS } from "../../utils";

const colors: Colors[] = [
	{ index: 0, color: "purple" },
	{ index: 1, color: "orange" },
	{ index: 2, color: "blue" },
	{ index: 3, color: "purple" },
	{ index: 4, color: "orange" },
	{ index: 5, color: "purple" },
	{ index: 6, color: "blue" },
	{ index: 7, color: "orange" },
	{ index: 8, color: "blue" },
	{ index: 9, color: "purple" },
	{ index: 10, color: "orange" },
	{ index: 11, color: "blue" },
	{ index: 12, color: "purple" },
	{ index: 13, color: "orange" },
	{ index: 14, color: "blue" },
];

type Colors = {
	index: number;
	color: "orange" | "blue" | "purple" | "nocolor";
};

export const CategoriesPage = () => {
	const navigation = useIonRouter();
	const [type, setType] = useState<"horizontal" | "vertical">("horizontal");

	const { data, isLoading } = useSWR(
		{ url: `${PATHS.CATEGORIES.GET}` },
		memberFetcher
	);

	const handleType = () => {
		if (type === "horizontal") {
			setType("vertical");
		} else {
			setType("horizontal");
		}
	};

	const containerClasses = useCallback(() => {
		return `
			${type === "horizontal" ? "flex flex-col" : "grid grid-cols-3 gap-3"}
		`;
	}, [type]);

	return (
		<IonPage>
			<Header />
			<IonContent scrollY>
				<div className="px-5 flex flex-col gap-4 ">
					<div className="flex flex-row justify-between items-center mt-3" >
						<p className="text-ls font-semibold text-slate-800">Categorias</p>
						<div
							className="flex flex-row gap-1 items-center"
							onClick={() => handleType()}
						>
							<span className="text-sm text-terciary font-light">
								{type === "horizontal" ? "Mosaico" : "Grande"}
							</span>
							{type === "horizontal" ? (
								<VerticalIcon
									width={20}
									height={20}
									color={BASE_COLORS.purple}
								/>
							) : (
								<HorizontalIcon
									width={20}
									height={20}
									color={BASE_COLORS.purple}
								/>
							)}
						</div>
					</div>
					<IonSearchbar
						placeholder="¿Que estas buscando?..."
						className="searchbar-vindy placeholder:text-slate-300"
						onClick={() => navigation.push("/services", "forward")}
						value={""}
					/>
					{isLoading && (
						<div className={containerClasses()}>
							<CardSkeleton variant={type} />
							<CardSkeleton variant={type} />
							<CardSkeleton variant={type} />
						</div>
					)}
					<div className={containerClasses()}>
						{!isLoading &&
							data?.map((category: Category, index: number) => {
								const src = `/assets/icons/${category?.slug}-white.svg`;
								const color = colors.find(
									(item: any) => item.index === index
								)?.color;
								return (
									<Card
										key={category?.id}
										name={category?.name}
										src={src}
										path={`categories/${category?.id}`}
										color={color}
										variant={type}
									/>
								);
							})}
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

// export default React.memo(CategoriesPage);
