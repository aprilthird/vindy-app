import useSWR from "swr";
import { useEffect, useMemo, useState } from "react";
import { IonContent, IonLoading } from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import { PenTool as PenIcon, Grid as GridIcon } from "react-feather";
import {
	BasicHeader,
	Button,
	InputField,
	InputSelect,
} from "../../../../components";
import { BASE_COLORS } from "../../../../utils";
import { RegisterFlowCategoryVinderFormResolver } from "../resolvers";
import { useRegisterContext } from "../context/register.context";
import { authFetcher } from "../../../../http-client";
import { PersonalVinderFlow, useAuth } from "../../use-auth";

type RegisterFlowCategoryVinderProps = {
	send: any;
};

type CategoryVinder = {
	jobReference: string;
	category: string;
	subCategory: string;
};

const optionsFetcher = {
	revalidateOnFocus: false,
	revalidateOnMount: true,
	revalidateOnReconnect: false,
	refreshWhenOffline: false,
	refreshWhenHidden: false,
	refreshInterval: 0,
};

export const RegisterFlowCategoryVinder: React.FC<
	RegisterFlowCategoryVinderProps
> = ({ send }) => {
	const { UpdateCategoryVinder, state, setVinderId } = useRegisterContext();
	const { personalVinderFlow } = useAuth();
	const [category, setCategory] = useState<string | null>(null);
	const [duration, setDuration] = useState<number>(500);

	const { data, isLoading } = useSWR(
		{
			url: "category",
		},
		authFetcher,
		optionsFetcher
	);

	const {
		data: subs,
		isLoading: isLoadingSub,
		mutate,
	} = useSWR(
		{
			url: category ? `category/${category}/subcategories` : null,
		},
		authFetcher
	);

	useEffect(() => {
		if (
			(data && data?.length > 0 && !isLoading) ||
			(category && isLoadingSub)
		) {
			setTimeout(() => {
				setDuration(1000);
			}, 1000);
		}
	}, [data, isLoading, category, isLoadingSub]);

	const categories = useMemo(() => {
		return data?.map((category: any) => ({
			text: category?.name,
			value: category?.id,
		}));
	}, [data]);

	const subcategories = useMemo(() => {
		if (subs && typeof subs !== "string" && subs?.length > 0 && !isLoadingSub) {
			return subs?.map((sub: any) => ({
				text: sub?.name,
				value: sub?.id,
			}));
		}
		return [];
	}, [subs, isLoadingSub]);

	const handleSelectedCategory = (data: any) => {
		setCategory(data);
		mutate();
	};

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<CategoryVinder>({
		resolver: RegisterFlowCategoryVinderFormResolver,
		defaultValues: {
			jobReference: "",
			category: "",
			subCategory: "",
		},
	});
	const onSubmit = async (data: CategoryVinder) => {
		if (state.personalVinder.isHome || state.businessVinder.isHome) {
			await UpdateCategoryVinder(data);
			send("CONTINUE_DRIVER");
		} else if (!state.personalVinder.isHome || !state.businessVinder.isHome) {
			const payload: PersonalVinderFlow = {
				userId: state.userId,
				...state.availability,
				...data,
			};

			await personalVinderFlow(payload)
				.then(async (res: any) => {
					if (state.isBusiness) {
						setVinderId(res?.vinderId);
						send("CONTINUE_BUSINESS");
					} else {
						send("CONTINUE_VERIFY_PHONE");
					}
				})
				.catch(async (error: any) => {
					console.log("el error en el form", error);
				});
		}
	};

	return (
		<>
			{(isLoading || (category && isLoadingSub)) && (
				<IonLoading
					isOpen={isLoading || (!category && isLoadingSub)}
					duration={duration}
				></IonLoading>
			)}

			<BasicHeader send={send} />
			<IonContent className="ion-padding auth" scrollY={false}>
				<div className="h-full w-full flex flex-col ion-padding">
					<div className="flex flex-col h-full justify-between">
						<div className="flex flex-col space-y-6">
							<p className="text-lg font-semibold text-slate-800 ml-2">
								Sobre tu negocio
							</p>
							<Controller
								name="jobReference"
								control={control}
								render={({
									field: { onChange, value },
									fieldState: { error },
								}) => (
									<InputField
										placeholder="oficio"
										icon={
											<PenIcon
												width={20}
												height={20}
												color={BASE_COLORS.gray}
											/>
										}
										change={(value: any) => onChange(value)}
										error={error?.message}
										value={value}
									/>
								)}
							/>
							<Controller
								control={control}
								name="category"
								render={({ field: { onChange }, fieldState: { error } }) => (
									<InputSelect
										placeholder="Categoria"
										options={categories}
										change={(value: any) => onChange(value)}
										error={error?.message}
										icon={
											<GridIcon
												width={20}
												height={20}
												color={BASE_COLORS.gray}
											/>
										}
										onSelected={(data: any) => handleSelectedCategory(data)}
									/>
								)}
							/>
							{category && typeof subs !== "string" && (
								<Controller
									control={control}
									name="subCategory"
									render={({ field: { onChange }, fieldState: { error } }) => (
										<InputSelect
											placeholder="Sub categoria"
											options={subcategories}
											change={(value: any) => onChange(value)}
											error={error?.message}
											icon={
												<GridIcon
													width={20}
													height={20}
													color={BASE_COLORS.gray}
												/>
											}
											reset={isLoadingSub}
										/>
									)}
								/>
							)}
						</div>
						<div>
							<Button
								label="continuar"
								color="primary"
								fullWidth
								onClick={handleSubmit(onSubmit)}
								loading={isSubmitting}
								disabled={isSubmitting}
							/>
						</div>
					</div>
				</div>
			</IonContent>
		</>
	);
};

// export default React.memo(RegisterFlowCategoryVinder);
