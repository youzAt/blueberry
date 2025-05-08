import { useMutation } from "@tanstack/react-query";
import { sendChangePhoneOtp } from "../../services/apiUser";

export const usePhoneOtp = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: sendChangePhoneOtp,
	});

	return { mutate, isPending };
};
