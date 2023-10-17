import { ReactNode } from "react";
import { Redirect } from "react-router";
import { Session } from "../../features/auth/context/auth.reducer";

type PrivateRoutes = {
	isAuthtenticated: Session;
	children: ReactNode;
};

export const PrivateRoute: React.FC<PrivateRoutes> = ({
	isAuthtenticated,
	children,
}) => {
	return isAuthtenticated.accessToken ? (
		<>{children}</>
	) : (
		<Redirect to="/login" />
	);
};

// export default React.memo(PrivateRoute);
