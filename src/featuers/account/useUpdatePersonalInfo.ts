import { useMutation } from "@tanstack/react-query";
import { updatePersonalInfo } from "../../services/apiUser";

export const useUpdatePersonalInfo = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: updatePersonalInfo,
	});
	return { mutate, isPending };
};
