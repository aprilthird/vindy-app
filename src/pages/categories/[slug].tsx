import React, { useEffect } from "react";
import useSWR from "swr";
import { Card, CardSkeleton, Header } from "../../components";
import { Subcategory } from "../../features/categories/entities";
import { memberFetcher } from "../../http-client";
import { PATHS } from "../../server";
import { IonContent, IonPage, IonSearchbar, useIonRouter } from "@ionic/react";
import { RouteComponentProps } from "react-router";

interface SubcategoryBaseProps
	extends RouteComponentProps<{
		id: string;
	}> {}

export const CategoryPage: React.FC<SubcategoryBaseProps> = ({ match }) => {
	const navigation = useIonRouter();
	const { data, isLoading } = useSWR(
		{ url: `${PATHS.SUB_CATEGORIES.GET(match.params.id)}` },
		memberFetcher
	);

	useEffect(() => {
		const loadingProps = async () => {
			if (!isLoading && data?.length === 0) {
				navigation.push(`/services?sub=${match.params.id}`);
			}
		};
		loadingProps();
	}, [data, isLoading]);

	return (
		<IonPage>
			<Header goBack />
			<IonContent scrollY>
				<div className="px-5 flex flex-col gap-4 ">
					<div className="flex flex-row justify-between items-center">
						<p className="text-ls font-semibold text-slate-800">
							Subcategorias
						</p>
					</div>
					<div className="w-full">
						<IonSearchbar
							placeholder="¿Que estas buscando?..."
							className="searchbar-vindy placeholder:text-slate-300"
							onClick={() => navigation.push("/services", "forward")}
						/>
					</div>
					{isLoading && (
						<>
							<CardSkeleton variant="noEffect" />
							<CardSkeleton variant="noEffect" />
							<CardSkeleton variant="noEffect" />
						</>
					)}
					{!isLoading &&
						data?.map((subcategory: Subcategory) => {
							return (
								<Card
									key={subcategory.id}
									name={subcategory?.name}
									path={`/services?sub=${subcategory.id}`}
									variant="noEffect"
									color="nocolor"
								/>
							);
						})}
				</div>
			</IonContent>
		</IonPage>
	);
};

// export default React.memo(CategoryPage);
