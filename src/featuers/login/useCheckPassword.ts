import { useMutation } from "@tanstack/react-query";
import { fetchUserPasswordStat } from "../../services/apiLogin";

export const useCheckPassword = () => {
	const { mutate, isError, isPending } = useMutation({
		mutationFn: fetchUserPasswordStat,
		
	});

	return { mutate, isPending, isError };
};
