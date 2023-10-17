import { ReactNode } from "react";
import { Redirect } from "react-router";
import { Session } from "../../features/auth/context/auth.reducer";

type PublicRoutes = {
	isAuthtenticated: Session;
	children: ReactNode;
};

export const PublicRoute: React.FC<PublicRoutes> = ({
	isAuthtenticated,
	children,
}) => {
	return !isAuthtenticated.accessToken ? (
		<>{children}</>
	) : (
		<Redirect to="/dashboard" />
	);
};

// export default React.memo(PublicRoute);
