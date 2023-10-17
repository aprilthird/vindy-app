import { useState } from "react";
import React from "react";
import { IonContent } from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import { Clock as ClockIcon, Calendar as CalendarIcon } from "react-feather";
import { BASE_COLORS } from "../../../../utils";
import { RegisterFlowVinderAvailabilityFormResolver } from "../resolvers";
import { useRegisterContext } from "../context/register.context";
import {
	BasicHeader,
	Button,
	TimePicker,
	ToogleSegment,
	WeekForm,
} from "../../../../components";

type Availability = {
	send: any;
};

type AvailabilityFormFields = {
	days: Record<string, string>[];
	typeAvailability: "horas" | "always";
	from: string;
	to: string;
};

export const RegisterFlowAvailibility: React.FC<Availability> = ({ send }) => {
	const { UpdateVinderAvailability } = useRegisterContext();
	const [type, setType] = useState<"always" | "horas">("horas");
	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<AvailabilityFormFields>({
		resolver: RegisterFlowVinderAvailabilityFormResolver,
		defaultValues: {
			days: [],
			typeAvailability: "horas",
			from: "",
			to: "",
		},
	});

	const handleBlurToggle = (data: any) => {
		setType(data);
	};

	const onSubmit = async (data: AvailabilityFormFields) => {
		const payload = {
			...data,
			isAlwaysOpen: data.typeAvailability === "horas" ? false : true,
		};
		await UpdateVinderAvailability(payload);
		send("CONTINUE");
	};

	return (
		<>
			<BasicHeader send={send} goBack={false} />
			<IonContent className="ion-padding auth" scrollY={false}>
				<div className="h-full w-full flex flex-col ion-padding">
					<div className="flex flex-col h-full justify-between">
						<div className="flex flex-col space-y-4">
							<div className="px-2 pb-2 pt-4 flex flex-col space-y-4">
								<p className="text-lg font-semibold text-slate-800 ml-2">
									Horario de atencion
								</p>
								<span className="ml-3">
									<CalendarIcon
										width={20}
										height={20}
										color={BASE_COLORS.purple}
									/>
								</span>
								<Controller
									control={control}
									name="days"
									render={({ field: { onChange }, fieldState: { error } }) => (
										<WeekForm
											change={(value: any) => onChange(value)}
											error={error?.message}
										/>
									)}
								/>
							</div>

							<div className="px-10 pb-8">
								<Controller
									control={control}
									name="typeAvailability"
									render={({
										field: { onChange, value },
										fieldState: { error },
									}) => (
										<ToogleSegment
											labels={[
												{ name: "Horas", value: "horas" },
												{ name: "24 horas", value: "always" },
											]}
											labelDefault={value}
											onChange={(value: any) => onChange(value)}
											onBlur={handleBlurToggle}
											error={error?.message}
										/>
									)}
								/>
							</div>
							{type === "horas" && (
								<div>
									<div className="px-4 pb-8">
										<Controller
											control={control}
											name="from"
											render={({
												field: { onChange },
												fieldState: { error },
											}) => (
												<TimePicker
													label="Desde"
													onChange={(value: any) => onChange(value)}
													icon={
														<ClockIcon
															width={20}
															height={20}
															color={BASE_COLORS.purple}
														/>
													}
													error={error?.message}
												/>
											)}
										/>
									</div>
									<div className="px-4">
										<Controller
											control={control}
											name="to"
											render={({
												field: { onChange },
												fieldState: { error },
											}) => (
												<TimePicker
													label="Hasta"
													onChange={(value: any) => onChange(value)}
													icon={
														<ClockIcon
															width={20}
															height={20}
															color={BASE_COLORS.purple}
														/>
													}
													error={error?.message}
												/>
											)}
										/>
									</div>
								</div>
							)}
						</div>

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
			</IonContent>
		</>
	);
};

// export default React.memo(RegisterFlowAvailibility);
