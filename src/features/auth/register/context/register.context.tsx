import { createContext, useContext } from "react";
import { ROLES, VINDER_TYPES } from "../../context/auth.reducer";
import type {
	UpdateBusinessVinderInfo,
	UpdatePersonalVinderInfo,
	UpdateVinderAvailability,
	updateBusinessRepresentative,
	updateCategoryVinder,
	updateDriver,
	updateUserProps,
} from "./register.provider";

import type { State } from "./register.reducer";

type ContextState = {
	state: State;
	machineService: any;
	setTypeAccount: (data: ROLES) => void;
	setVinderType: (data: VINDER_TYPES) => void;
	updateUserInfo: (userInfo: updateUserProps) => void;
	setUserId: (userId: string) => void;
	setVinderId: (userId: string) => void;
	updatePersonalVinderInfo: (data: Partial<UpdatePersonalVinderInfo>) => void;
	updateBusinessVinderInfo: (data: Partial<UpdateBusinessVinderInfo>) => void;
	resetState: () => void;
	UpdateVinderAvailability: (data: UpdateVinderAvailability) => void;
	UpdateCategoryVinder: (data: updateCategoryVinder) => void;
	UpdateVinderDriver: (data: updateDriver) => void;
	updateBusinessRepresentative: (data: updateBusinessRepresentative) => void;
};

export const RegisterContext = createContext({} as ContextState);

export const useRegisterContext = () => {
	return useContext(RegisterContext);
};
