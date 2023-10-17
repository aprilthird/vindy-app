import Cookies from "universal-cookie";

import {
	AbilityBuilder,
	Ability,
	detectSubjectType,
	AbilityClass,
	InferSubjects,
} from "@casl/ability";

export enum Actions {
	Manage = "manage",
	Create = "create",
	Read = "read",
	Update = "update",
	Delete = "delete",
}

export enum AppSubjects {
	Requests = "Requests",
	Periods = "Periods Worked",
	Teams = "Teams",
	Home = "Home",
	Users = "Users",
	General = "General",
	Profile = "Profile",
	Reports = "Reports",
	Company = "Company",
}

type Subjects = InferSubjects<AppSubjects> | "all" | string;

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;

export const useAbility = () => {
	const buildAbilityFor = (user: any): AppAbility => {
		// console.log('dentro de buildAbilityFor DOS ===>', user);
		const cookies = new Cookies();

		const userSelectedCompany: string = cookies.get<string>("company");
		const userRoleCompany: any = user?.companies?.find(
			async (company: any) => company?.id === userSelectedCompany
		);

		return new AppAbility(defineRulesFor(userRoleCompany?.role), {
			detectSubjectType: detectAppSubjectType,
		});
	};

	const defineRulesFor = (userRole: string) => {
		const { can, cannot, rules } = new AbilityBuilder<AppAbility>(AppAbility);

		if (userRole === "admin") {
			can(Actions.Manage, "all");
			cannot(Actions.Read, "Home");
		} else if (userRole === "member") {
			//Periods
			cannot(Actions.Manage, "Period");

			//Request
			can(Actions.Create, "Request");
			can(Actions.Read, "Request");
			cannot(Actions.Update, "Request");
			cannot(Actions.Delete, "Request");

			//Users
			cannot(Actions.Manage, "Users");

			//dashboard card
			can(Actions.Read, "Home");

			//Company
			cannot(Actions.Manage, "Company");
		}

		return rules;
	};

	const detectAppSubjectType = (subject?: any) => {
		if (subject && typeof subject === "object" && subject?.type) {
			return subject?.type;
		}

		return detectSubjectType(subject);
	};

	return {
		buildAbilityFor,
	};
};
