import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "../../services/apiLogin";

export const useSentOtp = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: sendOtp,
	});

	return { mutate, isPending };
};
