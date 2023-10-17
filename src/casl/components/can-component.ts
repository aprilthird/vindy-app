import { createContext } from "react";
import { createContextualCan } from "@casl/react";
import { AppAbility } from "..";

export const AbilityContext = createContext<AppAbility>(undefined!);

export default createContextualCan(AbilityContext.Consumer);
