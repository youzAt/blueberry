import { useMutation } from "@tanstack/react-query";
import { setPassword } from "../../services/apiUser";

export const useSetPassword = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: setPassword,
	});

	return { mutate, isPending };
};
