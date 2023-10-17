import ReactInputVerificationCode from "react-input-verification-code";
import React from "react";

import "./phone-code.scss";

type PhoneCodeVerificationProps = {
	onCompleted: (value: string) => void;
	length?: 4 | 5 | 6;
};

export const PhoneCodeVerification: React.FC<PhoneCodeVerificationProps> = ({
	onCompleted,
	length = 4,
}) => {
	return (
		<div className="flex flex-col items-center w-full">
			<div
				className={`custom-styles mx-auto ${
					length === 4
						? "custom-styles-cuatro"
						: length === 5
						? "custom-styles-cinco"
						: "custom-styles-seis"
				} `}
			>
				<ReactInputVerificationCode
					autoFocus
					placeholder=""
					length={length}
					onCompleted={onCompleted}
					type="text"
				/>
			</div>
		</div>
	);
};

// export default React.memo(PhoneCodeVerification);
