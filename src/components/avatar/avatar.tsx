import { IonAvatar } from "@ionic/react";
import { Profile } from "../../features/users/entities";
import { VinderProfileAPI } from "../../features/vinders/entities";

type AvatarProps = {
	user?: Pick<Profile, "firstName" | "lastName"> | any;
	vinder?: Pick<VinderProfileAPI, "name" | "logo"> | any;
	size?: "25" | "30" | "40" | "50" | "75" | "100" | "125" | "150";
	fontSize?: "0.3" | "0.4" | "0.5" | "0.7";
};

export const Avatar: React.FC<AvatarProps> = ({
	user = null,
	vinder = null,
	size = "50",
	fontSize = "0.4",
}) => {
	return (
		<div className="w-full pb-10">
			<div className="flex items-center gap-x-2">
				<IonAvatar className="-translate-x-2 h-16 w-16">
					{vinder && vinder?.logo && (
						<img
							src={vinder?.logo}
							alt={vinder.name}
							className="h-16 w-16 rounded-full object-cover object-center"
						></img>
					)}
					{user && user?.profilePicture && (
						<img
							src={user?.profilePicture}
							alt={user.firstName}
							className="h-16 w-16 rounded-full object-cover object-center"
						></img>
					)}
					{vinder && !vinder?.logo && (
						<img
							src={`https://ui-avatars.com/api/?size=${size}&name=${vinder?.name}+P&background=random&font-size=${fontSize}&rounded=true`}
							alt={vinder.name}
						></img>
					)}
					{user && !user?.profilePicture && (
						<img
							src={`https://ui-avatars.com/api/?size=${size}&name=${user?.firstName}+${user?.lastName}&background=random&font-size=${fontSize}&rounded=true`}
							alt={user.firstName}
						></img>
					)}
				</IonAvatar>
				<span className="font-medium text-lg text-white ">
					{vinder ? vinder?.name : `${user?.firstName} ${user?.lastName}`}
				</span>
			</div>
		</div>
	);
};
